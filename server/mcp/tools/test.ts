import { z } from 'zod'

export default defineMcpTool({
  description: 'A simple test tool',
  inputSchema: {
    message: z.string(),
  },
  handler: async ({ message }) => `Test successful: ${message}`,
})
