import { get, ref, set } from "firebase/database"
import { database } from "@/lib/firebase-client"

type AdminCredentials = {
  username: string
  password: string
}

const credentialsRef = ref(database, "adminCredentials")

export async function getAdminCredentials(): Promise<AdminCredentials | null> {
  const snapshot = await get(credentialsRef)
  const value = snapshot.val()
  if (!value) return null
  return {
    username: typeof value.username === "string" ? value.username : "",
    password: typeof value.password === "string" ? value.password : "",
  }
}

export async function ensureAdminCredentials(defaults: AdminCredentials) {
  const existing = await getAdminCredentials()
  if (existing && existing.username && existing.password) {
    return existing
  }
  await set(credentialsRef, defaults)
  return defaults
}
