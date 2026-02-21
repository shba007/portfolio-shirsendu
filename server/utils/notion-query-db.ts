import type { Client } from '@notionhq/client'
import type { QueryDataSourceParameters, QueryDataSourceResponse } from '@notionhq/client/build/src/api-endpoints'

export default async function queryAllDataSource<T>(notion: Client, dataSourceId: string, queryOptions?: Omit<QueryDataSourceParameters, 'data_source_id'>): Promise<T[]> {
  const content: T[] = []

  try {
    let cursor: string | undefined = undefined

    do {
      const response: QueryDataSourceResponse = await notion.dataSources.query({
        data_source_id: dataSourceId,
        page_size: 100,
        start_cursor: cursor,
        ...queryOptions,
      })

      content.push(...(response.results as unknown as T[]))
      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
    } while (cursor)
  } catch (error) {
    console.error(error)
  }
  return content
}
