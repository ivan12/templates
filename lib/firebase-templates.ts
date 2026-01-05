import { onValue, ref, remove, set } from "firebase/database"
import { database } from "@/lib/firebase-client"
import { TemplateItem } from "@/lib/template-items"

const templatesRef = ref(database, "templateItems")

type TemplatesCallback = (items: TemplateItem[]) => void

function normalizeItem(raw: TemplateItem | null): TemplateItem | null {
  if (!raw) return null
  if (typeof raw.id !== "number") return null
  return {
    id: raw.id,
    order: typeof raw.order === "number" ? raw.order : raw.id,
    active: typeof raw.active === "boolean" ? raw.active : true,
    title: typeof raw.title === "string" ? raw.title : "",
    subtitle: typeof raw.subtitle === "string" ? raw.subtitle : "",
    category: typeof raw.category === "string" ? raw.category : "Custom",
    urlImage: typeof raw.urlImage === "string" ? raw.urlImage : "",
    tags: Array.isArray(raw.tags) ? raw.tags.filter((tag) => typeof tag === "string") : [],
    demoUrl: typeof raw.demoUrl === "string" ? raw.demoUrl : "#",
    htmlFile: typeof raw.htmlFile === "string" ? raw.htmlFile : "",
  }
}

export function subscribeTemplateItems(callback: TemplatesCallback) {
  return onValue(templatesRef, (snapshot) => {
    const value = snapshot.val()
    if (!value) {
      callback([])
      return
    }
    const entries = Object.values(value) as TemplateItem[]
    const items = entries
      .map((item) => normalizeItem(item))
      .filter((item): item is TemplateItem => !!item)
      .sort((a, b) => a.order - b.order || a.id - b.id)
    callback(items)
  })
}

export function saveTemplateItem(item: TemplateItem) {
  return set(ref(database, `templateItems/${item.id}`), item)
}

export function deleteTemplateItem(id: number) {
  return remove(ref(database, `templateItems/${id}`))
}
