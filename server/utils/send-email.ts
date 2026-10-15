export async function sendEmail<T extends keyof EmailTemplateData>(template: T, payload: EmailTemplateData[T][]): Promise<boolean> {
  const config = useRuntimeConfig()
  const emailApiUrl = config.private.emailApiUrl || process.env.EMAIL_API_URL
  const emailApiKey = config.private.emailApiKey || process.env.EMAIL_API_KEY
  const metaData = (config.private.emailMetaData as unknown as EmailMetaData) || {}

  if (!emailApiUrl) {
    console.warn('[sendEmail] EMAIL_API_URL is not configured; skipping email dispatch.')
    return true
  }

  try {
    await $fetch(emailApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(emailApiKey ? { Authorization: `Bearer ${emailApiKey}` } : {}),
      },
      body: {
        template,
        payload,
        meta: metaData,
      },
    })
    return true
  } catch (error) {
    console.error('[sendEmail] Failed to dispatch email via external API:', error)
    return false
  }
}

export default sendEmail
