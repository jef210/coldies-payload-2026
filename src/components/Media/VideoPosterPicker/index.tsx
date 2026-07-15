'use client'

import { useField, useDocumentInfo, useFormFields } from '@payloadcms/ui'
import React, { useCallback, useMemo, useRef, useState } from 'react'

import { getMediaUrl } from '@/utilities/getMediaUrl'

type MediaLike = {
  alt?: string | null
  filename?: string | null
  mimeType?: string | null
  updatedAt?: string | null
  url?: string | null
}

type FramePreview = {
  time: number
  src: string
}

const frameCount = 6

const coalesceMedia = (saved?: MediaLike, live?: MediaLike): MediaLike => ({
  alt: live?.alt ?? saved?.alt,
  filename: live?.filename ?? saved?.filename,
  mimeType: live?.mimeType ?? saved?.mimeType,
  updatedAt: live?.updatedAt ?? saved?.updatedAt,
  url: live?.url ?? saved?.url,
})

const hasVideoExtension = (value?: string | null) => {
  if (!value) return false
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(value)
}

const waitForSeek = (video: HTMLVideoElement, time: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!Number.isFinite(time)) {
      resolve()
      return
    }

    if (Math.abs(video.currentTime - time) < 0.01) {
      resolve()
      return
    }

    const handleSeeked = () => {
      cleanup()
      resolve()
    }

    const handleError = () => {
      cleanup()
      reject(new Error('Unable to load video frame'))
    }

    const cleanup = () => {
      video.removeEventListener('seeked', handleSeeked)
      video.removeEventListener('error', handleError)
    }

    video.addEventListener('seeked', handleSeeked, { once: true })
    video.addEventListener('error', handleError, { once: true })
    video.currentTime = time
  })
}

export const VideoPosterPicker: React.FC = () => {
  const { data, id: docID } = useDocumentInfo()
  const { setValue } = useField({ path: 'posterFilename' })
  const liveMediaState = useFormFields(([fields]) => ({
    alt: fields.alt?.value as string | null | undefined,
    filename: fields.filename?.value as string | null | undefined,
    mimeType: fields.mimeType?.value as string | null | undefined,
    updatedAt: fields.updatedAt?.value as string | null | undefined,
    url: fields.url?.value as string | null | undefined,
  }))
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [framePreviews, setFramePreviews] = useState<FramePreview[]>([])
  const [activeFrameTime, setActiveFrameTime] = useState<number | null>(null)
  const [isGeneratingPreviews, setIsGeneratingPreviews] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const media = coalesceMedia(data as MediaLike | undefined, liveMediaState)
  const isVideo =
    Boolean(media?.mimeType?.includes('video')) ||
    hasVideoExtension(media?.filename) ||
    hasVideoExtension(media?.url)

  const videoSrc = useMemo(() => {
    if (media?.url) {
      return getMediaUrl(media.url, media.updatedAt || undefined)
    }

    if (media?.filename) {
      return getMediaUrl(`/media/${media.filename}`, media.updatedAt || undefined)
    }

    return ''
  }, [media?.filename, media?.updatedAt, media?.url])

  const captureFrameAsDataUrl = useCallback(async (time: number) => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) {
      throw new Error('Video preview is not ready yet')
    }

    await waitForSeek(video, time)

    const width = video.videoWidth || 1280
    const height = video.videoHeight || 720

    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Unable to access canvas context')
    }

    context.drawImage(video, 0, 0, width, height)
    return canvas.toDataURL('image/jpeg', 0.82)
  }, [])

  const generateFramePreviews = useCallback(
    async (nextDuration: number) => {
      const video = videoRef.current
      if (!video || !nextDuration) return

      setIsGeneratingPreviews(true)
      setStatusMessage('Building frame strip...')

      const sampleTimes = Array.from({ length: frameCount }, (_, index) => {
        const portion = (index + 1) / (frameCount + 1)
        return Math.max(0.2, Math.min(nextDuration - 0.2, nextDuration * portion))
      })

      const previews: FramePreview[] = []

      try {
        for (const time of sampleTimes) {
          const src = await captureFrameAsDataUrl(time)
          previews.push({ time, src })
        }

        setFramePreviews(previews)
        setActiveFrameTime(previews[0]?.time ?? null)
        setCurrentTime(previews[0]?.time ?? 0)
        if (previews[0]) {
          video.currentTime = previews[0].time
        }
        setStatusMessage('Pick a frame below, then save it as the poster image.')
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Could not generate frame previews'
        setStatusMessage(message)
      } finally {
        setIsGeneratingPreviews(false)
      }
    },
    [captureFrameAsDataUrl],
  )

  const captureSelectedFrame = useCallback(
    async (time: number) => {
      const video = videoRef.current
      const canvas = canvasRef.current

      if (!video || !canvas) {
        return
      }

      if (!docID) {
        setStatusMessage('Save the video first, then come back to pick a poster frame.')
        return
      }

      setIsUploading(true)
      setStatusMessage('Saving selected frame...')

      try {
        await waitForSeek(video, time)

        const width = video.videoWidth || 1280
        const height = video.videoHeight || 720

        canvas.width = width
        canvas.height = height

        const context = canvas.getContext('2d')
        if (!context) {
          throw new Error('Unable to access canvas context')
        }

        context.drawImage(video, 0, 0, width, height)

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((result) => resolve(result), 'image/jpeg', 0.9)
        })

        if (!blob) {
          throw new Error('Could not generate poster image')
        }

        const formData = new FormData()
        formData.append('file', new File([blob], 'poster.jpg', { type: 'image/jpeg' }))

        const response = await fetch(`/api/media/${docID}/poster`, {
          body: formData,
          credentials: 'include',
          method: 'POST',
        })

        if (!response.ok) {
          throw new Error(`Upload failed (${response.status})`)
        }

        const result = (await response.json()) as { posterFilename?: string }

        if (!result?.posterFilename) {
          throw new Error('Upload succeeded, but no poster path was returned')
        }

        setValue(result.posterFilename)
        setStatusMessage('Poster image saved')
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Could not save poster image'
        setStatusMessage(message)
      } finally {
        setIsUploading(false)
      }
    },
    [docID, setValue],
  )

  if (!isVideo) {
    return null
  }

  return (
    <div style={{ border: '1px solid var(--theme-elevation-150)', borderRadius: 8, padding: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <strong>Video poster picker</strong>
          <div style={{ color: 'var(--theme-text-secondary)', marginTop: 4 }}>
            Choose a preview frame from the strip below, then save it as the poster image.
          </div>
        </div>

        <video
          ref={videoRef}
          controls
          muted
          playsInline
          preload="metadata"
          src={videoSrc}
          onLoadedMetadata={(event) => {
            const nextDuration = event.currentTarget.duration || 0
            setDuration(nextDuration)
            if (nextDuration > 0) {
              const startTime = Math.min(0.25, nextDuration)
              event.currentTarget.currentTime = startTime
              setCurrentTime(startTime)
              void generateFramePreviews(nextDuration)
            }
          }}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          style={{ borderRadius: 8, width: '100%' }}
        />

        <div style={{ display: 'grid', gap: 8 }}>
          <input
            aria-label="Scrub video frame"
            disabled={!duration}
            max={duration || 0}
            min={0}
            onChange={(event) => {
              const nextTime = Number(event.target.value)
              setCurrentTime(nextTime)
              setActiveFrameTime(nextTime)
              if (videoRef.current) {
                videoRef.current.currentTime = nextTime
              }
            }}
            step={0.01}
            type="range"
            value={currentTime}
          />

          <div style={{ color: 'var(--theme-text-secondary)', fontSize: 13 }}>
            Frame: {currentTime.toFixed(2)}s{duration ? ` / ${duration.toFixed(2)}s` : ''}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gap: 8,
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          }}
        >
          {isGeneratingPreviews
            ? Array.from({ length: frameCount }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  style={{
                    aspectRatio: '16 / 9',
                    background: 'var(--theme-elevation-100)',
                    borderRadius: 8,
                  }}
                />
              ))
            : framePreviews.map((frame) => {
                const isActive = activeFrameTime === frame.time

                return (
                  <button
                    key={frame.time}
                    onClick={() => {
                      setActiveFrameTime(frame.time)
                      setCurrentTime(frame.time)
                      if (videoRef.current) {
                        videoRef.current.currentTime = frame.time
                      }
                    }}
                    type="button"
                    style={{
                      background: 'transparent',
                      border: isActive
                        ? '2px solid var(--theme-success-500)'
                        : '1px solid var(--theme-elevation-150)',
                      borderRadius: 10,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      padding: 0,
                      textAlign: 'left',
                    }}
                  >
                    <img
                      alt={`Frame at ${frame.time.toFixed(2)} seconds`}
                      src={frame.src}
                      style={{ display: 'block', height: 'auto', width: '100%' }}
                    />
                    <div
                      style={{
                        background: isActive
                          ? 'var(--theme-success-500)'
                          : 'var(--theme-elevation-100)',
                        color: isActive ? 'white' : 'var(--theme-text-secondary)',
                        fontSize: 12,
                        padding: '6px 8px',
                      }}
                    >
                      {frame.time.toFixed(2)}s
                    </div>
                  </button>
                )
              })}
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            disabled={isUploading || !duration}
            onClick={() => captureSelectedFrame(activeFrameTime ?? currentTime)}
            type="button"
            style={{
              background: 'var(--theme-success-500)',
              border: 0,
              borderRadius: 6,
              color: 'white',
              cursor: 'pointer',
              padding: '8px 12px',
            }}
          >
            {isUploading ? 'Saving...' : 'Use selected frame'}
          </button>
        </div>

        {statusMessage ? (
          <div style={{ color: 'var(--theme-text-secondary)', fontSize: 13 }}>{statusMessage}</div>
        ) : null}
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

export default VideoPosterPicker
