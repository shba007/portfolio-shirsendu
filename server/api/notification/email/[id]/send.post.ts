import { sendEmail } from '~~/server/utils/send-email'

export { sendEmail }

export default defineEventHandler<Promise<{ success: boolean }>>(async (event) => {
  try {
    const config = useRuntimeConfig()
    const body = await readBody<TransactionalEmail<keyof EmailTemplateData>>(event)

    return {
      success: await sendEmail(body.template, [
        {
          toCompanyName: body.data.toCompanyName,
          toEmail: body.data.toEmail,
          ...(body.data.fromFeaturedProjects && {
            fromFeaturedProjects: await Promise.all(
              body.data.fromFeaturedProjects.map(async (key) => {
                try {
                  const data = await $fetch(`/api/project/${(key as unknown as string).toLowerCase()}`, {
                    baseURL: config.public.siteUrl,
                  })
                  if (Array.isArray(data)) throw new Error('Unexpected array response')
                  return { id: data.images[0].id, name: data.name, description: data.description, url: data.url }
                } catch {
                  return null
                }
              })
            ).then((photos) => photos.filter((photo) => photo !== null)),
          }),
        },
      ]),
    }
  } catch (error: unknown) {
    console.error('API notification/email/[id]/send POST', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to dispatch email via external API',
    })
  }
})
