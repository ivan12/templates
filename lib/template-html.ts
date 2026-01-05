export function resolveTemplateHtmlUrl(htmlFile: string, basePath = ""): string {
  if (!htmlFile) return ""
  if (htmlFile.startsWith("http://") || htmlFile.startsWith("https://") || htmlFile.startsWith("//")) {
    return htmlFile
  }
  if (htmlFile.startsWith("/")) {
    return `${basePath}${htmlFile}`
  }
  if (htmlFile.startsWith("templatesCode/")) {
    return `${basePath}/${htmlFile}`
  }
  return `${basePath}/templatesCode/${htmlFile}`
}

export async function fetchTemplateHtml(htmlFile: string, basePath = ""): Promise<string> {
  const url = resolveTemplateHtmlUrl(htmlFile, basePath)
  if (!url) return ""
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to load template HTML from ${url}`)
  }
  return response.text()
}
