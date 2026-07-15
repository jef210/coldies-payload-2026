import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { contactForm } from '../src/endpoints/seed/contact-form'
import { contact } from '../src/endpoints/seed/contact-page'

async function run() {
  const payload = await getPayload({ config })
  const smtpFromAddress = process.env.SMTP_FROM_ADDRESS || process.env.SMTP_USER

  const preparedContactForm = {
    ...contactForm,
    emails: (contactForm.emails || []).map((email) => ({
      ...email,
      emailFrom: smtpFromAddress ? `"The Coldies" <${smtpFromAddress}>` : email.emailFrom,
    })),
  }

  const existingForms = await payload.find({
    collection: 'forms',
    where: { title: { equals: preparedContactForm.title } },
    limit: 1,
    depth: 0,
  })

  const formDoc = existingForms.docs[0]
    ? await payload.update({
        collection: 'forms',
        id: existingForms.docs[0].id,
        data: preparedContactForm,
        depth: 0,
        context: { disableRevalidate: true },
      })
    : await payload.create({
        collection: 'forms',
        data: preparedContactForm,
        depth: 0,
        context: { disableRevalidate: true },
      })

  const pageSeed = contact({ contactForm: formDoc as never })
  const normalizedLayout = (pageSeed.layout || []).map((block) => {
    if ((block as { blockType?: string })?.blockType === 'formBlock') {
      return {
        ...block,
        form: formDoc.id,
      }
    }
    return block
  })

  const existingPages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact' } },
    limit: 1,
    depth: 0,
  })

  const pageData = {
    ...pageSeed,
    layout: normalizedLayout,
  }

  const pageDoc = existingPages.docs[0]
    ? await payload.update({
        collection: 'pages',
        id: existingPages.docs[0].id,
        data: pageData,
        depth: 0,
        context: { disableRevalidate: true },
      })
    : await payload.create({
        collection: 'pages',
        data: pageData,
        depth: 0,
        context: { disableRevalidate: true },
      })

  console.log(
    JSON.stringify(
      {
        updatedFormId: formDoc.id,
        updatedFormTitle: formDoc.title,
        updatedPageId: pageDoc.id,
        updatedPageSlug: pageDoc.slug,
        layoutBlocks: pageDoc.layout?.length || 0,
        hasFormBlock: (pageDoc.layout || []).some(
          (b) => (b as { blockType?: string })?.blockType === 'formBlock',
        ),
      },
      null,
      2,
    ),
  )

  await payload.db.destroy?.()
}

run()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
