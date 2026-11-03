import { createElement, isValidElement } from 'react'

// Helpers for the Stewardship guidebook components. They reproduce how the
// original guidebook's runtime turned its template into elements, so the
// rebuilt pages render exactly the same.

// Inline style strings → React style objects (the runtime's cssToObj).
export function cssToObj(css) {
  const o = {}
  for (const decl of String(css).split(';')) {
    const i = decl.indexOf(':')
    if (i < 0) continue
    const prop = decl.slice(0, i).trim()
    o[prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = decl.slice(i + 1).trim()
  }
  return o
}

// Style values: the template's literal strings are parsed like inline CSS;
// objects (built in the logic) are used as they are.
export function toStyle(v) {
  return typeof v === 'string' ? cssToObj(v) : v
}

// Text filled into the template, as the original runtime rendered it:
// elements as they are, nothing for null/true/false, and everything else as
// text in a <span class="sc-interp">.
export function interp(v) {
  if (v === undefined || v === null || typeof v === 'boolean') return null
  if (isValidElement(v) || Array.isArray(v)) return v
  return createElement('span', { className: 'sc-interp' }, String(v))
}

// Lists the template loops over (anything that isn't an array renders nothing).
export function asList(v) {
  return Array.isArray(v) ? v : []
}

// The guidebook's paintings and images.
export function asset(name) {
  return `${import.meta.env.BASE_URL}images/stewardship/${name}`
}

// The fonts the guidebook was designed with (Newsreader with its optical-size
// axis, IBM Plex Sans).
export const GUIDE_FONTS =
  'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap'
