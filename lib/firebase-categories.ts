import { onValue, ref, remove, set } from "firebase/database"
import { database } from "@/lib/firebase-client"

export type TemplateCategory = {
  id: string
  name: string
  order: number
}

const categoriesRef = ref(database, "categories")

function normalizeCategory(raw: TemplateCategory | null): TemplateCategory | null {
  if (!raw) return null
  if (typeof raw.id !== "string") return null
  return {
    id: raw.id,
    name: typeof raw.name === "string" ? raw.name : "",
    order: typeof raw.order === "number" ? raw.order : 0,
  }
}

export function subscribeCategories(callback: (categories: TemplateCategory[]) => void) {
  return onValue(categoriesRef, (snapshot) => {
    const value = snapshot.val()
    if (!value) {
      callback([])
      return
    }
    const entries = Object.values(value) as TemplateCategory[]
    const items = entries
      .map((item) => normalizeCategory(item))
      .filter((item): item is TemplateCategory => !!item)
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
    callback(items)
  })
}

export function saveCategory(category: TemplateCategory) {
  return set(ref(database, `categories/${category.id}`), category)
}

export function deleteCategory(id: string) {
  return remove(ref(database, `categories/${id}`))
}
