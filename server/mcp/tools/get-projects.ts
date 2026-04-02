import { z } from 'zod'

export default defineMcpTool({
  description: 'List, paginate, and filter projects by technology stack, name, or keyword',
  inputSchema: {
    technology: z.string().optional().describe('Filter by technology e.g. "nuxt", "rust", "typescript"'),
    query: z.string().optional().describe('Search keyword matched against name and description'),
    limit: z.number().int().min(1).max(50).optional().describe('Max number of projects to return'),
    offset: z.number().int().min(0).optional().describe('Number of projects to skip'),
  },
  handler: async ({ technology, query, limit, offset = 0 }) => {
    let projects = await $fetch<Project[]>('/api/project')

    if (technology) {
      const tech = technology.toLowerCase()
      projects = projects.filter((p) => p.technologies.some((t) => t.toLowerCase().includes(tech)))
    }

    if (query) {
      const q = query.toLowerCase()
      projects = projects.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    }

    const total = projects.length
    const sliced = limit ? projects.slice(offset, offset + limit) : projects.slice(offset)

    return {
      total,
      returned: sliced.length,
      offset,
      projects: sliced.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        version: p.version,
        technologies: p.technologies,
        stars: p.stars,
        forks: p.forks,
        appURL: p.appURL,
        repo: p.repo,
        updatedAt: p.updatedAt,
      })),
    }
  },
})
