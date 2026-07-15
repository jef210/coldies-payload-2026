import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function run() {
  const payload = await getPayload({ config })

  const result = await payload.create({
    collection: 'form-submissions',
    data: {
      form: '6a559dad5d6a63a0c929c57f',
      submissionData: [
        { field: 'full-name', value: 'SMTP Test User' },
        { field: 'email', value: 'info@thecoldies.com' },
        { field: 'phone', value: '1234567890' },
        { field: 'message', value: 'Automated local test submission via Payload API.' },
      ],
    },
    depth: 0,
  })

  console.log(
    JSON.stringify(
      {
        createdId: result.id,
        createdAt: result.createdAt,
      },
      null,
      2,
    ),
  )

  await payload.db.destroy?.()
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
