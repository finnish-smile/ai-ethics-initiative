import { useEffect } from 'react'

// Adds a "revealed" class to every [data-reveal] element once it scrolls
// into view, and removes it again if scrolled back out — matching the
// fade/slide-in-as-you-scroll treatment used throughout the reference
// design. Re-scans on route change since each page mounts its own set of
// [data-reveal] elements.
export default function useRevealOnScroll(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    if (!els.length) return

    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-revealed', entry.isIntersecting)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
