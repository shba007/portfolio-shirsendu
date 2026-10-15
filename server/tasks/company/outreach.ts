import { sendEmail } from '~~/server/utils/send-email'

export default defineTask({
  meta: {
    name: 'company:outreach',
    description: 'Outreach companies via email',
  },
  async run() {
    const config = useRuntimeConfig()
    const notionDbId = config.private.notionDbId as unknown as NotionDB

    const companies = await notionQueryDb<NotionCompany>(notion, notionDbId.company)

    // console.log(companies[0].properties.)

    // return { result: 'success' }

    await Promise.allSettled(
      companies.map(async ({ id, properties }) => {
        const companyName = notionTextStringify(properties.Name.title)
        const email = properties.Email.email
        const status = properties.Status.status.name

        if (!(status === 'Verified')) return

        if (email) {
          console.log(`Sending new outreach email →`, companyName)

          await sendEmail('prospect', [
            {
              toEmail: email,
              toCompanyName: companyName,
              fromFeaturedProjects: await Promise.all(
                ['game-of-life', 'pixelsql-village', 'photographer-s-portfolio'].map(async (key) => {
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
            },
          ])
        }

        await notion.pages.update({
          page_id: id,
          properties: {
            Status: {
              status: {
                name: 'Initiate',
              },
            },
          },
        })
      })
    )

    return { result: 'success' }
  },
})
