import { useEffect, useRef, useState } from 'react'

// Scroll-triggered reveal via IntersectionObserver (not scroll-position
// math) per the cinematic sequence's build spec — more reliable across
// devices/browsers than computing pixel offsets by hand. Fires once, then
// disconnects; the element stays revealed even if scrolled back past.
export default function useInView({ threshold = 0.35, rootMargin = '0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, inView]
}
