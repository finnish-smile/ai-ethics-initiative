import { useEffect } from 'react'

// Adds a "revealed" class to every [data-reveal] element the first time it
// scrolls into view, then stops watching it so it stays visible — matching
// the fade/slide-in-as-you-scroll treatment used throughout the reference
// design. Re-scans on route change since each page mounts its own set of
// [data-reveal] elements, so items fade in again after a page change or a
// refresh.
//
// Revealing only once matters: a hidden item is shifted 30px down
// (reveal.css), so if items were hidden again on the way out, one sitting at
// the top edge of the screen would shift back into view, reveal, shift out,
// hide, and keep flickering on its own.
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
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
