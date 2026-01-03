export type TemplateId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

const templates: Record<number, string> = {
  1: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SaaS Starter - Landing Page</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-white">
  <nav class="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <span class="text-xl font-bold">SaaSFlow</span>
      </div>
      <div class="hidden md:flex items-center gap-8">
        <a href="#features" class="text-slate-300 hover:text-white">Features</a>
        <a href="#pricing" class="text-slate-300 hover:text-white">Pricing</a>
        <a href="#testimonials" class="text-slate-300 hover:text-white">Stories</a>
        <a href="#faq" class="text-slate-300 hover:text-white">FAQ</a>
        <button data-modal-open="signup" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Get Started</button>
      </div>
    </div>
  </nav>

  <main>
    <section class="max-w-7xl mx-auto px-6 py-20 text-center">
      <h1 class="text-5xl md:text-7xl font-bold mb-6">Launch your SaaS<br/>in days, not months</h1>
      <p class="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">Complete SaaS starter with auth, billing, and analytics. Build faster with production-ready foundations.</p>
      <div class="flex gap-4 justify-center flex-wrap">
        <button data-modal-open="signup" class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">Start Free Trial</button>
        <a href="#pricing" class="border border-slate-700 px-8 py-3 rounded-lg text-lg font-semibold hover:border-slate-600">View Pricing</a>
      </div>
    </section>

    <section id="features" class="max-w-7xl mx-auto px-6 py-16">
      <div class="flex items-center justify-between mb-10 flex-wrap gap-4">
        <h2 class="text-3xl font-bold">Everything you need</h2>
        <div class="flex items-center gap-3">
          <span class="text-slate-400 text-sm">Trusted by 1,200 teams</span>
          <div class="flex -space-x-2">
            <div class="w-8 h-8 rounded-full bg-blue-600"></div>
            <div class="w-8 h-8 rounded-full bg-purple-600"></div>
            <div class="w-8 h-8 rounded-full bg-emerald-600"></div>
          </div>
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
          <div class="w-12 h-12 bg-blue-600 rounded-lg mb-4"></div>
          <h3 class="text-xl font-semibold mb-2">Authentication</h3>
          <p class="text-slate-400">Email, social, and magic links built in with role-based access.</p>
        </div>
        <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
          <div class="w-12 h-12 bg-purple-600 rounded-lg mb-4"></div>
          <h3 class="text-xl font-semibold mb-2">Billing</h3>
          <p class="text-slate-400">Stripe subscriptions, coupons, invoices, and usage tracking.</p>
        </div>
        <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
          <div class="w-12 h-12 bg-emerald-600 rounded-lg mb-4"></div>
          <h3 class="text-xl font-semibold mb-2">Analytics</h3>
          <p class="text-slate-400">Dashboards that show retention, activation, and revenue.</p>
        </div>
      </div>
    </section>

    <section id="pricing" class="max-w-7xl mx-auto px-6 py-16">
      <div class="flex items-center justify-between mb-10 flex-wrap gap-4">
        <h2 class="text-3xl font-bold">Simple pricing</h2>
        <div class="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full p-1">
          <button data-plan="monthly" class="px-4 py-1 rounded-full bg-blue-600 text-sm">Monthly</button>
          <button data-plan="annual" class="px-4 py-1 rounded-full text-sm text-slate-300">Annual</button>
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-8" data-pricing>
        <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
          <h3 class="text-xl font-semibold mb-2">Starter</h3>
          <div class="text-4xl font-bold my-4" data-price="starter">$29<span class="text-lg text-slate-400">/mo</span></div>
          <ul class="space-y-3 mb-6 text-slate-400">
            <li>- Up to 1,000 users</li>
            <li>- Basic support</li>
            <li>- Core features</li>
          </ul>
          <button data-modal-open="signup" class="w-full border border-slate-700 py-3 rounded-lg hover:border-slate-600">Get Started</button>
        </div>
        <div class="bg-blue-900/20 p-8 rounded-xl border-2 border-blue-600 relative">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 px-4 py-1 rounded-full text-sm">Popular</div>
          <h3 class="text-xl font-semibold mb-2">Pro</h3>
          <div class="text-4xl font-bold my-4" data-price="pro">$99<span class="text-lg text-slate-400">/mo</span></div>
          <ul class="space-y-3 mb-6 text-slate-400">
            <li>- Up to 10,000 users</li>
            <li>- Priority support</li>
            <li>- Advanced features</li>
          </ul>
          <button data-modal-open="signup" class="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700">Get Started</button>
        </div>
        <div class="bg-slate-900 p-8 rounded-xl border border-slate-800">
          <h3 class="text-xl font-semibold mb-2">Enterprise</h3>
          <div class="text-4xl font-bold my-4" data-price="enterprise">Custom</div>
          <ul class="space-y-3 mb-6 text-slate-400">
            <li>- Unlimited users</li>
            <li>- 24/7 support</li>
            <li>- Custom features</li>
          </ul>
          <button data-modal-open="sales" class="w-full border border-slate-700 py-3 rounded-lg hover:border-slate-600">Contact Sales</button>
        </div>
      </div>
    </section>

    <section id="testimonials" class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-3xl font-bold mb-10">Teams ship faster</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p class="text-slate-300 mb-4">"We launched in 3 weeks and closed our first 50 customers."</p>
          <div class="text-sm text-slate-400">- Ana, Founder</div>
        </div>
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p class="text-slate-300 mb-4">"The billing and auth saved us months of work."</p>
          <div class="text-sm text-slate-400">- Mateo, CTO</div>
        </div>
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p class="text-slate-300 mb-4">"Best starter we have used for SaaS."</p>
          <div class="text-sm text-slate-400">- Priya, Product Lead</div>
        </div>
      </div>
    </section>

    <section id="faq" class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-3xl font-bold mb-6">FAQ</h2>
      <div class="space-y-4" data-accordion>
        <button class="w-full text-left bg-slate-900 border border-slate-800 rounded-lg p-4" data-accordion-item>
          <div class="flex items-center justify-between">
            <span>Can I cancel anytime?</span>
            <span class="text-slate-400">+</span>
          </div>
          <div class="mt-3 text-slate-400 hidden">Yes, you can cancel your subscription at any time.</div>
        </button>
        <button class="w-full text-left bg-slate-900 border border-slate-800 rounded-lg p-4" data-accordion-item>
          <div class="flex items-center justify-between">
            <span>Is there a free trial?</span>
            <span class="text-slate-400">+</span>
          </div>
          <div class="mt-3 text-slate-400 hidden">We offer a 14-day free trial on all plans.</div>
        </button>
        <button class="w-full text-left bg-slate-900 border border-slate-800 rounded-lg p-4" data-accordion-item>
          <div class="flex items-center justify-between">
            <span>Do you help with migration?</span>
            <span class="text-slate-400">+</span>
          </div>
          <div class="mt-3 text-slate-400 hidden">Our team can help migrate your users and billing data.</div>
        </button>
      </div>
    </section>

    <section id="cta" class="max-w-7xl mx-auto px-6 py-16">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to launch?</h2>
        <p class="text-blue-100 mb-6">Start your trial and ship by the end of the week.</p>
        <button data-modal-open="signup" class="bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100">Start Free Trial</button>
      </div>
    </section>
  </main>

  <footer class="border-t border-slate-800 mt-10">
    <div class="max-w-7xl mx-auto px-6 py-12 text-center text-slate-400">
      <p>Copyright 2026 SaaSFlow. All rights reserved.</p>
    </div>
  </footer>

  <div class="fixed inset-0 bg-black/70 hidden items-center justify-center" data-modal="signup">
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold">Start your trial</h3>
        <button data-modal-close="signup" class="text-slate-400">X</button>
      </div>
      <form class="space-y-3" data-form>
        <input class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg" placeholder="Work email" type="email" required />
        <input class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg" placeholder="Company name" required />
        <button class="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700" type="submit">Create account</button>
      </form>
      <p class="text-sm text-slate-400 mt-3" data-form-success hidden>Thanks! We will email you shortly.</p>
    </div>
  </div>

  <div class="fixed inset-0 bg-black/70 hidden items-center justify-center" data-modal="sales">
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold">Contact sales</h3>
        <button data-modal-close="sales" class="text-slate-400">X</button>
      </div>
      <form class="space-y-3" data-form>
        <input class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg" placeholder="Name" required />
        <input class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg" placeholder="Company email" type="email" required />
        <textarea class="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg" rows="3" placeholder="Tell us about your needs"></textarea>
        <button class="w-full bg-blue-600 py-3 rounded-lg hover:bg-blue-700" type="submit">Send request</button>
      </form>
      <p class="text-sm text-slate-400 mt-3" data-form-success hidden>We will reach out within 1 business day.</p>
    </div>
  </div>

  <script>
    document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault()
        const target = document.querySelector(link.getAttribute("href"))
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      })
    })

    document.querySelectorAll("[data-modal-open]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-modal-open")
        const modal = document.querySelector("[data-modal='" + target + "']")
        if (modal) {
          modal.classList.remove("hidden")
          modal.classList.add("flex")
        }
      })
    })

    document.querySelectorAll("[data-modal-close]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-modal-close")
        const modal = document.querySelector("[data-modal='" + target + "']")
        if (modal) {
          modal.classList.add("hidden")
          modal.classList.remove("flex")
        }
      })
    })

    document.querySelectorAll("[data-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault()
        const success = form.parentElement.querySelector("[data-form-success]")
        if (success) {
          success.classList.remove("hidden")
        }
      })
    })

    document.querySelectorAll("[data-accordion-item]").forEach((item) => {
      item.addEventListener("click", () => {
        const content = item.querySelector("div:last-child")
        if (!content) return
        content.classList.toggle("hidden")
      })
    })

    const planButtons = document.querySelectorAll("[data-plan]")
    const priceMap = {
      monthly: { starter: "$29/mo", pro: "$99/mo" },
      annual: { starter: "$24/mo", pro: "$79/mo" },
    }

    planButtons.forEach((button) => {
      button.addEventListener("click", () => {
        planButtons.forEach((btn) => btn.classList.remove("bg-blue-600", "text-white"))
        button.classList.add("bg-blue-600", "text-white")
        const plan = button.getAttribute("data-plan")
        if (!priceMap[plan]) return
        document.querySelector("[data-price='starter']").textContent = priceMap[plan].starter
        document.querySelector("[data-price='pro']").textContent = priceMap[plan].pro
      })
    })
  </script>
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
    <aside class="w-64 border-r border-slate-800 p-4 flex flex-col">
      <button data-new-chat class="w-full bg-blue-600 py-2 rounded-lg mb-4 hover:bg-blue-700">+ New Chat</button>
      <div class="space-y-2 flex-1 overflow-auto" data-chat-list>
        <button class="w-full text-left p-3 bg-slate-900 rounded-lg border border-slate-800" data-chat="0">
          <p class="text-sm font-medium">Product Ideas</p>
          <p class="text-xs text-slate-400">2 hours ago</p>
        </button>
        <button class="w-full text-left p-3 hover:bg-slate-900 rounded-lg" data-chat="1">
          <p class="text-sm">Marketing Strategy</p>
          <p class="text-xs text-slate-400">Yesterday</p>
        </button>
        <button class="w-full text-left p-3 hover:bg-slate-900 rounded-lg" data-chat="2">
          <p class="text-sm">Code Review</p>
          <p class="text-xs text-slate-400">2 days ago</p>
        </button>
      </div>
      <div class="mt-4 text-xs text-slate-400">AI Assistant v2.1</div>
    </aside>

    <main class="flex-1 flex flex-col">
      <header class="border-b border-slate-800 p-4 flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold">AI Assistant</h1>
          <p class="text-xs text-slate-400">Ask anything. Get answers in seconds.</p>
        </div>
        <button data-clear-chat class="text-sm text-slate-300 hover:text-white">Clear</button>
      </header>

      <div class="flex-1 overflow-y-auto p-6 space-y-6" data-chat-feed>
        <div class="flex gap-4">
          <div class="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0"></div>
          <div class="bg-slate-900 rounded-xl p-4 max-w-2xl">
            <p>Hello! I can help you with product copy, code, or strategy. What are you working on?</p>
          </div>
        </div>
      </div>

      <form class="border-t border-slate-800 p-4" data-chat-form>
        <div class="flex gap-2">
          <input name="message" type="text" placeholder="Type your message..." class="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-600" />
          <button class="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700" type="submit">Send</button>
        </div>
      </form>
    </main>
  </div>

  <script>
    const feed = document.querySelector("[data-chat-feed]")
    const form = document.querySelector("[data-chat-form]")
    const clearButton = document.querySelector("[data-clear-chat]")
    const newButton = document.querySelector("[data-new-chat]")
    const storageKey = "demo-ai-chat-messages"
    const defaultMessages = [
      { text: "Hello! I can help you with product copy, code, or strategy. What are you working on?", isUser: false },
    ]
    let messages = loadMessages()

    function loadMessages() {
      try {
        const raw = localStorage.getItem(storageKey)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) {
            return parsed.map((item) => ({ text: item.text, isUser: !!item.isUser }))
          }
        }
      } catch (error) {
        return defaultMessages.map((item) => ({ text: item.text, isUser: item.isUser }))
      }
      return defaultMessages.map((item) => ({ text: item.text, isUser: item.isUser }))
    }

    function saveMessages() {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messages))
      } catch (error) {
        return
      }
    }

    function renderMessages() {
      feed.innerHTML = ""
      messages.forEach((message) => {
        addMessage(message.text, message.isUser, false)
      })
    }

    function addMessage(text, isUser, shouldSave = true) {
      const wrapper = document.createElement("div")
      const alignment = isUser ? "flex-row-reverse" : ""
      wrapper.className = "flex gap-4 " + alignment
      const avatarClass = isUser ? "bg-emerald-600" : "bg-blue-600"
      const bubbleClass = isUser ? "bg-blue-900/40" : "bg-slate-900"
      wrapper.innerHTML =
        '<div class="w-8 h-8 ' + avatarClass + ' rounded-full flex-shrink-0"></div>' +
        '<div class="' + bubbleClass + ' rounded-xl p-4 max-w-2xl">' + text + "</div>"
      feed.appendChild(wrapper)
      feed.scrollTop = feed.scrollHeight
      if (shouldSave) {
        messages.push({ text, isUser })
        saveMessages()
      }
    }

    renderMessages()

    form.addEventListener("submit", (event) => {
      event.preventDefault()
      const input = form.querySelector("input[name='message']")
      const value = input.value.trim()
      if (!value) return
      addMessage(value, true)
      input.value = ""
      setTimeout(() => {
        addMessage("Got it. I can draft a plan or generate examples. Want a quick outline?", false)
      }, 500)
    })

    clearButton.addEventListener("click", () => {
      messages = []
      saveMessages()
      renderMessages()
    })

    newButton.addEventListener("click", () => {
      messages = [{ text: "New chat started. What should we explore?", isUser: false }]
      saveMessages()
      renderMessages()
    })

    document.querySelectorAll("[data-chat]").forEach((button) => {
      button.addEventListener("click", () => {
        document
          .querySelectorAll("[data-chat]")
          .forEach((item) => item.classList.remove("bg-slate-900", "border", "border-slate-800"))
        button.classList.add("bg-slate-900", "border", "border-slate-800")
      })
    })
  </script>
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
  <nav class="border-b bg-white/80 backdrop-blur">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="text-2xl font-bold">SHOP</div>
      <div class="flex items-center gap-6">
        <a href="#products" class="hover:text-blue-600">Products</a>
        <a href="#collections" class="hover:text-blue-600">Collections</a>
        <button class="relative" data-cart-toggle>
          <span class="sr-only">Cart</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          <span class="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center" data-cart-count>0</span>
        </button>
      </div>
    </div>
  </nav>

  <section class="max-w-7xl mx-auto px-6 py-12" id="products">
    <div class="flex items-center justify-between flex-wrap gap-4 mb-8">
      <h1 class="text-4xl font-bold">Featured Products</h1>
      <div class="flex gap-2" data-filter>
        <button class="px-4 py-2 rounded-full bg-blue-600 text-white" data-filter-btn="all">All</button>
        <button class="px-4 py-2 rounded-full border" data-filter-btn="audio">Audio</button>
        <button class="px-4 py-2 rounded-full border" data-filter-btn="wearables">Wearables</button>
        <button class="px-4 py-2 rounded-full border" data-filter-btn="accessories">Accessories</button>
      </div>
    </div>

    <div class="grid md:grid-cols-4 gap-6" data-products>
      <div class="group" data-category="audio">
        <div class="bg-slate-100 aspect-square rounded-xl mb-4 overflow-hidden">
          <div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 group-hover:scale-110 transition-transform"></div>
        </div>
        <h3 class="font-semibold mb-1">Premium Headphones</h3>
        <p class="text-slate-600 text-sm mb-2">Wireless audio perfection</p>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">$299</span>
          <button data-add-to-cart="Premium Headphones" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>

      <div class="group" data-category="wearables">
        <div class="bg-slate-100 aspect-square rounded-xl mb-4 overflow-hidden">
          <div class="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 group-hover:scale-110 transition-transform"></div>
        </div>
        <h3 class="font-semibold mb-1">Smart Watch</h3>
        <p class="text-slate-600 text-sm mb-2">Track your fitness goals</p>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">$399</span>
          <button data-add-to-cart="Smart Watch" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>

      <div class="group" data-category="accessories">
        <div class="bg-slate-100 aspect-square rounded-xl mb-4 overflow-hidden">
          <div class="w-full h-full bg-gradient-to-br from-orange-400 to-pink-500 group-hover:scale-110 transition-transform"></div>
        </div>
        <h3 class="font-semibold mb-1">Laptop Stand</h3>
        <p class="text-slate-600 text-sm mb-2">Ergonomic aluminum design</p>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">$89</span>
          <button data-add-to-cart="Laptop Stand" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>

      <div class="group" data-category="accessories">
        <div class="bg-slate-100 aspect-square rounded-xl mb-4 overflow-hidden">
          <div class="w-full h-full bg-gradient-to-br from-purple-400 to-red-500 group-hover:scale-110 transition-transform"></div>
        </div>
        <h3 class="font-semibold mb-1">Mechanical Keyboard</h3>
        <p class="text-slate-600 text-sm mb-2">Premium typing experience</p>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold">$159</span>
          <button data-add-to-cart="Mechanical Keyboard" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add to Cart</button>
        </div>
      </div>
    </div>
  </section>

  <section id="collections" class="bg-slate-50 py-16">
    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
      <div class="rounded-2xl bg-white p-8 shadow-sm">
        <h2 class="text-2xl font-bold mb-3">Studio Collection</h2>
        <p class="text-slate-600 mb-4">Designed for creators who want clean sound and minimal style.</p>
        <button class="border border-slate-300 px-4 py-2 rounded-lg" data-add-to-cart="Studio Collection Bundle">Add Bundle</button>
      </div>
      <div class="rounded-2xl bg-white p-8 shadow-sm">
        <h2 class="text-2xl font-bold mb-3">Travel Collection</h2>
        <p class="text-slate-600 mb-4">Compact gear built for life on the move.</p>
        <button class="border border-slate-300 px-4 py-2 rounded-lg" data-add-to-cart="Travel Collection Bundle">Add Bundle</button>
      </div>
    </div>
  </section>

  <div class="fixed top-20 right-6 bg-white border border-slate-200 rounded-xl shadow-lg w-72 hidden" data-cart-panel>
    <div class="p-4 border-b">
      <h3 class="font-semibold">Cart</h3>
      <p class="text-sm text-slate-500" data-cart-items>0 items</p>
    </div>
    <div class="p-4 space-y-2" data-cart-list></div>
    <div class="p-4 border-t">
      <button class="w-full bg-blue-600 text-white py-2 rounded-lg">Checkout</button>
    </div>
  </div>

  <script>
    const cartCount = document.querySelector("[data-cart-count]")
    const cartItems = document.querySelector("[data-cart-items]")
    const cartList = document.querySelector("[data-cart-list]")
    const cartPanel = document.querySelector("[data-cart-panel]")
    const cartToggle = document.querySelector("[data-cart-toggle]")
    const cartStorageKey = "demo-ecommerce-cart"
    let cartData = loadCart()

    function loadCart() {
      try {
        const raw = localStorage.getItem(cartStorageKey)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) {
            return parsed.map((item) => String(item))
          }
        }
      } catch (error) {
        return []
      }
      return []
    }

    function saveCart() {
      try {
        localStorage.setItem(cartStorageKey, JSON.stringify(cartData))
      } catch (error) {
        return
      }
    }

    function renderCart() {
      cartCount.textContent = String(cartData.length)
      cartItems.textContent = cartData.length + " items"
      cartList.innerHTML = ""
      cartData.forEach((name) => {
        const item = document.createElement("div")
        item.className = "flex items-center justify-between text-sm"
        item.innerHTML = "<span>" + name + "</span><span>$</span>"
        cartList.appendChild(item)
      })
    }

    renderCart()

    document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.getAttribute("data-add-to-cart")
        if (!name) return
        cartData.push(name)
        saveCart()
        renderCart()
      })
    })

    cartToggle.addEventListener("click", () => {
      cartPanel.classList.toggle("hidden")
    })

    document.querySelectorAll("[data-filter-btn]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-filter-btn]").forEach((btn) => btn.classList.remove("bg-blue-600", "text-white"))
        button.classList.add("bg-blue-600", "text-white")
        const filter = button.getAttribute("data-filter-btn")
        document.querySelectorAll("[data-products] > div").forEach((card) => {
          const category = card.getAttribute("data-category")
          card.classList.toggle("hidden", filter !== "all" && filter !== category)
        })
      })
    })

    document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault()
        const target = document.querySelector(link.getAttribute("href"))
        if (target) {
          target.scrollIntoView({ behavior: "smooth" })
        }
      })
    })
  </script>
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
        <a href="#work" class="text-slate-400 hover:text-white">Work</a>
        <a href="#about" class="text-slate-400 hover:text-white">About</a>
        <a href="#contact" class="text-slate-400 hover:text-white">Contact</a>
      </div>
    </div>
  </nav>

  <main class="max-w-5xl mx-auto px-6">
    <section class="py-20">
      <h1 class="text-6xl md:text-7xl font-bold mb-6">Designer &<br/>Developer</h1>
      <p class="text-xl text-slate-400 max-w-2xl mb-8">I create digital experiences that help businesses grow and users smile.</p>
      <div class="flex gap-4 flex-wrap">
        <a href="#contact" class="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold">Book a call</a>
        <button data-modal-open="resume" class="border border-slate-700 px-6 py-3 rounded-lg">View resume</button>
      </div>
    </section>

    <section id="work" class="py-12">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold">Selected Work</h2>
        <button class="text-slate-400 hover:text-white" data-show-all>Show all</button>
      </div>
      <div class="space-y-12" data-projects>
        <div class="group" data-project>
          <div class="aspect-video bg-slate-900 rounded-xl mb-4 overflow-hidden">
            <div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-105 transition-transform"></div>
          </div>
          <h3 class="text-2xl font-semibold mb-2">E-commerce Redesign</h3>
          <p class="text-slate-400">Complete redesign for a major retail platform.</p>
          <button class="mt-3 text-sm text-blue-400" data-toggle-details>View details</button>
          <div class="mt-3 text-slate-400 hidden" data-details>
            Rebuilt the design system, improved checkout flow, and boosted conversion by 34%.
          </div>
        </div>

        <div class="group" data-project>
          <div class="aspect-video bg-slate-900 rounded-xl mb-4 overflow-hidden">
            <div class="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 group-hover:scale-105 transition-transform"></div>
          </div>
          <h3 class="text-2xl font-semibold mb-2">Mobile Banking App</h3>
          <p class="text-slate-400">Modern banking experience for 2M+ users.</p>
          <button class="mt-3 text-sm text-blue-400" data-toggle-details>View details</button>
          <div class="mt-3 text-slate-400 hidden" data-details>
            Led design sprints, delivered accessibility improvements, and reduced churn.
          </div>
        </div>

        <div class="group" data-project>
          <div class="aspect-video bg-slate-900 rounded-xl mb-4 overflow-hidden">
            <div class="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 group-hover:scale-105 transition-transform"></div>
          </div>
          <h3 class="text-2xl font-semibold mb-2">SaaS Dashboard</h3>
          <p class="text-slate-400">Analytics platform for growth teams.</p>
          <button class="mt-3 text-sm text-blue-400" data-toggle-details>View details</button>
          <div class="mt-3 text-slate-400 hidden" data-details>
            Built a modular UI kit and delivered onboarding flows that increased activation.
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="py-12">
      <h2 class="text-3xl font-bold mb-4">About</h2>
      <p class="text-slate-400 max-w-3xl">I help teams translate product strategy into design systems and experiences that scale. Based in Sao Paulo, available worldwide.</p>
    </section>

    <section id="contact" class="py-12">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        <h2 class="text-3xl font-bold mb-4">Let us work together</h2>
        <form class="grid md:grid-cols-2 gap-4" data-contact-form>
          <input class="px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg" placeholder="Name" required />
          <input class="px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg" placeholder="Email" type="email" required />
          <input class="md:col-span-2 px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg" placeholder="Project details" required />
          <button class="md:col-span-2 bg-blue-600 py-3 rounded-lg hover:bg-blue-700" type="submit">Send message</button>
        </form>
        <p class="text-sm text-slate-400 mt-3 hidden" data-contact-success>Thanks! I will reply within 48 hours.</p>
      </div>
    </section>
  </main>

  <div class="fixed inset-0 bg-black/70 hidden items-center justify-center" data-modal="resume">
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold">Resume snapshot</h3>
        <button data-modal-close="resume" class="text-slate-400">X</button>
      </div>
      <ul class="space-y-2 text-slate-300 text-sm">
        <li>- 8 years product design</li>
        <li>- Led teams in fintech and SaaS</li>
        <li>- Expert in design systems</li>
      </ul>
    </div>
  </div>

  <script>
    document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault()
        const target = document.querySelector(link.getAttribute("href"))
        if (target) target.scrollIntoView({ behavior: "smooth" })
      })
    })

    document.querySelectorAll("[data-toggle-details]").forEach((button) => {
      button.addEventListener("click", () => {
        const details = button.parentElement.querySelector("[data-details]")
        if (!details) return
        details.classList.toggle("hidden")
      })
    })

    document.querySelectorAll("[data-modal-open]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-modal-open")
        const modal = document.querySelector("[data-modal='" + target + "']")
        if (modal) {
          modal.classList.remove("hidden")
          modal.classList.add("flex")
        }
      })
    })

    document.querySelectorAll("[data-modal-close]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-modal-close")
        const modal = document.querySelector("[data-modal='" + target + "']")
        if (modal) {
          modal.classList.add("hidden")
          modal.classList.remove("flex")
        }
      })
    })

    const contactForm = document.querySelector("[data-contact-form]")
    const contactSuccess = document.querySelector("[data-contact-success]")
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()
      contactSuccess.classList.remove("hidden")
    })
  </script>
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
  <nav class="border-b bg-white/80 backdrop-blur">
    <div class="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
      <div class="text-2xl font-bold">TheBlog</div>
      <div class="flex gap-6">
        <a href="#latest" class="text-slate-600 hover:text-slate-900">Articles</a>
        <a href="#topics" class="text-slate-600 hover:text-slate-900">Topics</a>
        <a href="#subscribe" class="text-slate-600 hover:text-slate-900">Subscribe</a>
      </div>
    </div>
  </nav>

  <main class="max-w-4xl mx-auto px-6 py-12">
    <section id="latest">
      <h1 class="text-5xl font-bold mb-12">Latest Articles</h1>

      <article class="mb-16 pb-16 border-b">
        <div class="aspect-video bg-slate-100 rounded-xl mb-6">
          <div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
        </div>
        <div class="flex gap-4 text-sm text-slate-600 mb-4">
          <span>March 15, 2024</span>
          <span>5 min read</span>
        </div>
        <h2 class="text-3xl font-bold mb-4">The Future of Web Development</h2>
        <p class="text-lg text-slate-600 mb-4">Exploring the latest trends shaping how we build for the web in 2024 and beyond.</p>
        <div class="text-slate-600 hidden" data-more>
          Learn how edge rendering, AI tooling, and design systems will change the way teams ship.
        </div>
        <button class="text-blue-600 font-semibold" data-read-more>Read more</button>
      </article>

      <article class="mb-16 pb-16 border-b">
        <div class="aspect-video bg-slate-100 rounded-xl mb-6">
          <div class="w-full h-full bg-gradient-to-br from-green-400 to-teal-500"></div>
        </div>
        <div class="flex gap-4 text-sm text-slate-600 mb-4">
          <span>March 10, 2024</span>
          <span>8 min read</span>
        </div>
        <h2 class="text-3xl font-bold mb-4">Building Scalable React Apps</h2>
        <p class="text-lg text-slate-600 mb-4">Best practices for creating maintainable React apps that grow with your team.</p>
        <div class="text-slate-600 hidden" data-more>
          We cover architecture patterns, state management, and real-world scaling lessons.
        </div>
        <button class="text-blue-600 font-semibold" data-read-more>Read more</button>
      </article>
    </section>

    <section id="topics" class="py-10">
      <h2 class="text-3xl font-bold mb-6">Topics</h2>
      <div class="flex flex-wrap gap-3">
        <button class="border px-4 py-2 rounded-full" data-tag="Design">Design</button>
        <button class="border px-4 py-2 rounded-full" data-tag="Product">Product</button>
        <button class="border px-4 py-2 rounded-full" data-tag="Engineering">Engineering</button>
        <button class="border px-4 py-2 rounded-full" data-tag="Marketing">Marketing</button>
      </div>
      <p class="text-slate-600 mt-4" data-tag-result>Select a topic to highlight it.</p>
    </section>

    <section id="subscribe" class="py-10">
      <div class="bg-slate-50 rounded-2xl p-8">
        <h2 class="text-3xl font-bold mb-4">Weekly insights</h2>
        <p class="text-slate-600 mb-6">Get one email per week with the best content and templates.</p>
        <form class="flex flex-wrap gap-3" data-subscribe-form>
          <input class="flex-1 px-4 py-3 border rounded-lg" placeholder="Email address" type="email" required />
          <button class="bg-blue-600 text-white px-6 py-3 rounded-lg">Subscribe</button>
        </form>
        <p class="text-sm text-slate-600 mt-3 hidden" data-subscribe-success>Thanks for subscribing.</p>
      </div>
    </section>
  </main>

  <script>
    document.querySelectorAll("[data-read-more]").forEach((button) => {
      button.addEventListener("click", () => {
        const article = button.closest("article")
        const more = article.querySelector("[data-more]")
        more.classList.toggle("hidden")
        button.textContent = more.classList.contains("hidden") ? "Read more" : "Show less"
      })
    })

    document.querySelectorAll("[data-tag]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-tag]").forEach((tag) => tag.classList.remove("bg-blue-600", "text-white"))
        button.classList.add("bg-blue-600", "text-white")
        document.querySelector("[data-tag-result]").textContent =
          "Highlighted: " + button.getAttribute("data-tag")
      })
    })

    const subscribeForm = document.querySelector("[data-subscribe-form]")
    const subscribeSuccess = document.querySelector("[data-subscribe-success]")
    subscribeForm.addEventListener("submit", (event) => {
      event.preventDefault()
      subscribeSuccess.classList.remove("hidden")
    })

    document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault()
        const target = document.querySelector(link.getAttribute("href"))
        if (target) target.scrollIntoView({ behavior: "smooth" })
      })
    })
  </script>
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
      <nav class="space-y-2" data-nav>
        <button class="w-full flex items-center gap-3 px-4 py-2 bg-blue-600 rounded-lg" data-section="overview">
          <span>Overview</span>
        </button>
        <button class="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-900 rounded-lg" data-section="analytics">
          <span>Analytics</span>
        </button>
        <button class="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-900 rounded-lg" data-section="users">
          <span>Users</span>
        </button>
        <button class="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-900 rounded-lg" data-section="settings">
          <span>Settings</span>
        </button>
      </nav>
    </aside>

    <main class="flex-1 overflow-auto p-8">
      <section data-panel="overview">
        <h1 class="text-3xl font-bold mb-8">Overview</h1>
        <div class="grid md:grid-cols-4 gap-6 mb-8">
          <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <p class="text-slate-400 mb-2">Total Revenue</p>
            <p class="text-3xl font-bold" data-metric="revenue">$45,231</p>
            <p class="text-green-500 text-sm mt-2">+20.1% from last month</p>
          </div>
          <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <p class="text-slate-400 mb-2">Active Users</p>
            <p class="text-3xl font-bold" data-metric="users">2,350</p>
            <p class="text-green-500 text-sm mt-2">+180 this week</p>
          </div>
          <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <p class="text-slate-400 mb-2">Sales</p>
            <p class="text-3xl font-bold" data-metric="sales">573</p>
            <p class="text-green-500 text-sm mt-2">+12% from yesterday</p>
          </div>
          <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <p class="text-slate-400 mb-2">Conversion</p>
            <p class="text-3xl font-bold" data-metric="conversion">3.2%</p>
            <p class="text-red-500 text-sm mt-2">-0.4% from last month</p>
          </div>
        </div>
        <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
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
          </div>
        </div>
      </section>

      <section data-panel="analytics" class="hidden">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold">Analytics</h1>
          <div class="flex gap-2">
            <button class="px-3 py-1 rounded-full bg-blue-600" data-range="7">7d</button>
            <button class="px-3 py-1 rounded-full border" data-range="30">30d</button>
            <button class="px-3 py-1 rounded-full border" data-range="90">90d</button>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h2 class="text-xl font-semibold mb-4">Traffic</h2>
            <p class="text-4xl font-bold" data-traffic>120k</p>
            <p class="text-sm text-slate-400">Sessions in selected range</p>
          </div>
          <div class="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h2 class="text-xl font-semibold mb-4">Activation</h2>
            <p class="text-4xl font-bold" data-activation>18%</p>
            <p class="text-sm text-slate-400">New users activated</p>
          </div>
        </div>
      </section>

      <section data-panel="users" class="hidden">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold">Users</h1>
          <input class="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2" placeholder="Search" data-user-search />
        </div>
        <div class="space-y-3" data-user-list>
          <div class="bg-slate-900 border border-slate-800 rounded-lg p-4">Ana Lima - Active</div>
          <div class="bg-slate-900 border border-slate-800 rounded-lg p-4">Jordan Lee - Active</div>
          <div class="bg-slate-900 border border-slate-800 rounded-lg p-4">Priya Patel - Invited</div>
          <div class="bg-slate-900 border border-slate-800 rounded-lg p-4">Alex Chen - Active</div>
        </div>
      </section>

      <section data-panel="settings" class="hidden">
        <h1 class="text-3xl font-bold mb-6">Settings</h1>
        <div class="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <label class="flex items-center gap-3">
            <input type="checkbox" checked data-setting="weeklyReports" />
            <span>Email weekly reports</span>
          </label>
          <label class="flex items-center gap-3">
            <input type="checkbox" data-setting="darkTheme" />
            <span>Enable dark theme</span>
          </label>
          <button class="bg-blue-600 px-6 py-2 rounded-lg">Save settings</button>
          <p class="text-sm text-slate-400 hidden" data-settings-saved>Settings saved.</p>
        </div>
      </section>
    </main>
  </div>

  <script>
    document.querySelectorAll("[data-section]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-section]").forEach((item) => item.classList.remove("bg-blue-600"))
        button.classList.add("bg-blue-600")
        const target = button.getAttribute("data-section")
        document.querySelectorAll("[data-panel]").forEach((panel) => {
          panel.classList.toggle("hidden", panel.getAttribute("data-panel") !== target)
        })
      })
    })

    const ranges = {
      7: { traffic: "120k", activation: "18%" },
      30: { traffic: "410k", activation: "21%" },
      90: { traffic: "1.1M", activation: "19%" },
    }
    document.querySelectorAll("[data-range]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-range]").forEach((item) => item.classList.remove("bg-blue-600"))
        button.classList.add("bg-blue-600")
        const range = button.getAttribute("data-range")
        document.querySelector("[data-traffic]").textContent = ranges[range].traffic
        document.querySelector("[data-activation]").textContent = ranges[range].activation
      })
    })

    const search = document.querySelector("[data-user-search]")
    const list = document.querySelector("[data-user-list]")
    search.addEventListener("input", () => {
      const value = search.value.toLowerCase()
      list.querySelectorAll("div").forEach((item) => {
        item.classList.toggle("hidden", !item.textContent.toLowerCase().includes(value))
      })
    })

    const settingsButton = document.querySelector("[data-panel='settings'] button")
    const settingsSaved = document.querySelector("[data-settings-saved]")
    const settingsInputs = document.querySelectorAll("[data-setting]")
    const settingsStorageKey = "demo-admin-settings"

    function loadSettings() {
      try {
        const raw = localStorage.getItem(settingsStorageKey)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        return parsed && typeof parsed === "object" ? parsed : null
      } catch (error) {
        return null
      }
    }

    function saveSettings() {
      const data = {}
      settingsInputs.forEach((input) => {
        const key = input.getAttribute("data-setting")
        data[key] = input.checked
      })
      try {
        localStorage.setItem(settingsStorageKey, JSON.stringify(data))
      } catch (error) {
        return
      }
    }

    const savedSettings = loadSettings()
    if (savedSettings) {
      settingsInputs.forEach((input) => {
        const key = input.getAttribute("data-setting")
        if (key && key in savedSettings) {
          input.checked = !!savedSettings[key]
        }
      })
    }

    settingsButton.addEventListener("click", () => {
      saveSettings()
      settingsSaved.classList.remove("hidden")
    })
  </script>
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
  <nav class="border-b bg-white/80 backdrop-blur">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="text-2xl font-bold">Agency</div>
      <div class="flex gap-8">
        <a href="#services" class="hover:text-blue-600">Services</a>
        <a href="#work" class="hover:text-blue-600">Work</a>
        <a href="#contact" class="hover:text-blue-600">Contact</a>
        <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" data-modal-open="contact">Start a project</button>
      </div>
    </div>
  </nav>

  <main>
    <section class="max-w-7xl mx-auto px-6 py-28 text-center">
      <h1 class="text-6xl md:text-7xl font-bold mb-6">We create<br/>digital experiences</h1>
      <p class="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">Full-service agency for strategy, design, and growth.</p>
      <button class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700" data-modal-open="contact">View Our Work</button>
    </section>

    <section id="services" class="bg-slate-50 py-20">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center">Our Services</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl" data-service>
            <div class="text-4xl mb-4">Brand</div>
            <h3 class="text-2xl font-bold mb-4">Brand Design</h3>
            <p class="text-slate-600">Naming, identity, and positioning.</p>
            <button class="text-blue-600 mt-4" data-service-toggle>Details</button>
            <p class="text-slate-600 mt-3 hidden" data-service-details>Includes workshops, messaging, and visual systems.</p>
          </div>
          <div class="bg-white p-8 rounded-xl" data-service>
            <div class="text-4xl mb-4">Web</div>
            <h3 class="text-2xl font-bold mb-4">Web Development</h3>
            <p class="text-slate-600">Fast, responsive websites.</p>
            <button class="text-blue-600 mt-4" data-service-toggle>Details</button>
            <p class="text-slate-600 mt-3 hidden" data-service-details>Design systems, CMS, and analytics included.</p>
          </div>
          <div class="bg-white p-8 rounded-xl" data-service>
            <div class="text-4xl mb-4">Growth</div>
            <h3 class="text-2xl font-bold mb-4">Marketing</h3>
            <p class="text-slate-600">Campaigns and growth strategy.</p>
            <button class="text-blue-600 mt-4" data-service-toggle>Details</button>
            <p class="text-slate-600 mt-3 hidden" data-service-details>SEO, paid media, and content playbooks.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="work" class="max-w-7xl mx-auto px-6 py-20">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-4xl font-bold">Featured Work</h2>
        <div class="flex gap-2">
          <button class="px-4 py-2 rounded-full border" data-work-prev>Prev</button>
          <button class="px-4 py-2 rounded-full border" data-work-next>Next</button>
        </div>
      </div>
      <div class="bg-slate-100 rounded-2xl p-10" data-work-slide>
        <h3 class="text-2xl font-bold mb-3" data-work-title>Tech Startup Rebrand</h3>
        <p class="text-slate-600" data-work-desc>Complete identity and website for a Series A startup.</p>
      </div>
    </section>

    <section id="contact" class="bg-slate-900 text-white py-20">
      <div class="max-w-4xl mx-auto px-6">
        <h2 class="text-4xl font-bold mb-6">Start a project</h2>
        <form class="grid md:grid-cols-2 gap-4" data-contact-form>
          <input class="px-4 py-3 rounded-lg text-slate-900" placeholder="Name" required />
          <input class="px-4 py-3 rounded-lg text-slate-900" placeholder="Email" type="email" required />
          <textarea class="md:col-span-2 px-4 py-3 rounded-lg text-slate-900" rows="4" placeholder="Tell us about your project" required></textarea>
          <button class="md:col-span-2 bg-blue-600 py-3 rounded-lg">Send request</button>
        </form>
        <p class="text-sm text-blue-200 mt-3 hidden" data-contact-success>Thanks! We will reply soon.</p>
      </div>
    </section>
  </main>

  <div class="fixed inset-0 bg-black/70 hidden items-center justify-center" data-modal="contact">
    <div class="bg-white text-slate-900 rounded-xl p-6 w-full max-w-md">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold">Start a project</h3>
        <button data-modal-close="contact" class="text-slate-500">X</button>
      </div>
      <p class="text-slate-600 mb-4">Tell us about your idea and we will respond within 24 hours.</p>
      <button data-modal-close="contact" class="w-full bg-blue-600 text-white py-2 rounded-lg">Close</button>
    </div>
  </div>

  <script>
    document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault()
        const target = document.querySelector(link.getAttribute("href"))
        if (target) target.scrollIntoView({ behavior: "smooth" })
      })
    })

    document.querySelectorAll("[data-service-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const details = button.parentElement.querySelector("[data-service-details]")
        if (details) details.classList.toggle("hidden")
      })
    })

    const workItems = [
      { title: "Tech Startup Rebrand", desc: "Complete identity and website for a Series A startup." },
      { title: "E-commerce Platform", desc: "Modern shopping experience for sustainable fashion brand." },
      { title: "Health App", desc: "Product design and growth strategy for wellness platform." },
    ]
    let workIndex = 0
    const workTitle = document.querySelector("[data-work-title]")
    const workDesc = document.querySelector("[data-work-desc]")

    function renderWork() {
      workTitle.textContent = workItems[workIndex].title
      workDesc.textContent = workItems[workIndex].desc
    }

    document.querySelector("[data-work-next]").addEventListener("click", () => {
      workIndex = (workIndex + 1) % workItems.length
      renderWork()
    })

    document.querySelector("[data-work-prev]").addEventListener("click", () => {
      workIndex = (workIndex - 1 + workItems.length) % workItems.length
      renderWork()
    })

    document.querySelectorAll("[data-modal-open]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-modal-open")
        const modal = document.querySelector("[data-modal='" + target + "']")
        if (modal) {
          modal.classList.remove("hidden")
          modal.classList.add("flex")
        }
      })
    })

    document.querySelectorAll("[data-modal-close]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-modal-close")
        const modal = document.querySelector("[data-modal='" + target + "']")
        if (modal) {
          modal.classList.add("hidden")
          modal.classList.remove("flex")
        }
      })
    })

    const contactForm = document.querySelector("[data-contact-form]")
    const contactSuccess = document.querySelector("[data-contact-success]")
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault()
      contactSuccess.classList.remove("hidden")
    })
  </script>
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
            <button class="block w-full text-left px-3 py-2 bg-slate-100 rounded-lg" data-doc="intro">Introduction</button>
            <button class="block w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg" data-doc="install">Installation</button>
            <button class="block w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg" data-doc="quickstart">Quick Start</button>
          </div>
        </div>
        <div>
          <p class="text-xs font-semibold text-slate-500 uppercase mb-2">API Reference</p>
          <div class="space-y-1">
            <button class="block w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg" data-doc="components">Components</button>
            <button class="block w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg" data-doc="hooks">Hooks</button>
          </div>
        </div>
      </nav>
    </aside>

    <main class="flex-1 p-12 overflow-auto">
      <section data-doc-panel="intro">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h1 class="text-5xl font-bold">Introduction</h1>
          <button class="border px-4 py-2 rounded-lg" data-modal-open="download-guide">Download guide</button>
        </div>
        <p class="text-lg text-slate-600 mb-8">Build modern applications with a simple, modular framework.</p>
        <div class="prose max-w-none">
          <h2 class="text-3xl font-bold mt-12 mb-4">Why use it?</h2>
          <p class="text-slate-700 mb-4">It combines fast rendering with a clean API so teams can ship quickly.</p>
        </div>
      </section>

      <section data-doc-panel="install" class="hidden">
        <h1 class="text-5xl font-bold mb-4">Installation</h1>
        <p class="text-lg text-slate-600 mb-6">Get started in minutes with a simple install command.</p>
        <div class="bg-slate-900 text-white p-6 rounded-xl flex items-center justify-between">
          <code>npm install framework-name</code>
          <button class="text-sm bg-white text-slate-900 px-3 py-1 rounded" data-copy>Copy</button>
        </div>
        <p class="text-sm text-slate-500 mt-3 hidden" data-copy-success>Copied to clipboard.</p>
      </section>

      <section data-doc-panel="quickstart" class="hidden">
        <h1 class="text-5xl font-bold mb-4">Quick Start</h1>
        <p class="text-lg text-slate-600 mb-6">Create your first component in seconds.</p>
        <div class="bg-slate-900 text-white p-6 rounded-xl">
          <pre class="text-sm"><code>export default function App() {
  return (
    &lt;div&gt;Hello World&lt;/div&gt;
  )
}</code></pre>
        </div>
      </section>

      <section data-doc-panel="components" class="hidden">
        <h1 class="text-5xl font-bold mb-4">Components</h1>
        <p class="text-lg text-slate-600 mb-6">Use prebuilt components to speed up delivery.</p>
      </section>

      <section data-doc-panel="hooks" class="hidden">
        <h1 class="text-5xl font-bold mb-4">Hooks</h1>
        <p class="text-lg text-slate-600 mb-6">Stateful logic for reuse across your app.</p>
      </section>
    </main>
  </div>

  <div class="fixed inset-0 bg-black/70 hidden items-center justify-center" data-modal="download-guide">
    <div class="bg-white text-slate-900 rounded-xl p-6 w-full max-w-lg">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold">Download and run locally</h3>
        <button data-modal-close="download-guide" class="text-slate-500">X</button>
      </div>
      <ol class="list-decimal pl-6 space-y-2 text-sm text-slate-600">
        <li>Click "Download" on a template to save the HTML file.</li>
        <li>Unzip the package if your browser wraps the file.</li>
        <li>Open the HTML file in your browser, or serve it with a simple server.</li>
        <li>Optional: run a local server with <code>npx serve</code> and open the URL shown.</li>
      </ol>
      <div class="mt-4 flex justify-end">
        <button data-modal-close="download-guide" class="bg-blue-600 text-white px-4 py-2 rounded-lg">Got it</button>
      </div>
    </div>
  </div>

  <script>
    document.querySelectorAll("[data-doc]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-doc]").forEach((item) => item.classList.remove("bg-slate-100"))
        button.classList.add("bg-slate-100")
        const target = button.getAttribute("data-doc")
        document.querySelectorAll("[data-doc-panel]").forEach((panel) => {
          panel.classList.toggle("hidden", panel.getAttribute("data-doc-panel") !== target)
        })
      })
    })

    const copyButton = document.querySelector("[data-copy]")
    const copySuccess = document.querySelector("[data-copy-success]")
    if (copyButton) {
      copyButton.addEventListener("click", () => {
        const text = "npm install framework-name"
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(
            () => copySuccess.classList.remove("hidden"),
            () => copySuccess.classList.remove("hidden")
          )
        } else {
          copySuccess.classList.remove("hidden")
        }
      })
    }

    document.querySelectorAll("[data-modal-open]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-modal-open")
        const modal = document.querySelector("[data-modal='" + target + "']")
        if (modal) {
          modal.classList.remove("hidden")
          modal.classList.add("flex")
        }
      })
    })

    document.querySelectorAll("[data-modal-close]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-modal-close")
        const modal = document.querySelector("[data-modal='" + target + "']")
        if (modal) {
          modal.classList.add("hidden")
          modal.classList.remove("flex")
        }
      })
    })
  </script>
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
        <button class="hover:bg-slate-900 p-2 rounded-lg" data-toast="Notifications coming soon">Notifications</button>
        <button class="hover:bg-slate-900 p-2 rounded-lg" data-toast="Messages coming soon">Messages</button>
        <div class="w-8 h-8 bg-blue-600 rounded-full"></div>
      </div>
    </div>
  </nav>

  <main class="max-w-2xl mx-auto px-6 py-8">
    <form class="bg-slate-900 rounded-xl p-4 border border-slate-800 mb-6" data-post-form>
      <input name="post" type="text" placeholder="What's on your mind?" class="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:border-blue-600" />
      <div class="flex justify-end">
        <button class="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700">Post</button>
      </div>
    </form>

    <div class="space-y-6" data-feed>
      <article class="bg-slate-900 rounded-xl p-6 border border-slate-800" data-post>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-purple-600 rounded-full"></div>
          <div>
            <p class="font-semibold">Sarah Chen</p>
            <p class="text-sm text-slate-400">2 hours ago</p>
          </div>
        </div>
        <p class="mb-4">Just launched my new portfolio! Would love your feedback.</p>
        <div class="flex gap-6 text-slate-400">
          <button class="hover:text-blue-500" data-like>Like <span data-count>24</span></button>
          <button class="hover:text-blue-500" data-comment>Comment</button>
          <button class="hover:text-blue-500" data-toast="Link copied">Share</button>
        </div>
      </article>
    </div>
  </main>

  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-4 py-2 rounded-full shadow-lg hidden" data-toast></div>

  <script>
    const feed = document.querySelector("[data-feed]")
    const form = document.querySelector("[data-post-form]")
    const toast = document.querySelector("[data-toast]")
    const postStorageKey = "demo-social-posts"
    let storedPosts = loadPosts()

    function loadPosts() {
      try {
        const raw = localStorage.getItem(postStorageKey)
        if (!raw) return []
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          return parsed.map((item) => ({
            id: String(item.id),
            text: String(item.text),
            likes: Number(item.likes) || 0,
          }))
        }
      } catch (error) {
        return []
      }
      return []
    }

    function savePosts() {
      try {
        localStorage.setItem(postStorageKey, JSON.stringify(storedPosts))
      } catch (error) {
        return
      }
    }

    function buildPostElement(post) {
      const article = document.createElement("article")
      article.className = "bg-slate-900 rounded-xl p-6 border border-slate-800"
      article.setAttribute("data-post-id", post.id)
      article.innerHTML =
        '<div class="flex items-center gap-3 mb-4">' +
        '<div class="w-10 h-10 bg-blue-600 rounded-full"></div>' +
        "<div>" +
        '<p class="font-semibold">You</p>' +
        '<p class="text-sm text-slate-400">Just now</p>' +
        "</div>" +
        "</div>" +
        '<p class="mb-4">' + post.text + "</p>" +
        '<div class="flex gap-6 text-slate-400">' +
        '<button class="hover:text-blue-500" data-like>Like <span data-count="' +
        post.likes +
        '">' +
        post.likes +
        "</span></button>" +
        '<button class="hover:text-blue-500" data-comment>Comment</button>' +
        '<button class="hover:text-blue-500" data-toast="Link copied">Share</button>' +
        "</div>"
      return article
    }

    function renderStoredPosts() {
      storedPosts
        .slice()
        .reverse()
        .forEach((post) => {
          feed.prepend(buildPostElement(post))
        })
    }

    renderStoredPosts()

    form.addEventListener("submit", (event) => {
      event.preventDefault()
      const input = form.querySelector("input[name='post']")
      const value = input.value.trim()
      if (!value) return
      const post = { id: String(Date.now()), text: value, likes: 0 }
      storedPosts.unshift(post)
      savePosts()
      feed.prepend(buildPostElement(post))
      input.value = ""
    })

    document.addEventListener("click", (event) => {
      const likeButton = event.target.closest("[data-like]")
      if (likeButton) {
        const count = likeButton.querySelector("[data-count]")
        const postCard = likeButton.closest("[data-post-id]")
        if (postCard) {
          const postId = postCard.getAttribute("data-post-id")
          const targetPost = storedPosts.find((post) => post.id === postId)
          if (targetPost) {
            targetPost.likes += 1
            savePosts()
            count.textContent = targetPost.likes
            return
          }
        }
        count.textContent = Number(count.textContent) + 1
      }

      const commentButton = event.target.closest("[data-comment]")
      if (commentButton) {
        showToast("Comments are coming soon")
      }

      const toastButton = event.target.closest("[data-toast]")
      if (toastButton && toastButton !== toast) {
        showToast(toastButton.getAttribute("data-toast"))
      }
    })

    function showToast(message) {
      toast.textContent = message
      toast.classList.remove("hidden")
      setTimeout(() => toast.classList.add("hidden"), 1500)
    }
  </script>
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
  <nav class="border-b bg-white/80 backdrop-blur">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <span class="text-xl font-bold">StartupName</span>
      </div>
      <div class="flex items-center gap-4">
        <a href="#features" class="text-slate-600 hover:text-slate-900">Features</a>
        <a href="#pricing" class="text-slate-600 hover:text-slate-900">Pricing</a>
        <a href="#waitlist" class="text-slate-600 hover:text-slate-900">Waitlist</a>
        <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Get Early Access</button>
      </div>
    </div>
  </nav>

  <main>
    <section class="max-w-7xl mx-auto px-6 py-28 text-center">
      <div class="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">Now in Beta</div>
      <h1 class="text-6xl md:text-7xl font-bold mb-6">The future of<br/>productivity</h1>
      <p class="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">Join thousands of teams already using our platform to work smarter, not harder.</p>
      <div class="flex gap-4 justify-center flex-wrap">
        <a href="#waitlist" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold">Join Waitlist</a>
        <button class="border border-slate-300 px-8 py-3 rounded-lg">View Demo</button>
      </div>
    </section>

    <section id="features" class="bg-slate-50 py-20">
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

    <section id="pricing" class="max-w-7xl mx-auto px-6 py-20">
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-4xl font-bold">Pricing</h2>
        <div class="flex gap-2" data-price-toggle>
          <button class="px-4 py-2 rounded-full bg-blue-600 text-white" data-price="monthly">Monthly</button>
          <button class="px-4 py-2 rounded-full border" data-price="annual">Annual</button>
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="border rounded-2xl p-8">
          <h3 class="text-xl font-semibold mb-2">Starter</h3>
          <p class="text-4xl font-bold" data-price-starter>$19/mo</p>
          <ul class="mt-4 text-slate-600 space-y-2">
            <li>- 3 team members</li>
            <li>- Basic analytics</li>
          </ul>
        </div>
        <div class="border-2 border-blue-600 rounded-2xl p-8">
          <h3 class="text-xl font-semibold mb-2">Growth</h3>
          <p class="text-4xl font-bold" data-price-growth>$49/mo</p>
          <ul class="mt-4 text-slate-600 space-y-2">
            <li>- Unlimited projects</li>
            <li>- Advanced automation</li>
          </ul>
        </div>
        <div class="border rounded-2xl p-8">
          <h3 class="text-xl font-semibold mb-2">Enterprise</h3>
          <p class="text-4xl font-bold">Custom</p>
          <ul class="mt-4 text-slate-600 space-y-2">
            <li>- Dedicated support</li>
            <li>- Custom integrations</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="waitlist" class="bg-slate-900 text-white py-20">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-4">Join the waitlist</h2>
        <p class="text-slate-300 mb-8">Get early access and product updates.</p>
        <form class="flex gap-3 flex-wrap justify-center" data-waitlist-form>
          <input class="px-4 py-3 rounded-lg text-slate-900 w-64" placeholder="Email" type="email" required />
          <button class="bg-blue-600 px-6 py-3 rounded-lg">Join</button>
        </form>
        <p class="text-sm text-blue-200 mt-4 hidden" data-waitlist-success>Thanks for joining! We will be in touch.</p>
      </div>
    </section>
  </main>

  <script>
    document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault()
        const target = document.querySelector(link.getAttribute("href"))
        if (target) target.scrollIntoView({ behavior: "smooth" })
      })
    })

    document.querySelectorAll("[data-price]").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll("[data-price]").forEach((item) => item.classList.remove("bg-blue-600", "text-white"))
        button.classList.add("bg-blue-600", "text-white")
        const mode = button.getAttribute("data-price")
        document.querySelector("[data-price-starter]").textContent = mode === "annual" ? "$190/yr" : "$19/mo"
        document.querySelector("[data-price-growth]").textContent = mode === "annual" ? "$490/yr" : "$49/mo"
      })
    })

    const waitlistForm = document.querySelector("[data-waitlist-form]")
    const waitlistSuccess = document.querySelector("[data-waitlist-success]")
    waitlistForm.addEventListener("submit", (event) => {
      event.preventDefault()
      waitlistSuccess.classList.remove("hidden")
    })
  </script>
</body>
</html>`,
}

export function getTemplateHTML(templateId: number): string {
  return templates[templateId] || templates[1]
}
