"use client"

// Página demo Nexus Studio convertida de HTML para Next.js
// Ajuste os componentes conforme necessário para modularização

import React, { useEffect } from 'react';

const NexusDemoPage = () => {
  useEffect(() => {
    // Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
    // Counter animation
    function animateCounters() {
      const counters = document.querySelectorAll('.counter');
      const observer = new window.IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000;
            const startTime = performance.now();
            function updateCounter(currentTime) {
              const elapsedTime = currentTime - startTime;
              const progress = Math.min(elapsedTime / duration, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              let current;
              if (suffix === '%') {
                current = (target * easeOutQuart).toFixed(2);
              } else if (suffix === 'M+') {
                current = (target / 1000000 * easeOutQuart).toFixed(1);
              } else {
                current = Math.floor(target * easeOutQuart);
              }
              counter.textContent = current + suffix;
              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              }
            }
            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(counter => {
        observer.observe(counter);
      });
    }
    animateCounters();
  }, []);

  return (
    <main className="min-h-full overflow-x-hidden text-white bg-black">
      {/* Navigation */}
      <header className="fixed top-4 left-4 right-4 z-50 fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="h-14 flex glass-effect bg-white/5 border-white/10 border rounded-full pr-3 pl-3 items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 flex bg-gradient-to-b from-blue-400 to-blue-600 rounded-full items-center justify-center">
                {/* SVG Hexagon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hexagon h-4 w-4 text-white" style={{width:16,height:16,color:'#fff'}}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              </div>
              <span className="text-lg font-medium sf-pro-display">Nexus Studio</span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors">Platform</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Solutions</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Enterprise</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Resources</a>
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <button className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors">Sign In</button>
              <button className="px-4 py-2 text-sm bg-white text-black rounded-full hover:bg-white/90 transition-all transform hover:scale-105">Get Started</button>
            </div>
            <button className="md:hidden p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu h-5 w-5"><path d="M4 12h16"></path><path d="M4 18h16"></path><path d="M4 6h16"></path></svg>
            </button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="max-w-full sm:px-6 lg:px-8 relative z-10 mr-auto ml-auto pt-40 pr-4 pl-4">
        {/* ...aqui vai o conteúdo do Hero Section convertido para JSX... */}
      </section>
      {/* Interactive IDE Section */}
      <section className="pt-20 pb-20">
        {/* ...aqui vai o conteúdo do IDE Section convertido para JSX... */}
      </section>
      {/* Success Stories Section */}
      <section className="pt-32 pb-32">
        {/* ...aqui vai o conteúdo do Success Stories convertido para JSX... */}
      </section>
      {/* Features Grid */}
      <section className="pt-32 pb-32">
        {/* ...aqui vai o conteúdo do Features Grid convertido para JSX... */}
      </section>
      {/* CTA Section */}
      <section className="pt-32 pb-32">
        {/* ...aqui vai o conteúdo do CTA convertido para JSX... */}
      </section>
      {/* Footer */}
      <footer className="border-white/10 border-t pt-16 pb-16">
        {/* ...aqui vai o conteúdo do Footer convertido para JSX... */}
      </footer>
    </main>
  );
};

export default NexusDemoPage;
