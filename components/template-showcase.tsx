"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download, ExternalLink, Search } from "lucide-react"
import { useState } from "react"
import { DemoModal } from "@/components/demo-modal"

const templates = [
  {
    id: 1,
    name: "SaaS Starter",
    description:
      "Complete SaaS landing page with pricing, features, and testimonials. Perfect for launching your subscription business.",
    category: "SaaS",
    image: "/modern-saas-landing-page-with-pricing-section.jpg",
    demoUrl: "#",
    tags: ["Next.js", "Stripe", "Auth"],
  },
  {
    id: 2,
    name: "AI Chatbot",
    description:
      "Full-featured AI chatbot interface built with Vercel AI SDK, OpenAI, and real-time streaming responses.",
    category: "AI",
    image: "/ai-chatbot-interface-dark-theme.jpg",
    demoUrl: "#",
    tags: ["AI SDK", "OpenAI", "Chat"],
  },
  {
    id: 3,
    name: "E-commerce Store",
    description: "Modern e-commerce storefront with product catalog, shopping cart, and Stripe checkout integration.",
    category: "E-commerce",
    image: "/ecommerce-product-grid-modern-design.jpg",
    demoUrl: "#",
    tags: ["Stripe", "Cart", "Products"],
  },
  {
    id: 4,
    name: "Portfolio Pro",
    description: "Minimalist portfolio template for designers and developers. Showcase your work with style.",
    category: "Portfolio",
    image: "/minimalist-portfolio-website-dark.jpg",
    demoUrl: "#",
    tags: ["Portfolio", "Showcase", "MDX"],
  },
  {
    id: 5,
    name: "Blog Platform",
    description: "Feature-rich blog with markdown support, SEO optimization, and beautiful typography.",
    category: "Blog",
    image: "/modern-blog-layout-with-articles.jpg",
    demoUrl: "#",
    tags: ["Blog", "MDX", "SEO"],
  },
  {
    id: 6,
    name: "Admin Dashboard",
    description: "Comprehensive admin dashboard with analytics, charts, and data tables. Built with shadcn/ui.",
    category: "Dashboard",
    image: "/admin-dashboard-with-charts-dark-theme.jpg",
    demoUrl: "#",
    tags: ["Dashboard", "Analytics", "Tables"],
  },
  {
    id: 7,
    name: "Agency Website",
    description: "Stunning agency landing page with hero section, services showcase, and contact form.",
    category: "Agency",
    image: "/creative-agency-website-landing-page.jpg",
    demoUrl: "#",
    tags: ["Agency", "Landing", "Forms"],
  },
  {
    id: 8,
    name: "Documentation Site",
    description: "Clean documentation template with sidebar navigation, search, and code highlighting.",
    category: "Docs",
    image: "/documentation-site-with-sidebar-navigation.jpg",
    demoUrl: "#",
    tags: ["Docs", "MDX", "Search"],
  },
  {
    id: 9,
    name: "Social Network",
    description: "Social media starter with user profiles, posts feed, likes, and comments functionality.",
    category: "Social",
    image: "/social-media-feed-interface-dark.jpg",
    demoUrl: "#",
    tags: ["Social", "Auth", "Supabase"],
  },
  {
    id: 10,
    name: "Startup MVP",
    description: "All-in-one startup template with waitlist, auth, dashboard, and payment integration.",
    category: "Startup",
    image: "/startup-mvp-landing-page-modern.jpg",
    demoUrl: "#",
    tags: ["Startup", "Auth", "Payments"],
  },
]

export function TemplateShowcase() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const withBasePath = (path: string) => `${basePath}${path.startsWith("/") ? path : `/${path}`}`
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<{ id: number; name: string } | null>(null)

  const categories = Array.from(new Set(templates.map((t) => t.category)))

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDownload = (template: (typeof templates)[0]) => {
    const htmlContent = getTemplateHTML(template.id)
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${template.name.toLowerCase().replace(/\s+/g, "-")}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDemo = (template: (typeof templates)[0]) => {
    setSelectedTemplate({ id: template.id, name: template.name })
  }

  return (
    <div className="min-h-screen bg-[oklch(0.08_0.01_260)]">
      {/* Header */}
      <header className="border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary" />
              <span className="text-xl font-semibold text-card-foreground">Templates</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="https://github.com/ivan12" className="text-sm text-muted-foreground hover:text-card-foreground transition-colors">
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-card-foreground mb-6 text-balance">
              Start building in seconds
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-pretty">
              Kickstart your project with templates. Download, customize, and deploy in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto" onClick={() => (setSelectedCategory(null), setSearchQuery(''))}>
                View all templates
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Official GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border text-card-foreground"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "" : "bg-card hover:bg-accent text-card-foreground"}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "" : "bg-card hover:bg-accent text-card-foreground"}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="group overflow-hidden border-border bg-card hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
                <img
                  src={withBasePath(template.image || "/placeholder.svg")}
                  alt={template.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                  <h3 className="text-lg font-semibold text-card-foreground">{template.name}</h3>
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {template.category}
                  </span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span key={tag} className="rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No templates found. Try adjusting your search.</p>
          </div>
        )}
      </main>

      {/* Footer */}
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
          templateId={selectedTemplate.id}
          templateName={selectedTemplate.name}
        />
      )}
    </div>
  )
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
      <h1 class="text-6xl font-bold mb-6">Designer &<br/>Developer</h1>
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

    <main class="flex-1 overflow-auto p-8">
      <h1 class="text-3xl font-bold mb-8">Overview</h1>
      
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p class="text-slate-400 mb-2">Total Revenue</p>
          <p class="text-3xl font-bold">$45,231</p>
          <p class="text-green-500 text-sm mt-2">+20.1% from last month</p>
        </div>
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p class="text-slate-400 mb-2">Active Users</p>
          <p class="text-3xl font-bold">2,350</p>
          <p class="text-green-500 text-sm mt-2">+180 this week</p>
        </div>
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p class="text-slate-400 mb-2">Sales</p>
          <p class="text-3xl font-bold">+573</p>
          <p class="text-green-500 text-sm mt-2">+12% from yesterday</p>
        </div>
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p class="text-slate-400 mb-2">Conversion</p>
          <p class="text-3xl font-bold">3.2%</p>
          <p class="text-red-500 text-sm mt-2">-0.4% from last month</p>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-blue-600 rounded-full"></div>
              <div class="flex-1">
                <p class="font-medium">New user registered</p>
                <p class="text-sm text-slate-400">2 minutes ago</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-green-600 rounded-full"></div>
              <div class="flex-1">
                <p class="font-medium">Payment received</p>
                <p class="text-sm text-slate-400">15 minutes ago</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 bg-purple-600 rounded-full"></div>
              <div class="flex-1">
                <p class="font-medium">New order placed</p>
                <p class="text-sm text-slate-400">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 class="text-xl font-semibold mb-4">Top Products</h2>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span>Premium Plan</span>
              <span class="font-semibold">$2,340</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Basic Plan</span>
              <span class="font-semibold">$1,890</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Enterprise Plan</span>
              <span class="font-semibold">$1,450</span>
            </div>
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
    <div class="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      <div class="text-2xl font-bold">CREATIVE</div>
      <div class="hidden md:flex gap-8">
        <a href="#" class="hover:text-blue-600">Services</a>
        <a href="#" class="hover:text-blue-600">Work</a>
        <a href="#" class="hover:text-blue-600">About</a>
        <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Contact Us</button>
      </div>
    </div>
  </nav>

  <main>
    <section class="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1 class="text-6xl md:text-8xl font-bold mb-6">We create<br/>brands that matter</h1>
      <p class="text-xl text-slate-600 max-w-2xl mx-auto mb-8">Award-winning design agency helping businesses stand out in the digital world.</p>
      <button class="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700">See Our Work</button>
    </section>

    <section class="bg-slate-50 py-20">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center">Our Services</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl">
            <div class="w-16 h-16 bg-blue-600 rounded-xl mb-6"></div>
            <h3 class="text-2xl font-bold mb-4">Brand Identity</h3>
            <p class="text-slate-600">Creating memorable brands that resonate with your audience.</p>
          </div>
          <div class="bg-white p-8 rounded-xl">
            <div class="w-16 h-16 bg-purple-600 rounded-xl mb-6"></div>
            <h3 class="text-2xl font-bold mb-4">Web Design</h3>
            <p class="text-slate-600">Beautiful websites that convert visitors into customers.</p>
          </div>
          <div class="bg-white p-8 rounded-xl">
            <div class="w-16 h-16 bg-green-600 rounded-xl mb-6"></div>
            <h3 class="text-2xl font-bold mb-4">Digital Marketing</h3>
            <p class="text-slate-600">Strategic campaigns that drive results and growth.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-20">
      <h2 class="text-4xl font-bold mb-12">Featured Work</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <div class="aspect-square bg-slate-100 rounded-xl mb-4">
            <div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600"></div>
          </div>
          <h3 class="text-2xl font-bold mb-2">Tech Startup Rebrand</h3>
          <p class="text-slate-600">Complete brand identity and website for a Series A startup</p>
        </div>
        <div>
          <div class="aspect-square bg-slate-100 rounded-xl mb-4">
            <div class="w-full h-full bg-gradient-to-br from-orange-400 to-pink-600"></div>
          </div>
          <h3 class="text-2xl font-bold mb-2">E-commerce Platform</h3>
          <p class="text-slate-600">Modern shopping experience for sustainable fashion brand</p>
        </div>
      </div>
    </section>
  </main>

  <footer class="bg-slate-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-6 text-center">
      <p class="text-lg mb-2">Ready to start a project?</p>
      <p class="text-slate-400">hello@creative.agency</p>
    </div>
  </footer>
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
    <aside class="w-64 border-r overflow-auto p-6">
      <div class="text-xl font-bold mb-6">Docs</div>
      <nav class="space-y-1">
        <div class="mb-4">
          <p class="text-xs font-semibold text-slate-500 uppercase mb-2">Getting Started</p>
          <a href="#" class="block px-3 py-2 bg-blue-50 text-blue-600 rounded-lg">Introduction</a>
          <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">Installation</a>
          <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">Quick Start</a>
        </div>
        <div class="mb-4">
          <p class="text-xs font-semibold text-slate-500 uppercase mb-2">Core Concepts</p>
          <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">Components</a>
          <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">Routing</a>
          <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">State Management</a>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-500 uppercase mb-2">API Reference</p>
          <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">Methods</a>
          <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">Props</a>
          <a href="#" class="block px-3 py-2 hover:bg-slate-50 rounded-lg">Hooks</a>
        </div>
      </nav>
    </aside>

    <main class="flex-1 overflow-auto">
      <div class="max-w-4xl mx-auto px-8 py-12">
        <h1 class="text-4xl font-bold mb-4">Introduction</h1>
        <p class="text-lg text-slate-600 mb-8">Welcome to our documentation. Learn how to build amazing applications.</p>

        <div class="prose prose-slate max-w-none">
          <h2 class="text-2xl font-bold mt-8 mb-4">What is this?</h2>
          <p class="text-slate-600 mb-4">This is a modern framework for building web applications with React. It provides everything you need to create fast, scalable applications.</p>

          <h2 class="text-2xl font-bold mt-8 mb-4">Features</h2>
          <ul class="list-disc pl-6 text-slate-600 space-y-2 mb-6">
            <li>Fast and efficient rendering</li>
            <li>Built-in routing and navigation</li>
            <li>TypeScript support out of the box</li>
            <li>Optimized for production builds</li>
          </ul>

          <h2 class="text-2xl font-bold mt-8 mb-4">Quick Example</h2>
          <div class="bg-slate-900 text-white p-6 rounded-xl mb-6">
            <pre class="text-sm"><code>import { Component } from 'framework'

export default function App() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Hello World&lt;/h1&gt;
    &lt;/div&gt;
  )
}</code></pre>
          </div>

          <h2 class="text-2xl font-bold mt-8 mb-4">Next Steps</h2>
          <p class="text-slate-600">Now that you understand the basics, check out the installation guide to get started with your first project.</p>
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
<body class="bg-slate-50">
  <nav class="bg-white border-b sticky top-0">
    <div class="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
      <div class="text-xl font-bold text-blue-600">Social</div>
      <div class="flex items-center gap-4">
        <button class="p-2 hover:bg-slate-100 rounded-full">🔔</button>
        <button class="p-2 hover:bg-slate-100 rounded-full">💬</button>
        <div class="w-10 h-10 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  </nav>

  <main class="max-w-2xl mx-auto px-6 py-8">
    <div class="bg-white rounded-xl p-6 mb-6 border">
      <div class="flex gap-3">
        <div class="w-12 h-12 bg-blue-600 rounded-full flex-shrink-0"></div>
        <div class="flex-1">
          <textarea placeholder="What's on your mind?" class="w-full p-3 bg-slate-50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
          <div class="flex justify-between items-center mt-3">
            <div class="flex gap-2">
              <button class="px-4 py-2 text-sm hover:bg-slate-50 rounded-lg">📷 Photo</button>
              <button class="px-4 py-2 text-sm hover:bg-slate-50 rounded-lg">🎥 Video</button>
            </div>
            <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Post</button>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-6">
      <article class="bg-white rounded-xl border">
        <div class="p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-green-600 rounded-full"></div>
            <div>
              <p class="font-semibold">Sarah Johnson</p>
              <p class="text-sm text-slate-500">2 hours ago</p>
            </div>
          </div>
          <p class="mb-4">Just launched my new project! Excited to share it with everyone. Check it out and let me know what you think! 🚀</p>
          <div class="aspect-video bg-slate-100 rounded-lg mb-4">
            <div class="w-full h-full bg-gradient-to-br from-green-400 to-blue-500"></div>
          </div>
          <div class="flex items-center gap-6 pt-4 border-t">
            <button class="flex items-center gap-2 text-slate-600 hover:text-blue-600">
              <span>❤️</span>
              <span>234</span>
            </button>
            <button class="flex items-center gap-2 text-slate-600 hover:text-blue-600">
              <span>💬</span>
              <span>42</span>
            </button>
            <button class="flex items-center gap-2 text-slate-600 hover:text-blue-600">
              <span>🔄</span>
              <span>12</span>
            </button>
          </div>
        </div>
      </article>

      <article class="bg-white rounded-xl border">
        <div class="p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-purple-600 rounded-full"></div>
            <div>
              <p class="font-semibold">Mike Chen</p>
              <p class="text-sm text-slate-500">5 hours ago</p>
            </div>
          </div>
          <p class="mb-4">Beautiful sunset today! Nature never fails to amaze me. 🌅</p>
          <div class="flex items-center gap-6 pt-4 border-t">
            <button class="flex items-center gap-2 text-slate-600 hover:text-blue-600">
              <span>❤️</span>
              <span>567</span>
            </button>
            <button class="flex items-center gap-2 text-slate-600 hover:text-blue-600">
              <span>💬</span>
              <span>89</span>
            </button>
            <button class="flex items-center gap-2 text-slate-600 hover:text-blue-600">
              <span>🔄</span>
              <span>23</span>
            </button>
          </div>
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
  <title>Startup MVP - Join Waitlist</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white min-h-screen">
  <nav class="border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
      <div class="text-2xl font-bold">StartupMVP</div>
      <div class="flex gap-4">
        <button class="px-4 py-2 hover:bg-white/10 rounded-lg">Sign In</button>
        <button class="bg-white text-slate-900 px-6 py-2 rounded-lg font-semibold hover:bg-slate-100">Get Started</button>
      </div>
    </div>
  </nav>

  <main>
    <section class="max-w-7xl mx-auto px-6 py-20 text-center">
      <div class="inline-block mb-6 px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm">
        🎉 Now in public beta
      </div>
      <h1 class="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
        Launch faster<br/>than ever
      </h1>
      <p class="text-xl text-white/80 max-w-2xl mx-auto mb-10">The complete starter kit for your next startup. Authentication, payments, analytics, and more — all pre-built.</p>
      
      <div class="max-w-md mx-auto">
        <div class="flex gap-2">
          <input type="email" placeholder="Enter your email" class="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm focus:outline-none focus:border-white/40 placeholder-white/50" />
          <button class="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold hover:bg-slate-100">Join Waitlist</button>
        </div>
        <p class="text-sm text-white/60 mt-3">Join 2,547 founders building their MVPs</p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-20">
      <h2 class="text-4xl font-bold text-center mb-12">Everything you need</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
          <div class="w-12 h-12 bg-blue-500 rounded-xl mb-4"></div>
          <h3 class="text-xl font-semibold mb-3">Authentication</h3>
          <p class="text-white/70">Complete auth system with social logins, magic links, and 2FA.</p>
        </div>
        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
          <div class="w-12 h-12 bg-purple-500 rounded-xl mb-4"></div>
          <h3 class="text-xl font-semibold mb-3">Payments</h3>
          <p class="text-white/70">Stripe integration for subscriptions, one-time payments, and invoicing.</p>
        </div>
        <div class="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
          <div class="w-12 h-12 bg-pink-500 rounded-xl mb-4"></div>
          <h3 class="text-xl font-semibold mb-3">Analytics</h3>
          <p class="text-white/70">Track user behavior and make data-driven decisions.</p>
        </div>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-6 py-20 text-center">
      <h2 class="text-4xl font-bold mb-6">Trusted by founders worldwide</h2>
      <div class="flex justify-center gap-12 mt-12 flex-wrap">
        <div class="text-center">
          <p class="text-5xl font-bold">2.5K+</p>
          <p class="text-white/60 mt-2">Startups launched</p>
        </div>
        <div class="text-center">
          <p class="text-5xl font-bold">$12M+</p>
          <p class="text-white/60 mt-2">Revenue generated</p>
        </div>
        <div class="text-center">
          <p class="text-5xl font-bold">98%</p>
          <p class="text-white/60 mt-2">Satisfaction rate</p>
        </div>
      </div>
    </section>
  </main>

  <footer class="border-t border-white/10 mt-20">
    <div class="max-w-7xl mx-auto px-6 py-12 text-center text-white/60">
      <p>&copy; 2026 StartupMVP. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`,
  }

  return templates[templateId] || templates[1]
}
