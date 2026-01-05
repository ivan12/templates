import { onValue, ref, set } from "firebase/database"
import { database } from "@/lib/firebase-client"

export type AppConfig = {
  titleApp: string
  titleHome: string
  subtitleHome: string
  urlGithub: string
  urlOfficialGithub: string
}

const configRef = ref(database, "appConfig")

export function subscribeAppConfig(callback: (config: AppConfig | null) => void) {
  return onValue(configRef, (snapshot) => {
    const value = snapshot.val()
    if (!value) {
      callback(null)
      return
    }
    callback({
      titleApp: typeof value.titleApp === "string" ? value.titleApp : "",
      titleHome: typeof value.titleHome === "string" ? value.titleHome : "",
      subtitleHome: typeof value.subtitleHome === "string" ? value.subtitleHome : "",
      urlGithub: typeof value.urlGithub === "string" ? value.urlGithub : "",
      urlOfficialGithub: typeof value.urlOfficialGithub === "string" ? value.urlOfficialGithub : "",
    })
  })
}

export function saveAppConfig(config: AppConfig) {
  return set(configRef, config)
}
