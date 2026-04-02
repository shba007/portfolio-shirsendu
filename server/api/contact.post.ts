import { sendEmail } from './notification/email/[id]/send.post'

export default defineEventHandler<
  Promise<{
    meetingTime: string
    meetingUri: string
  }>
>(async (event) => {
  try {
    const body = await readValidatedBody(event, emailFormSchema.parse)

    const config = useRuntimeConfig()
    const notionDbId = config.private.notionDbId as unknown as NotionDB

    const meetingEvent = await apiGoogle<{
      name: string
      meetingUri: string
      meetingCode: string
    }>('/spaces', {
      baseURL: 'https://meet.googleapis.com/v2',
      method: 'POST',
      body: {},
    })

    await notion.pages.create({
      parent: { data_source_id: notionDbId.prospect },
      properties: {
        Name: {
          type: 'title',
          title: [{ type: 'text', text: { content: body.name } }],
        },
        Company: {
          type: 'rich_text',
          rich_text: [{ type: 'text', text: { content: body.company } }],
        },
        'Project Details': {
          type: 'rich_text',
          rich_text: [{ type: 'text', text: { content: body.projectDescription } }],
        },
        Email: { type: 'email', email: body.email },
        Date: { type: 'date', date: { start: body.meetingTime } },
        'Meeting Link': { type: 'url', url: meetingEvent.meetingUri },
      },
    })

    await sendEmail('contact', [
      {
        toPersonName: body.name,
        toCompanyName: body.company,
        toEmail: body.email,
        toProjectDescription: body.projectDescription,
        toMeetingTime: body.meetingTime,
        toMeetingLink: meetingEvent.meetingUri,
      },
    ])

    return {
      meetingTime: body.meetingTime,
      meetingUri: meetingEvent.meetingUri,
    }
  } catch (error: unknown) {
    console.error('API contact POST', error)

    const { code: errorCode } = error as { code?: string }
    if (errorCode === 'ESOCKET' || errorCode === 'ECONNECTION') {
      throw createError({ statusCode: 500, statusMessage: 'Failed to establish secure SMTP connection. Please check SSL/TLS settings.' })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
