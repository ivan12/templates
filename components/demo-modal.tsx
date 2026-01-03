"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getTemplateHTML } from "@/lib/templates"
import { Monitor, Smartphone, Download, X } from "lucide-react"
import { useState } from "react"

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  templateId: number
  templateName: string
}

export function DemoModal({ isOpen, onClose, templateId, templateName }: DemoModalProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop")
  const previewHtml = getPreviewHTML(templateId)

  const handleDownload = () => {
    const html = getTemplateHTML(templateId)
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${templateName.toLowerCase().replace(/\s+/g, "-")}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-[98vw] w-[98vw] h-[98vh] p-0 gap-0 border-0 rounded-lg" showCloseButton={false}>
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-card">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-card-foreground">{templateName}</h2>
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>

          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "mobile" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("mobile")}
              className="gap-2"
            >
              <Smartphone className="h-4 w-4" />
              Mobile
            </Button>
            <Button
              variant={viewMode === "desktop" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("desktop")}
              className="gap-2"
            >
              <Monitor className="h-4 w-4" />
              Desktop
            </Button>
          </div>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center justify-center w-full h-[calc(98vh-64px)] bg-muted/20 p-4">
          <iframe
            sandbox="allow-scripts"
            srcDoc={previewHtml}
            className={`border border-border rounded-lg bg-white transition-all duration-300 ${
              viewMode === "mobile" ? "w-[375px] h-[812px]" : "w-full h-full"
            }`}
            title={`${templateName} Demo`}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function getPreviewHTML(templateId: number): string {
  const html = getTemplateHTML(templateId)
  const guardScript = `
<script>
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a")
    if (!link) return
    const href = link.getAttribute("href") || ""
    if (href.startsWith("#")) {
      event.preventDefault()
      if (href.length > 1) {
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        }
      }
      return
    }
    event.preventDefault()
  })
  document.addEventListener("submit", (event) => {
    event.preventDefault()
  })
</script>`

  if (html.includes("</body>")) {
    return html.replace("</body>", `${guardScript}</body>`)
  }

  return `${html}${guardScript}`
}
