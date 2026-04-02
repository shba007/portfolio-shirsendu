import { z } from 'zod'

export default defineMcpTool({
  description: 'Get full details of a specific project by its ID',
  inputSchema: {
    id: z.string().describe('Project ID e.g. "nuxtemplate", "unpsy", "unai"'),
  },
  handler: async ({ id }) => {
    const project = await $fetch<Project[]>(`/api/project/${id}`)

    if (!project) {
      return { error: `No project found with id "${id}"` }
    }

    return { ...project }
  },
})
