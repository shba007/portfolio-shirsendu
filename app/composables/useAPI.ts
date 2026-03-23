export const useAPI = createUseFetch((currentOptions) => {
  const config = useRuntimeConfig()

  return {
    ...currentOptions,
    baseURL: currentOptions.baseURL ?? config.public.siteUrl,
  }
})
