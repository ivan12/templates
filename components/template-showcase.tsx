"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DemoModal } from "@/components/demo-modal"
import { templateItems } from "@/lib/template-items"
import { subscribeAppConfig } from "@/lib/firebase-config"
import { subscribeCategories } from "@/lib/firebase-categories"
import { subscribeTemplateItems } from "@/lib/firebase-templates"
import { fetchTemplateHtml } from "@/lib/template-html"
import { Coffee, Download, ExternalLink, Search, Settings } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

export function TemplateShowcase() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const withBasePath = (path: string) => {
    if (!path) return path
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("//") || path.startsWith("data:")) {
      return path
    }
    return `${basePath}${path.startsWith("/") ? path : `/${path}`}`
  }
  const adminPath = basePath ? `${basePath}/admin` : "/admin"
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [selectedTemplate, setSelectedTemplate] = useState<{ id: number; name: string; htmlFile: string } | null>(null)
  const [items, setItems] = useState(templateItems)
  const [currentPage, setCurrentPage] = useState(1)
  const [appConfig, setAppConfig] = useState({
    titleApp: "Templates",
    titleHome: "Start building in seconds",
    subtitleHome: "Kickstart your project with templates. Download, customize, and deploy in minutes.",
    urlGithub: "https://github.com/ivan12",
    urlOfficialGithub: "https://github.com/ivan12/templates",
  })
  const [categories, setCategories] = useState<string[]>([])
  const statsCardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeTemplateItems((nextItems) => {
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
      setCategories(itemsFromDb.map((item) => item.name))
    })
    return () => {
      unsubscribe()
      unsubscribeConfig()
      unsubscribeCategories()
    }
  }, [])

  const sortedItems = [...items].sort((a, b) => b.order - a.order || b.id - a.id)
  const derivedCategories = Array.from(new Set(sortedItems.map((t) => t.category)))
  const visibleCategories = categories.length ? categories : derivedCategories

  const activeTemplates = sortedItems.filter((template) => template.active !== false)
  const shuffleTemplates = (source: typeof activeTemplates) => {
    const next = [...source]
    for (let i = next.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[next[i], next[j]] = [next[j], next[i]]
    }
    return next
  }
  const marqueeRows = useMemo(() => {
    const rowOne = shuffleTemplates(activeTemplates)
    const rowTwo = shuffleTemplates(activeTemplates)
    const rowThree = shuffleTemplates(activeTemplates)
    return [
      [...rowOne, ...rowOne],
      [...rowTwo, ...rowTwo],
      [...rowThree, ...rowThree],
    ]
  }, [activeTemplates])
  const filteredTemplates = activeTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "ALL" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  const totalActiveTemplates = activeTemplates.length
  const pageSize = 15
  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const pagedTemplates = filteredTemplates.slice((safePage - 1) * pageSize, safePage * pageSize)

  const handleDownload = async (template: (typeof items)[0]) => {
    try {
      const htmlContent = await fetchTemplateHtml(template.htmlFile, basePath)
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${template.title.toLowerCase().replace(/\s+/g, "-")}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      return
    }
  }

  const handleDemo = (template: (typeof items)[0]) => {
    setSelectedTemplate({ id: template.id, name: template.title, htmlFile: template.htmlFile })
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("ALL")
    setCurrentPage(1)
  }
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  const handleStatsMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = statsCardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 10
    const rotateX = -((y - centerY) / centerY) * 10
    card.style.setProperty("--rx", `${rotateX}deg`)
    card.style.setProperty("--ry", `${rotateY}deg`)
  }

  const handleStatsMouseLeave = () => {
    const card = statsCardRef.current
    if (!card) return
    card.style.setProperty("--rx", "0deg")
    card.style.setProperty("--ry", "0deg")
  }

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_260)]">
      <header className="border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary" />
              <span className="text-xl font-semibold text-card-foreground">{appConfig.titleApp}</span>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Button asChild variant="outline" size="sm" className="text-black border-border hover:bg-accent">
                <a href={appConfig.urlGithub} target="_blank" rel="noreferrer">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="icon" className="text-black border-border hover:bg-accent">
                <a href={adminPath} aria-label="Admin">
                  <Settings className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-border/50 bg-card/30 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-35">
            <div className="flex h-full flex-col items-center justify-center gap-6">
              <div className="hero-marquee flex w-max items-center gap-4">
                {marqueeRows[0].map((template, index) => (
                  <button
                    type="button"
                    key={`bg-${template.id}-${index}`}
                    onClick={() => handleDemo(template)}
                    aria-label={`Open demo for ${template.title}`}
                    className="group relative h-24 w-40 sm:h-28 sm:w-48 lg:h-32 lg:w-56 overflow-hidden rounded-2xl flex-shrink-0 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <img
                      src={withBasePath(template.urlImage || "/placeholder.svg")}
                      alt=""
                      className="h-full w-full object-cover opacity-55 saturate-125 brightness-75 blur-[0.5px] transition duration-300 group-hover:opacity-95 group-hover:saturate-150 group-hover:brightness-90"
                    />
                  </button>
                ))}
              </div>
              <div className="hero-marquee flex w-max items-center gap-4" style={{ animationDuration: "140s" }}>
                {marqueeRows[1].map((template, index) => (
                  <button
                    type="button"
                    key={`bg-alt-${template.id}-${index}`}
                    onClick={() => handleDemo(template)}
                    aria-label={`Open demo for ${template.title}`}
                    className="group relative h-24 w-40 sm:h-28 sm:w-48 lg:h-32 lg:w-56 overflow-hidden rounded-2xl flex-shrink-0 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <img
                      src={withBasePath(template.urlImage || "/placeholder.svg")}
                      alt=""
                      className="h-full w-full object-cover opacity-40 saturate-150 brightness-65 blur-[0.5px] transition duration-300 group-hover:opacity-90 group-hover:saturate-160 group-hover:brightness-85"
                    />
                  </button>
                ))}
              </div>
              <div className="hero-marquee flex w-max items-center gap-4" style={{ animationDuration: "160s" }}>
                {marqueeRows[2].map((template, index) => (
                  <button
                    type="button"
                    key={`bg-third-${template.id}-${index}`}
                    onClick={() => handleDemo(template)}
                    aria-label={`Open demo for ${template.title}`}
                    className="group relative h-24 w-40 sm:h-28 sm:w-48 lg:h-32 lg:w-56 overflow-hidden rounded-2xl flex-shrink-0 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <img
                      src={withBasePath(template.urlImage || "/placeholder.svg")}
                      alt=""
                      className="h-full w-full object-cover opacity-45 saturate-135 brightness-70 blur-[0.5px] transition duration-300 group-hover:opacity-90 group-hover:saturate-150 group-hover:brightness-90"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(120,220,255,0.12),transparent_60%)] blur-2xl" />
          <div className="pointer-events-none absolute -bottom-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] blur-2xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.55),transparent_55%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.65),transparent_60%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-card-foreground mb-6 text-balance">
                {appConfig.titleHome}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-pretty">
                {appConfig.subtitleHome}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href="https://buymeacoffee.com/amorimivan1" target="_blank" rel="noreferrer">
                    <Coffee className="mr-2 h-5 w-5" />
                    Buy me a coffee
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  <a href={appConfig.urlOfficialGithub} target="_blank" rel="noreferrer">
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Official GitHub
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div
                ref={statsCardRef}
                onMouseMove={handleStatsMouseMove}
                onMouseLeave={handleStatsMouseLeave}
                style={{ transform: "perspective(900px) rotateX(var(--rx)) rotateY(var(--ry))" }}
                className="rounded-3xl border border-white/15 bg-white/10 px-7 py-6 text-card-foreground shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl w-full max-w-sm transition-transform duration-300 ease-out [transform-style:preserve-3d]"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(120,220,255,0.8)]" />
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Templates</div>
                </div>
                <div className="mt-3 text-5xl font-semibold leading-none">{totalActiveTemplates}</div>
                <div className="mt-1 text-sm text-muted-foreground">Total disponivel</div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-xs text-muted-foreground">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em]">Categorias</div>
                    <div className="text-base font-medium text-card-foreground">{visibleCategories.length}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em]">Exibindo</div>
                    <div className="text-base font-medium text-card-foreground">{pagedTemplates.length}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em]">Pages</div>
                    <div className="text-base font-medium text-card-foreground">{totalPages}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border text-card-foreground"
              />
            </div>
            <div className="w-full md:w-56">
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-card-foreground"
              >
                <option value="ALL">All</option>
                {visibleCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-card-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="font-medium">{totalActiveTemplates}</span>
                <span className="text-muted-foreground">templates total</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pagedTemplates.map((template) => (
            <Card
              key={template.id}
              className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300 p-0 gap-0"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
                <img
                  src={withBasePath(template.urlImage || "/placeholder.svg")}
                  alt={template.title}
                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleDemo(template)}>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Demo
                  </Button>
                  <Button size="sm" onClick={() => handleDownload(template)}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-card-foreground">{template.title}</h3>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {template.category}
                  </span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{template.subtitle}</p>
              </div>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No templates found. Try adjusting your search.</p>
          </div>
        )}
        {filteredTemplates.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            <button
              className="px-3 py-2 text-sm rounded-md border border-border bg-card text-card-foreground disabled:opacity-50"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={safePage === 1}
            >
              Prev
            </button>
            <span className="text-sm text-muted-foreground">
              Page {safePage} of {totalPages}
            </span>
            <button
              className="px-3 py-2 text-sm rounded-md border border-border bg-card text-card-foreground disabled:opacity-50"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={safePage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-border/50 mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-sm text-muted-foreground">
            <p>Built with Next.js, Tailwind CSS, and shadcn/ui</p>
          </div>
        </div>
      </footer>

      {selectedTemplate && (
        <DemoModal
          isOpen={!!selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          templateName={selectedTemplate.name}
          htmlFile={selectedTemplate.htmlFile}
        />
      )}
    </div>
  )
}
