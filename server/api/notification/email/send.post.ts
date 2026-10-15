import { sendEmail } from '~~/server/utils/send-email'

export default defineEventHandler<Promise<{ success: boolean }>>(async (event) => {
  try {
    const body = await readBody<TransactionalEmail<keyof EmailTemplateData>>(event)

    return { success: await sendEmail(body.template, [body.data]) }
  } catch (error: unknown) {
    console.error('API notification/email/send POST', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to dispatch email via external API',
    })
  }
})
