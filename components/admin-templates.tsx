"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { TemplateItem, templateItems } from "@/lib/template-items"
import { deleteTemplateItem, saveTemplateItem, subscribeTemplateItems } from "@/lib/firebase-templates"
import { ensureAdminCredentials, getAdminCredentials } from "@/lib/firebase-admin"
import { AppConfig, saveAppConfig, subscribeAppConfig } from "@/lib/firebase-config"
import { TemplateCategory, deleteCategory, saveCategory, subscribeCategories } from "@/lib/firebase-categories"

type NewItemState = {
  order: number
  active: boolean
  title: string
  subtitle: string
  category: string
  urlImage: string
  htmlFile: string
  tags: string
}

const emptyNewItem: NewItemState = {
  order: 0,
  active: true,
  title: "",
  subtitle: "",
  category: "",
  urlImage: "",
  htmlFile: "",
  tags: "",
}

const defaultConfig: AppConfig = {
  titleApp: "Templates",
  titleHome: "Start building in seconds",
  subtitleHome: "Kickstart your project with templates. Download, customize, and deploy in minutes.",
  urlGithub: "https://github.com/ivan12",
  urlOfficialGithub: "https://github.com/ivan12/templates",
}

const emptyCategory = {
  name: "",
  order: 0,
}

const defaultAdminCredentials = {
  username: "admin",
  password: "coragemivan",
}

const authStorageKey = "admin-authenticated"

function tagsToString(tags: string[]) {
  return tags.join(", ")
}

function stringToTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
}

export default function AdminTemplates() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const withBasePath = (path: string) => {
    if (!path) return path
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//") || path.startsWith("data:")) {
      return path
    }
    return `${basePath}${path.startsWith("/") ? path : `/${path}`}`
  }
  const [items, setItems] = useState<TemplateItem[]>(templateItems)
  const [isAdding, setIsAdding] = useState(false)
  const [newItem, setNewItem] = useState<NewItemState>(emptyNewItem)
  const [activeTab, setActiveTab] = useState<"home" | "templates" | "categories">("home")
  const [appConfig, setAppConfig] = useState<AppConfig>(defaultConfig)
  const [categories, setCategories] = useState<TemplateCategory[]>([])
  const [newCategory, setNewCategory] = useState(emptyCategory)
  const [removeTarget, setRemoveTarget] = useState<TemplateItem | null>(null)
  const hasSeededCategories = useRef(false)
  const categoriesSnapshot = useRef<Map<string, string>>(new Map())
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })

  useEffect(() => {
    const storedAuth = typeof window !== "undefined" ? window.localStorage.getItem(authStorageKey) : null
    setIsAuthenticated(storedAuth === "true")

    const unsubscribeTemplates = subscribeTemplateItems((nextItems) => {
      setItems(nextItems.length ? nextItems : templateItems)
    })
    const unsubscribeConfig = subscribeAppConfig((config) => {
      if (!config) return
      setAppConfig((current) => ({
        ...current,
        titleApp: config.titleApp || current.titleApp,
        titleHome: config.titleHome || current.titleHome,
        subtitleHome: config.subtitleHome || current.subtitleHome,
        urlGithub: config.urlGithub || current.urlGithub,
        urlOfficialGithub: config.urlOfficialGithub || current.urlOfficialGithub,
      }))
    })
    const unsubscribeCategories = subscribeCategories((itemsFromDb) => {
      setCategories(itemsFromDb)
      categoriesSnapshot.current = new Map(itemsFromDb.map((category) => [category.id, category.name]))
    })
    ensureAdminCredentials(defaultAdminCredentials).catch(() => null)
    return () => {
      unsubscribeTemplates()
      unsubscribeConfig()
      unsubscribeCategories()
    }
  }, [])

  useEffect(() => {
    if (hasSeededCategories.current) return
    if (categories.length) {
      hasSeededCategories.current = true
      return
    }
    const unique = Array.from(new Set(templateItems.map((item) => item.category).filter(Boolean)))
    if (!unique.length) return
    hasSeededCategories.current = true
    unique.forEach((name, index) => {
      const id = `${name.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`
      saveCategory({ id, name, order: index + 1 })
    })
  }, [categories])

  const nextId = useMemo(() => {
    return items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1
  }, [items])

  const handleChange = (id: number, field: keyof TemplateItem, value: string | boolean) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "tags"
                  ? stringToTags(String(value))
                  : field === "order"
                    ? Number(value) || 0
                    : field === "active"
                      ? Boolean(value)
                      : String(value),
            }
          : item
      )
    )
  }

  const handleSave = async (item: TemplateItem) => {
    await saveTemplateItem(item)
  }

  const handleLogin = async () => {
    setLoginError("")
    try {
      const credentials = await getAdminCredentials()
      if (!credentials) {
        setLoginError("Admin credentials not found.")
        return
      }
      if (
        credentials.username === loginForm.username.trim() &&
        credentials.password === loginForm.password
      ) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(authStorageKey, "true")
        }
        setIsAuthenticated(true)
        setLoginForm({ username: "", password: "" })
        return
      }
      setLoginError("Invalid username or password.")
    } catch (error) {
      setLoginError("Login failed.")
    }
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(authStorageKey)
    }
    setIsAuthenticated(false)
  }

  const handleToggleActive = async (id: number, value: boolean) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, active: value } : item))
    )
    const target = items.find((item) => item.id === id)
    if (!target) return
    await saveTemplateItem({ ...target, active: value })
  }

  const handleRemove = async (id: number) => {
    await deleteTemplateItem(id)
  }

  const handleAdd = async () => {
    const created: TemplateItem = {
      id: nextId,
      order: newItem.order || nextId,
      active: newItem.active,
      title: newItem.title,
      subtitle: newItem.subtitle,
      category: newItem.category || "Custom",
      urlImage: newItem.urlImage,
      tags: stringToTags(newItem.tags),
      demoUrl: "#",
      htmlFile: newItem.htmlFile,
    }
    await saveTemplateItem(created)
    setIsAdding(false)
    setNewItem(emptyNewItem)
  }

  const handleSaveConfig = async () => {
    await saveAppConfig(appConfig)
  }

  const handleCategoryChange = (id: string, field: keyof TemplateCategory, value: string) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === id
          ? {
              ...category,
              [field]: field === "order" ? Number(value) || 0 : value,
            }
          : category
      )
    )
  }

  const handleSaveCategory = async (category: TemplateCategory) => {
    const trimmedName = category.name.trim()
    const previousName = categoriesSnapshot.current.get(category.id) || ""
    const nextCategory = { ...category, name: trimmedName }
    await saveCategory(nextCategory)
    if (previousName && previousName !== trimmedName) {
      const itemsToUpdate = items.filter((item) => item.category === previousName)
      if (!itemsToUpdate.length) return
      const updatedItems = items.map((item) =>
        item.category === previousName ? { ...item, category: trimmedName } : item
      )
      setItems(updatedItems)
      await Promise.all(
        itemsToUpdate.map((item) => saveTemplateItem({ ...item, category: trimmedName }))
      )
    }
  }

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id)
  }

  const handleAddCategory = async () => {
    const id = `${newCategory.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`
    const created: TemplateCategory = {
      id,
      name: newCategory.name,
      order: newCategory.order,
    }
    await saveCategory(created)
    setNewCategory(emptyCategory)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Templates Admin</h1>
            <p className="text-sm text-slate-400">Dados via Firebase. HTML fica em templatesCode.</p>
          </div>
          {isAuthenticated && (
            <Button className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {!isAuthenticated && (
          <Card className="max-w-md border-slate-800 bg-slate-900/50 text-white p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Admin login</h2>
              <p className="text-xs text-slate-400">Enter your credentials to continue.</p>
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-slate-400">username</label>
                <Input
                  value={loginForm.username}
                  onChange={(event) => setLoginForm((current) => ({ ...current, username: event.target.value }))}
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-slate-400">password</label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              {loginError && <p className="text-xs text-red-400">{loginError}</p>}
            </div>
            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-500" onClick={handleLogin}>
                Login
              </Button>
            </div>
          </Card>
        )}

        {isAuthenticated && (
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
          <TabsList className="bg-slate-900/60 border border-slate-800">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white"
            >
              Home
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white"
            >
              Templates
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="data-[state=active]:bg-slate-800 data-[state=active]:text-white"
            >
              Categories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-6">
            <Card className="border-slate-800 bg-slate-900/50 text-white p-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold">Home settings</h2>
                <p className="text-xs text-slate-400">Edit titles and GitHub links.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wide text-slate-400">title app</label>
                  <Input
                    value={appConfig.titleApp}
                    onChange={(event) => setAppConfig((current) => ({ ...current, titleApp: event.target.value }))}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wide text-slate-400">title home</label>
                  <Input
                    value={appConfig.titleHome}
                    onChange={(event) => setAppConfig((current) => ({ ...current, titleHome: event.target.value }))}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs uppercase tracking-wide text-slate-400">subtitle</label>
                  <Input
                    value={appConfig.subtitleHome}
                    onChange={(event) => setAppConfig((current) => ({ ...current, subtitleHome: event.target.value }))}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wide text-slate-400">url github</label>
                  <Input
                    value={appConfig.urlGithub}
                    onChange={(event) => setAppConfig((current) => ({ ...current, urlGithub: event.target.value }))}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wide text-slate-400">url official github</label>
                  <Input
                    value={appConfig.urlOfficialGithub}
                    onChange={(event) =>
                      setAppConfig((current) => ({ ...current, urlOfficialGithub: event.target.value }))
                    }
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveConfig} className="bg-blue-600 hover:bg-blue-500">
                  Save
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="mt-6 space-y-6">
            <div className="flex justify-end">
              <Button onClick={() => setIsAdding((value) => !value)} className="bg-blue-600 hover:bg-blue-500">
                {isAdding ? "Close" : "Add"}
              </Button>
            </div>

            {isAdding && (
              <Card className="border-slate-800 bg-slate-900/50 text-white p-6 space-y-4">
                <div>
                  <h2 className="text-lg font-semibold">New template</h2>
                  <p className="text-xs text-slate-400">Fill in the metadata and HTML file name.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wide text-slate-400">order</label>
                    <Input
                      type="number"
                      value={newItem.order}
                      onChange={(event) =>
                        setNewItem((current) => ({ ...current, order: Number(event.target.value) || 0 }))
                      }
                      className="bg-slate-950 border-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wide text-slate-400">active</label>
                    <div className="flex items-center gap-3 h-10">
                      <Switch
                        checked={newItem.active}
                        onCheckedChange={(value) => setNewItem((current) => ({ ...current, active: value }))}
                        className="data-[state=checked]:bg-emerald-400 data-[state=unchecked]:bg-slate-700"
                      />
                      <span className="text-xs text-slate-400">{newItem.active ? "Visible" : "Hidden"}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wide text-slate-400">title</label>
                    <Input
                      value={newItem.title}
                      onChange={(event) => setNewItem((current) => ({ ...current, title: event.target.value }))}
                      className="bg-slate-950 border-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wide text-slate-400">subtitle</label>
                    <Input
                      value={newItem.subtitle}
                      onChange={(event) => setNewItem((current) => ({ ...current, subtitle: event.target.value }))}
                      className="bg-slate-950 border-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wide text-slate-400">category</label>
                    <select
                      value={newItem.category}
                      onChange={(event) => setNewItem((current) => ({ ...current, category: event.target.value }))}
                      className="h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 text-sm text-white"
                    >
                      <option value="">Select</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wide text-slate-400">urlImage</label>
                    <Input
                      value={newItem.urlImage}
                      onChange={(event) => setNewItem((current) => ({ ...current, urlImage: event.target.value }))}
                      className="bg-slate-950 border-slate-800 text-white"
                      placeholder="/image.png"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wide text-slate-400">htmlFile</label>
                    <Input
                      value={newItem.htmlFile}
                      onChange={(event) => setNewItem((current) => ({ ...current, htmlFile: event.target.value }))}
                      className="bg-slate-950 border-slate-800 text-white"
                      placeholder="templatesCode/file.html"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wide text-slate-400">tags</label>
                    <Input
                      value={newItem.tags}
                      onChange={(event) => setNewItem((current) => ({ ...current, tags: event.target.value }))}
                      className="bg-slate-950 border-slate-800 text-white"
                      placeholder="Demo, Landing"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-500">
                    Save
                  </Button>
                </div>
              </Card>
            )}

            {!items.length && <p className="text-slate-400">No templates found.</p>}
            {[...items].sort((a, b) => b.order - a.order || b.id - a.id).map((item) => (
              <details key={item.id} className="rounded-lg border border-slate-800 bg-slate-900/50">
                <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-16 overflow-hidden rounded bg-slate-800">
                      {item.urlImage ? (
                        <img src={withBasePath(item.urlImage)} alt="" className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                    <div>
                      <div className="font-semibold">{item.title || `Template ${item.id}`}</div>
                      <div className="text-xs text-slate-400">{item.htmlFile || "No html file"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={item.active}
                      onCheckedChange={(value) => handleToggleActive(item.id, value)}
                      className="data-[state=checked]:bg-emerald-400 data-[state=unchecked]:bg-slate-700"
                    />
                    <span className="text-xs text-slate-400">#{item.id}</span>
                  </div>
                </summary>

                <div className="px-6 pb-6 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wide text-slate-400">order</label>
                      <Input
                        type="number"
                        value={item.order}
                        onChange={(event) => handleChange(item.id, "order", event.target.value)}
                        className="bg-slate-950 border-slate-800 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wide text-slate-400">title</label>
                      <Input
                        value={item.title}
                        onChange={(event) => handleChange(item.id, "title", event.target.value)}
                        className="bg-slate-950 border-slate-800 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wide text-slate-400">subtitle</label>
                      <Input
                        value={item.subtitle}
                        onChange={(event) => handleChange(item.id, "subtitle", event.target.value)}
                        className="bg-slate-950 border-slate-800 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wide text-slate-400">category</label>
                      <select
                        value={item.category}
                        onChange={(event) => handleChange(item.id, "category", event.target.value)}
                        className="h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 text-sm text-white"
                      >
                        <option value={item.category}>{item.category}</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wide text-slate-400">urlImage</label>
                      <Input
                        value={item.urlImage}
                        onChange={(event) => handleChange(item.id, "urlImage", event.target.value)}
                        className="bg-slate-950 border-slate-800 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wide text-slate-400">htmlFile</label>
                      <Input
                        value={item.htmlFile}
                        onChange={(event) => handleChange(item.id, "htmlFile", event.target.value)}
                        className="bg-slate-950 border-slate-800 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wide text-slate-400">tags</label>
                      <Input
                        value={tagsToString(item.tags)}
                        onChange={(event) => handleChange(item.id, "tags", event.target.value)}
                        className="bg-slate-950 border-slate-800 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <Button className="bg-red-600 hover:bg-red-500" onClick={() => setRemoveTarget(item)}>
                      Remove
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-500" onClick={() => handleSave(item)}>
                      Save
                    </Button>
                  </div>
                </div>
              </details>
            ))}
          </TabsContent>

          <TabsContent value="categories" className="mt-6 space-y-6">
            <Card className="border-slate-800 bg-slate-900/50 text-white p-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold">New category</h2>
                <p className="text-xs text-slate-400">Create categories for filtering.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wide text-slate-400">name</label>
                  <Input
                    value={newCategory.name}
                    onChange={(event) => setNewCategory((current) => ({ ...current, name: event.target.value }))}
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wide text-slate-400">order</label>
                  <Input
                    type="number"
                    value={newCategory.order}
                    onChange={(event) =>
                      setNewCategory((current) => ({ ...current, order: Number(event.target.value) || 0 }))
                    }
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddCategory} className="bg-blue-600 hover:bg-blue-500">
                  Save
                </Button>
              </div>
            </Card>

            {!categories.length && <p className="text-slate-400">No categories found.</p>}
            {categories.map((category) => (
              <Card key={category.id} className="border-slate-800 bg-slate-900/50 text-white p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wide text-slate-400">name</label>
                    <Input
                      value={category.name}
                      onChange={(event) => handleCategoryChange(category.id, "name", event.target.value)}
                      className="bg-slate-950 border-slate-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wide text-slate-400">order</label>
                    <Input
                      type="number"
                      value={category.order}
                      onChange={(event) => handleCategoryChange(category.id, "order", event.target.value)}
                      className="bg-slate-950 border-slate-800 text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button className="bg-red-600 hover:bg-red-500" onClick={() => handleDeleteCategory(category.id)}>
                    Remove
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-500" onClick={() => handleSaveCategory(category)}>
                    Save
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
        )}

        <AlertDialog open={!!removeTarget} onOpenChange={(open) => !open && setRemoveTarget(null)}>
          <AlertDialogContent className="bg-slate-950 border-slate-800 text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Remove template?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-slate-700">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-500"
                onClick={() => {
                  if (removeTarget) {
                    handleRemove(removeTarget.id)
                  }
                  setRemoveTarget(null)
                }}
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  )
}
