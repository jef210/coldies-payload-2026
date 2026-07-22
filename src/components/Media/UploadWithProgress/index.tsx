'use client'

import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type UploadState =
  | { status: 'idle' }
  | { status: 'uploading'; filename: string; percent: number }
  | { status: 'done'; filename: string; id: string }
  | { status: 'error'; filename: string; message: string }

export const UploadWithProgress: React.FC = () => {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<UploadState>({ status: 'idle' })

  const upload = useCallback((file: File) => {
    setState({ status: 'uploading', filename: file.name, percent: 0 })

    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', (event) => {
      if (!event.lengthComputable) return
      setState({
        status: 'uploading',
        filename: file.name,
        percent: Math.round((event.loaded / event.total) * 100),
      })
    })

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const result = JSON.parse(xhr.responseText) as { doc?: { id?: string }; id?: string }
          const id = result?.doc?.id || result?.id

          if (id) {
            setState({ status: 'done', filename: file.name, id })
            return
          }
        } catch {
          // fall through to error below
        }
        setState({ status: 'error', filename: file.name, message: 'Upload succeeded, but no document id was returned.' })
      } else {
        let message = `Upload failed (${xhr.status})`
        try {
          const result = JSON.parse(xhr.responseText) as { errors?: { message?: string }[] }
          if (result?.errors?.[0]?.message) message = result.errors[0].message
        } catch {
          // keep the generic message
        }
        setState({ status: 'error', filename: file.name, message })
      }
    })

    xhr.addEventListener('error', () => {
      setState({ status: 'error', filename: file.name, message: 'Network error during upload.' })
    })

    xhr.open('POST', '/api/media')
    xhr.withCredentials = true
    xhr.send(formData)
  }, [])

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      event.target.value = ''
      if (file) upload(file)
    },
    [upload],
  )

  const isUploading = state.status === 'uploading'

  useEffect(() => {
    if (!isUploading) return

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
    }

    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [isUploading])

  return (
    <div
      style={{
        border: '1px solid var(--theme-elevation-150)',
        borderRadius: 8,
        marginBottom: 24,
        padding: 16,
      }}
    >
      <div style={{ alignItems: 'center', display: 'flex', gap: 12, justifyContent: 'space-between' }}>
        <div>
          <strong>Upload with progress</strong>
          <div style={{ color: 'var(--theme-text-secondary)', fontSize: 13, marginTop: 2 }}>
            Shows real upload progress for large files - safe to watch until it finishes instead of
            guessing whether it's still going.
          </div>
        </div>

        <button
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
          type="button"
          style={{
            background: 'var(--theme-elevation-100)',
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: 6,
            cursor: isUploading ? 'default' : 'pointer',
            opacity: isUploading ? 0.6 : 1,
            padding: '8px 14px',
            whiteSpace: 'nowrap',
          }}
        >
          Choose file...
        </button>

        <input
          accept="video/*,image/*"
          hidden
          onChange={onFileChange}
          ref={inputRef}
          type="file"
        />
      </div>

      {state.status === 'uploading' && (
        <div style={{ marginTop: 12 }}>
          <div style={{ color: 'var(--theme-text-secondary)', fontSize: 13, marginBottom: 6 }}>
            Uploading {state.filename}... {state.percent}% - don't navigate away yet.
          </div>
          <div
            style={{
              background: 'var(--theme-elevation-100)',
              borderRadius: 999,
              height: 8,
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <div
              style={{
                background: 'var(--theme-success-500)',
                borderRadius: 999,
                height: '100%',
                transition: 'width 150ms ease-out',
                width: `${state.percent}%`,
              }}
            />
          </div>
        </div>
      )}

      {state.status === 'done' && (
        <div style={{ alignItems: 'center', display: 'flex', gap: 10, marginTop: 12 }}>
          <span style={{ color: 'var(--theme-success-500)' }}>
            ✓ {state.filename} uploaded successfully.
          </span>
          <button
            onClick={() => router.push(`/admin/collections/media/${state.id}`)}
            type="button"
            style={{
              background: 'var(--theme-success-500)',
              border: 0,
              borderRadius: 6,
              color: 'white',
              cursor: 'pointer',
              padding: '6px 12px',
            }}
          >
            Open it →
          </button>
          <button
            onClick={() => setState({ status: 'idle' })}
            type="button"
            style={{
              background: 'transparent',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: 6,
              cursor: 'pointer',
              padding: '6px 12px',
            }}
          >
            Upload another
          </button>
        </div>
      )}

      {state.status === 'error' && (
        <div style={{ alignItems: 'center', display: 'flex', gap: 10, marginTop: 12 }}>
          <span style={{ color: 'var(--theme-error-500)' }}>
            {state.filename}: {state.message}
          </span>
          <button
            onClick={() => setState({ status: 'idle' })}
            type="button"
            style={{
              background: 'transparent',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: 6,
              cursor: 'pointer',
              padding: '6px 12px',
            }}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  )
}

export default UploadWithProgress
