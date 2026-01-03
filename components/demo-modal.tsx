"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, Download, Smartphone, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    if (link) {
      event.preventDefault()
    }
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

function getTemplateHTML(templateId: number): string {
  const templates: Record<number, string> = {
    1: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SaaS Starter - Landing Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-white">
  <nav class="border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <span class="text-xl font-bold">SaaSFlow</span>
      </div>
      <div class="hidden md:flex items-center gap-8">
        <a href="#" class="text-slate-300 hover:text-white">Features</a>
        <a href="#" class="text-slate-300 hover:text-white">Pricing</a>
        <a href="#" class="text-slate-300 hover:text-white">About</a>
        <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Get Started</button>
      </div>
    </div>
  </nav>
  
  <main>
    <section class="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1 class="text-5xl md:text-7xl font-bold mb-6">Launch your SaaS<br/>in days, not months</h1>
      <p class="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">Complete SaaS starter with authentication, payments, and everything you need to start selling subscriptions.</p>
      <div class="flex gap-4 justify-center">
        <button class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">Start Free Trial</button>
        <button class="border border-slate-700 px-8 py-3 rounded-lg text-lg font-semibold hover:border-slate-600">View Demo</button>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-20">
      <h2 class="text-3xl font-bold text-center mb-12">Everything you need</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
          <div class="w-12 h-12 bg-blue-600 rounded-lg mb-4"></div>
          <h3 class="text-xl font-semibold mb-2">Authentication</h3>
          <p class="text-slate-400">Secure auth with email, social logins, and magic links.</p>
        </div>
        <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
          <div class="w-12 h-12 bg-purple-600 rounded-lg mb-4"></div>
          <h3 class="text-xl font-semibold mb-2">Payments</h3>
          <p class="text-slate-400">Stripe integration with subscriptions and invoicing.</p>
        </div>
        <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
          <div class="w-12 h-12 bg-green-600 rounded-lg mb-4"></div>
          <h3 class="text-xl font-semibold mb-2">Dashboard</h3>
          <p class="text-slate-400">Beautiful admin dashboard with analytics.</p>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-20">
      <h2 class="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
          <h3 class="text-xl font-semibold mb-2">Starter</h3>
          <div class="text-4xl font-bold my-4">$29<span class="text-lg text-slate-400">/mo</span></div>
          <ul class="space-y-3 mb-6 text-slate-400">
            <li>✓ Up to 1,000 users</li>
            <li>✓ Basic support</li>
            <li>✓ Core features</li>
          </ul>
          <button class="w-full border border-slate-700 py-3 rounded-lg hover:border-slate-600">Get Started</button>
        </div>
        <div class="bg-blue-900/20 p-8 rounded-xl border-2 border-blue-600 relative">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 px-4 py-1 rounded-full text-sm">Popular</div>
          <h3 class="text-xl font-semibold mb-2">Pro</h3>
          <div class="text-4xl font-bold my-4">$99<span class="text-lg text-slate-400">/mo</span></div>
          <ul class="space-y-3 mb-6 text-slate-400">
            <li>✓ Up to 10,000 users</li>
            <li>✓ Priority support</li>
            <li>✓ Advanced features</li>
          </ul>
          <button class="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700">Get Started</button>
        </div>
        <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
          <h3 class="text-xl font-semibold mb-2">Enterprise</h3>
          <div class="text-4xl font-bold my-4">Custom</div>
          <ul class="space-y-3 mb-6 text-slate-400">
            <li>✓ Unlimited users</li>
            <li>✓ 24/7 support</li>
            <li>✓ Custom features</li>
          </ul>
          <button class="w-full border border-slate-700 py-3 rounded-lg hover:border-slate-600">Contact Sales</button>
        </div>
      </div>
    </section>
  </main>

  <footer class="border-t border-slate-800 mt-20">
    <div class="max-w-7xl mx-auto px-6 py-12 text-center text-slate-400">
      <p>&copy; 2026 SaaSFlow. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`,

    2: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Chatbot - Chat Interface</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white">
  <div class="flex h-screen">
    <aside class="w-64 border-r border-slate-800 p-4">
      <button class="w-full bg-blue-600 py-2 rounded-lg mb-4 hover:bg-blue-700">+ New Chat</button>
      <div class="space-y-2">
        <div class="p-3 bg-slate-900 rounded-lg border border-slate-800">
          <p class="text-sm font-medium">Product Ideas</p>
          <p class="text-xs text-slate-400">2 hours ago</p>
        </div>
        <div class="p-3 hover:bg-slate-900 rounded-lg cursor-pointer">
          <p class="text-sm">Marketing Strategy</p>
          <p class="text-xs text-slate-400">Yesterday</p>
        </div>
        <div class="p-3 hover:bg-slate-900 rounded-lg cursor-pointer">
          <p class="text-sm">Code Review</p>
          <p class="text-xs text-slate-400">2 days ago</p>
        </div>
      </div>
    </aside>
    
    <main class="flex-1 flex flex-col">
      <header class="border-b border-slate-800 p-4">
        <h1 class="text-xl font-semibold">AI Assistant</h1>
      </header>
      
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <div class="flex gap-4">
          <div class="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0"></div>
          <div class="bg-slate-900 rounded-xl p-4 max-w-2xl">
            <p>Hello! I'm your AI assistant. I can help you with coding, writing, analysis, and much more. How can I assist you today?</p>
          </div>
        </div>
        
        <div class="flex gap-4 flex-row-reverse">
          <div class="w-8 h-8 bg-green-600 rounded-full flex-shrink-0"></div>
          <div class="bg-blue-900/30 rounded-xl p-4 max-w-2xl">
            <p>Can you help me write a product launch email?</p>
          </div>
        </div>
        
        <div class="flex gap-4">
          <div class="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0"></div>
          <div class="bg-slate-900 rounded-xl p-4 max-w-2xl">
            <p class="mb-4">Of course! I'd be happy to help you write a product launch email. Here's a template:</p>
            <div class="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <p class="mb-2"><strong>Subject:</strong> Introducing [Product Name] - Transform Your [Solution]</p>
              <p class="mb-2"><strong>Body:</strong></p>
              <p class="text-sm text-slate-300">We're excited to announce the launch of [Product Name]! After months of development, we're ready to help you [key benefit]...</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="border-t border-slate-800 p-4">
        <div class="flex gap-2">
          <input type="text" placeholder="Type your message..." class="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600" />
          <button class="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">Send</button>
        </div>
      </div>
    </main>
  </div>
</body>
</html>`,

    3: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-commerce Store</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-900">
  <nav class="border-b">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="text-2xl font-bold">SHOP</div>
      <div class="flex items-center gap-6">
        <a href="#" class="hover:text-blue-600">Products</a>
        <a href="#" class="hover:text-blue-600">Categories</a>
        <button class="relative">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <span class="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">3</span>
        </button>
      </div>
    </div>
  </nav>

  <main class="max-w-7xl mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold mb-8">Featured Products</h1>
    <div class="grid md:grid-cols-4 gap-6">
      <div class="group cursor-pointer">
        <div class="bg-slate-100 aspect-square rounded-xl mb-4 overflow-hidden">
          <div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 group-hover:scale-110 transition-transform"></div>
        </div>
        <h3 class="font-semibold mb-1">Premium Headphones</h3>
        <p class="text-slate-600 text-sm mb-2">Wireless audio perfection</p>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">$299</span>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>

      <div class="group cursor-pointer">
        <div class="bg-slate-100 aspect-square rounded-xl mb-4 overflow-hidden">
          <div class="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 group-hover:scale-110 transition-transform"></div>
        </div>
        <h3 class="font-semibold mb-1">Smart Watch</h3>
        <p class="text-slate-600 text-sm mb-2">Track your fitness goals</p>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">$399</span>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>

      <div class="group cursor-pointer">
        <div class="bg-slate-100 aspect-square rounded-xl mb-4 overflow-hidden">
          <div class="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 group-hover:scale-110 transition-transform"></div>
        </div>
        <h3 class="font-semibold mb-1">Laptop Stand</h3>
        <p class="text-slate-600 text-sm mb-2">Ergonomic aluminum design</p>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">$89</span>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>

      <div class="group cursor-pointer">
        <div class="bg-slate-100 aspect-square rounded-xl mb-4 overflow-hidden">
          <div class="w-full h-full bg-gradient-to-br from-purple-400 to-red-500 group-hover:scale-110 transition-transform"></div>
        </div>
        <h3 class="font-semibold mb-1">Mechanical Keyboard</h3>
        <p class="text-slate-600 text-sm mb-2">Premium typing experience</p>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">$159</span>
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>
    </div>
  </main>
</body>
</html>`,

    4: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio - Designer & Developer</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white">
  <nav class="border-b border-slate-800">
    <div class="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
      <div class="text-xl font-bold">Alex Morgan</div>
      <div class="flex gap-8">
        <a href="#" class="text-slate-400 hover:text-white">Work</a>
        <a href="#" class="text-slate-400 hover:text-white">About</a>
        <a href="#" class="text-slate-400 hover:text-white">Contact</a>
      </div>
    </div>
  </nav>

  <main class="max-w-5xl mx-auto px-6">
    <section class="py-20">
      <h1 class="text-6xl md:text-7xl font-bold mb-6">Designer &<br/>Developer</h1>
      <p class="text-xl text-slate-400 max-w-2xl">I create beautiful digital experiences that help businesses grow and users smile.</p>
    </section>

    <section class="py-12">
      <h2 class="text-3xl font-bold mb-8">Selected Work</h2>
      <div class="space-y-12">
        <div class="group cursor-pointer">
          <div class="aspect-video bg-slate-900 rounded-xl mb-4 overflow-hidden">
            <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-105 transition-transform"></div>
          </div>
          <h3 class="text-2xl font-semibold mb-2">E-commerce Redesign</h3>
          <p class="text-slate-400">Complete redesign of a major retail platform, increasing conversions by 34%</p>
        </div>

        <div class="group cursor-pointer">
          <div class="aspect-video bg-slate-900 rounded-xl mb-4 overflow-hidden">
            <div class="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 group-hover:scale-105 transition-transform"></div>
          </div>
          <h3 class="text-2xl font-semibold mb-2">Mobile Banking App</h3>
          <p class="text-slate-400">Modern banking experience for 2M+ users with focus on accessibility</p>
        </div>

        <div class="group cursor-pointer">
          <div class="aspect-video bg-slate-900 rounded-xl mb-4 overflow-hidden">
            <div class="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 group-hover:scale-105 transition-transform"></div>
          </div>
          <h3 class="text-2xl font-semibold mb-2">SaaS Dashboard</h3>
          <p class="text-slate-400">Analytics platform helping companies make data-driven decisions</p>
        </div>
      </div>
    </section>
  </main>

  <footer class="border-t border-slate-800 mt-20">
    <div class="max-w-5xl mx-auto px-6 py-12">
      <p class="text-slate-400">Get in touch: hello@alexmorgan.com</p>
    </div>
  </footer>
</body>
</html>`,

    5: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Thoughts on Design & Technology</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-900">
  <nav class="border-b">
    <div class="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
      <div class="text-2xl font-bold">TheBlog</div>
      <div class="flex gap-6">
        <a href="#" class="text-slate-600 hover:text-slate-900">Articles</a>
        <a href="#" class="text-slate-600 hover:text-slate-900">About</a>
        <a href="#" class="text-slate-600 hover:text-slate-900">Subscribe</a>
      </div>
    </div>
  </nav>

  <main class="max-w-4xl mx-auto px-6 py-12">
    <h1 class="text-5xl font-bold mb-12">Latest Articles</h1>
    
    <article class="mb-16 pb-16 border-b">
      <div class="aspect-video bg-slate-100 rounded-xl mb-6">
        <div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
      </div>
      <div class="flex gap-4 text-sm text-slate-600 mb-4">
        <span>March 15, 2024</span>
        <span>•</span>
        <span>5 min read</span>
      </div>
      <h2 class="text-3xl font-bold mb-4">The Future of Web Development</h2>
      <p class="text-lg text-slate-600 mb-4">Exploring the latest trends and technologies shaping how we build for the web in 2024 and beyond.</p>
      <a href="#" class="text-blue-600 font-semibold hover:underline">Read more →</a>
    </article>

    <article class="mb-16 pb-16 border-b">
      <div class="aspect-video bg-slate-100 rounded-xl mb-6">
        <div class="w-full h-full bg-gradient-to-br from-green-400 to-teal-500"></div>
      </div>
      <div class="flex gap-4 text-sm text-slate-600 mb-4">
        <span>March 10, 2024</span>
        <span>•</span>
        <span>8 min read</span>
      </div>
      <h2 class="text-3xl font-bold mb-4">Building Scalable React Applications</h2>
      <p class="text-lg text-slate-600 mb-4">Best practices and patterns for creating maintainable React apps that grow with your team.</p>
      <a href="#" class="text-blue-600 font-semibold hover:underline">Read more →</a>
    </article>

    <article class="mb-16">
      <div class="aspect-video bg-slate-100 rounded-xl mb-6">
        <div class="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500"></div>
      </div>
      <div class="flex gap-4 text-sm text-slate-600 mb-4">
        <span>March 5, 2024</span>
        <span>•</span>
        <span>6 min read</span>
      </div>
      <h2 class="text-3xl font-bold mb-4">Design Systems That Scale</h2>
      <p class="text-lg text-slate-600 mb-4">How to create and maintain design systems that empower your entire organization.</p>
      <a href="#" class="text-blue-600 font-semibold hover:underline">Read more →</a>
    </article>
  </main>
</body>
</html>`,

    6: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white">
  <div class="flex h-screen">
    <aside class="w-64 border-r border-slate-800 p-4">
      <div class="text-xl font-bold mb-8">Dashboard</div>
      <nav class="space-y-2">
        <a href="#" class="flex items-center gap-3 px-4 py-2 bg-blue-600 rounded-lg">
          <span>📊</span>
          <span>Overview</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-slate-900 rounded-lg">
          <span>📈</span>
          <span>Analytics</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-slate-900 rounded-lg">
          <span>👥</span>
          <span>Users</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-slate-900 rounded-lg">
          <span>⚙️</span>
          <span>Settings</span>
        </a>
      </nav>
    </aside>

    <main class="flex-1 p-8 overflow-auto">
      <h1 class="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p class="text-slate-400 text-sm mb-2">Total Revenue</p>
          <p class="text-3xl font-bold">$45,231</p>
          <p class="text-green-500 text-sm mt-2">+20.1% from last month</p>
        </div>
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p class="text-slate-400 text-sm mb-2">Active Users</p>
          <p class="text-3xl font-bold">2,345</p>
          <p class="text-green-500 text-sm mt-2">+15% from last month</p>
        </div>
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p class="text-slate-400 text-sm mb-2">New Orders</p>
          <p class="text-3xl font-bold">573</p>
          <p class="text-green-500 text-sm mt-2">+10.5% from last month</p>
        </div>
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p class="text-slate-400 text-sm mb-2">Conversion</p>
          <p class="text-3xl font-bold">3.2%</p>
          <p class="text-red-500 text-sm mt-2">-2.3% from last month</p>
        </div>
      </div>

      <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h2 class="text-xl font-semibold mb-6">Recent Activity</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">New user registration</p>
              <p class="text-sm text-slate-400">john@example.com</p>
            </div>
            <span class="text-slate-400 text-sm">2 min ago</span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Payment received</p>
              <p class="text-sm text-slate-400">$299.00 from Customer #1234</p>
            </div>
            <span class="text-slate-400 text-sm">15 min ago</span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Product updated</p>
              <p class="text-sm text-slate-400">Premium Plan features</p>
            </div>
            <span class="text-slate-400 text-sm">1 hour ago</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</body>
</html>`,

    7: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creative Agency</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-900">
  <nav class="border-b">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="text-2xl font-bold">Agency</div>
      <div class="flex gap-8">
        <a href="#" class="hover:text-blue-600">Services</a>
        <a href="#" class="hover:text-blue-600">Work</a>
        <a href="#" class="hover:text-blue-600">Team</a>
        <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Contact Us</button>
      </div>
    </div>
  </nav>

  <main>
    <section class="max-w-7xl mx-auto px-6 py-32 text-center">
      <h1 class="text-6xl md:text-7xl font-bold mb-6">We create<br/>digital experiences</h1>
      <p class="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">A full-service creative agency helping brands tell their story through design and technology.</p>
      <button class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">View Our Work</button>
    </section>

    <section class="bg-slate-50 py-20">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl">
            <div class="text-4xl mb-4">🎨</div>
            <h3 class="text-2xl font-semibold mb-3">Brand Design</h3>
            <p class="text-slate-600">Creating memorable brand identities that resonate with your audience.</p>
          </div>
          <div class="bg-white p-8 rounded-xl">
            <div class="text-4xl mb-4">💻</div>
            <h3 class="text-2xl font-semibold mb-3">Web Development</h3>
            <p class="text-slate-600">Building fast, responsive websites that convert visitors into customers.</p>
          </div>
          <div class="bg-white p-8 rounded-xl">
            <div class="text-4xl mb-4">📱</div>
            <h3 class="text-2xl font-semibold mb-3">Digital Marketing</h3>
            <p class="text-slate-600">Driving growth through data-driven marketing strategies.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`,

    8: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Documentation</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-900">
  <div class="flex h-screen">
    <aside class="w-64 border-r p-6 overflow-auto">
      <div class="text-xl font-bold mb-8">Docs</div>
      <nav class="space-y-6">
        <div>
          <p class="text-xs font-semibold text-slate-500 uppercase mb-2">Getting Started</p>
          <div class="space-y-1">
            <a href="#" class="block px-3 py-2 bg-slate-100 rounded-lg">Introduction</a>
            <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">Installation</a>
            <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">Quick Start</a>
          </div>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-500 uppercase mb-2">Core Concepts</p>
          <div class="space-y-1">
            <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">Components</a>
            <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">Styling</a>
            <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">Routing</a>
          </div>
        </div>
      </nav>
    </aside>

    <main class="flex-1 p-12 overflow-auto">
      <h1 class="text-5xl font-bold mb-4">Introduction</h1>
      <p class="text-lg text-slate-600 mb-8">Welcome to our documentation. Get started with our powerful framework.</p>
      
      <div class="prose max-w-none">
        <h2 class="text-3xl font-bold mt-12 mb-4">What is this?</h2>
        <p class="text-slate-700 mb-4">This is a modern framework for building fast, scalable web applications. It combines the best parts of React, TypeScript, and modern build tools.</p>
        
        <h2 class="text-3xl font-bold mt-12 mb-4">Features</h2>
        <ul class="list-disc pl-6 space-y-2 text-slate-700">
          <li>Fast refresh for instant feedback</li>
          <li>TypeScript support out of the box</li>
          <li>Optimized production builds</li>
          <li>Built-in routing and state management</li>
        </ul>

        <div class="bg-slate-900 text-white p-6 rounded-xl mt-8">
          <code>npm install framework-name</code>
        </div>
      </div>
    </main>
  </div>
</body>
</html>`,

    9: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Social Network</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-white">
  <nav class="border-b border-slate-800">
    <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="text-xl font-bold">Social</div>
      <div class="flex items-center gap-4">
        <button class="hover:bg-slate-900 p-2 rounded-lg">🔔</button>
        <button class="hover:bg-slate-900 p-2 rounded-lg">💬</button>
        <div class="w-8 h-8 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  </nav>

  <main class="max-w-2xl mx-auto px-6 py-8">
    <div class="bg-slate-900 rounded-xl p-4 border border-slate-800 mb-6">
      <input type="text" placeholder="What's on your mind?" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:border-blue-600" />
      <div class="flex justify-end">
        <button class="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700">Post</button>
      </div>
    </div>

    <div class="space-y-6">
      <article class="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-purple-600 rounded-full"></div>
          <div>
            <p class="font-semibold">Sarah Chen</p>
            <p class="text-sm text-slate-400">2 hours ago</p>
          </div>
        </div>
        <p class="mb-4">Just launched my new portfolio! Would love to get your feedback 🎨✨</p>
        <div class="flex gap-6 text-slate-400">
          <button class="hover:text-blue-500">❤️ 24 likes</button>
          <button class="hover:text-blue-500">💬 5 comments</button>
          <button class="hover:text-blue-500">🔄 Share</button>
        </div>
      </article>

      <article class="bg-slate-900 rounded-xl p-6 border border-slate-800">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-green-600 rounded-full"></div>
          <div>
            <p class="font-semibold">Mike Johnson</p>
            <p class="text-sm text-slate-400">5 hours ago</p>
          </div>
        </div>
        <p class="mb-4">Amazing coding session today! Built a full authentication system from scratch 💻</p>
        <div class="flex gap-6 text-slate-400">
          <button class="hover:text-blue-500">❤️ 42 likes</button>
          <button class="hover:text-blue-500">💬 12 comments</button>
          <button class="hover:text-blue-500">🔄 Share</button>
        </div>
      </article>
    </div>
  </main>
</body>
</html>`,

    10: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Startup MVP</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-900">
  <nav class="border-b">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <span class="text-xl font-bold">StartupName</span>
      </div>
      <div class="flex items-center gap-4">
        <a href="#" class="text-slate-600 hover:text-slate-900">Features</a>
        <a href="#" class="text-slate-600 hover:text-slate-900">Pricing</a>
        <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Get Early Access</button>
      </div>
    </div>
  </nav>

  <main>
    <section class="max-w-7xl mx-auto px-6 py-32 text-center">
      <div class="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">🎉 Now in Beta</div>
      <h1 class="text-6xl md:text-7xl font-bold mb-6">The future of<br/>productivity</h1>
      <p class="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">Join thousands of teams already using our platform to work smarter, not harder.</p>
      <div class="flex gap-4 justify-center">
        <input type="email" placeholder="Enter your email" class="px-6 py-3 border border-slate-300 rounded-lg w-80 focus:outline-none focus:border-blue-600" />
        <button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">Join Waitlist</button>
      </div>
      <p class="text-sm text-slate-500 mt-4">Join 10,000+ people on the waitlist</p>
    </section>

    <section class="bg-slate-50 py-20">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-12">Why choose us?</h2>
        <div class="grid md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p class="text-slate-600">Built for speed with modern technology stack</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-600 rounded-2xl mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold mb-2">Secure by Default</h3>
            <p class="text-slate-600">Enterprise-grade security and data protection</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-600 rounded-2xl mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold mb-2">Easy to Use</h3>
            <p class="text-slate-600">Intuitive interface that anyone can master</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</body>
</html>`,
  }

  return templates[templateId] || templates[1]
}
