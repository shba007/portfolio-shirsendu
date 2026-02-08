import * as z from 'zod'

const newsletterSchema = z.object({
  email: z.email(),
  subscribed: z.boolean(),
})

export type Newsletter = z.infer<typeof newsletterSchema>

export default defineEventHandler<Promise<{ subscribed: boolean }>>(async (event) => {
  try {
    const config = useRuntimeConfig()
    const notionDbId = config.private.notionDbId as unknown as NotionDB

    const body = await readValidatedBody(event, newsletterSchema.parse)

    await notion.pages.create({
      parent: {
        database_id: notionDbId.newsletter,
      },
      properties: {
        Email: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: body.email,
              },
            },
          ],
        },
        Subscribed: {
          checkbox: true,
        },
      },
    })

    return { subscribed: true }
  } catch (error: unknown) {
    console.error('API newsletter POST', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
