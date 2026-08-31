import { check, type Update } from '@tauri-apps/plugin-updater'
import { relaunch } from '@tauri-apps/plugin-process'

export interface UseAppUpdaterOptions {
  checkOnStartup?: boolean
  autoInstall?: boolean
}

export function useAppUpdater(options: UseAppUpdaterOptions = { checkOnStartup: true, autoInstall: false }) {
  const isChecking = ref(false)
  const isDownloading = ref(false)
  const updateAvailable = ref(false)
  const progress = ref(0)
  const error = ref<string | null>(null)
  const pendingUpdate = ref<Update | null>(null)
  const version = ref<string | null>(null)
  const releaseNotes = ref<string | null>(null)

  const checkForUpdates = async () => {
    isChecking.value = true
    error.value = null

    try {
      const update = await check()

      if (update?.available) {
        pendingUpdate.value = update
        updateAvailable.value = true
        version.value = update.version
        releaseNotes.value = update.body ?? null

        if (options.autoInstall) {
          await downloadAndInstall()
        }
      } else {
        updateAvailable.value = false
        pendingUpdate.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      isChecking.value = false
    }
  }

  const downloadAndInstall = async () => {
    if (!pendingUpdate.value) return

    isDownloading.value = true
    error.value = null
    progress.value = 0

    try {
      let downloaded = 0
      let contentLength = 0

      await pendingUpdate.value.downloadAndInstall((event) => {
        switch (event.event) {
          case 'Started':
            contentLength = event.data.contentLength ?? 0
            break
          case 'Progress':
            downloaded += event.data.chunkLength
            if (contentLength > 0) {
              progress.value = Math.round((downloaded / contentLength) * 100)
            }
            break
          case 'Finished':
            progress.value = 100
            break
        }
      })

      // Restart application to apply changes
      await relaunch()
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      isDownloading.value = false
    }
  }

  if (options.checkOnStartup) {
    onMounted(async () => {
      await checkForUpdates()
    })
  }

  return {
    isChecking,
    isDownloading,
    updateAvailable,
    progress,
    error,
    version,
    releaseNotes,
    checkForUpdates,
    downloadAndInstall,
  }
}
