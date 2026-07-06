let oauthAccessToken: string | null = null

export default async function apiGoogle<T>(
  path: string,
  options: {
    baseURL: string
    method?: 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace'
    query?: Record<string, unknown>
    body?: BodyInit | Record<string, unknown> | null
    headers?: Record<string, string>
    _retry?: boolean
  }
): Promise<T> {
  const { baseURL, headers = {}, _retry = false, ...rest } = options

  try {
    return (await $fetch(path, {
      baseURL,
      headers: oauthAccessToken ? { ...headers, Authorization: `Bearer ${oauthAccessToken}` } : headers,
      body: rest.body as BodyInit | Record<string, unknown> | null,
      ...rest,
    })) as T
  } catch (err: unknown) {
    const status = (err as { response?: { status?: number } })?.response?.status

    const { oauthClientId, oauthClientSecret, oauthRefreshToken } = useRuntimeConfig().private

    if (status === 401 && !_retry && oauthRefreshToken) {
      const safeId = encodeURIComponent(oauthClientId)
      const safeSecret = encodeURIComponent(oauthClientSecret)

      const basicAuth = Buffer.from(`${safeId}:${safeSecret}`).toString('base64')

      const tokens = await $fetch<{ access_token: string; refresh_token: string }>('/token', {
        baseURL: 'https://oauth2.googleapis.com',
        method: 'POST',
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          refresh_token: oauthRefreshToken,
          grant_type: 'refresh_token',
        }).toString(),
      }).catch((reason) => {
        console.log({ reason })
      })

      if (tokens && 'access_token' in tokens) {
        oauthAccessToken = tokens.access_token
      } else {
        throw new Error('Failed to refresh access token', { cause: err })
      }
      return apiGoogle<T>(path, { ...options, _retry: true })
    }

    throw err
  }
}
