// The five principles of the Stewardship of AI guidebook, in order. `slug` is
// the page address (/principles/<slug>); `view` is the guide's internal name
// for that principle's page.
export const PRINCIPLES = [
  { slug: 'agency', view: 'purpose', name: 'Agency' },
  { slug: 'becoming', view: 'identity', name: 'Becoming' },
  { slug: 'fellowship', view: 'relationships', name: 'Fellowship' },
  { slug: 'discernment', view: 'growth', name: 'Discernment' },
  { slug: 'integrity', view: 'action', name: 'Integrity' },
]

export function viewForSlug(slug) {
  if (!slug) return 'home'
  return PRINCIPLES.find((p) => p.slug === slug)?.view ?? null
}

export function slugForView(view) {
  return PRINCIPLES.find((p) => p.view === view)?.slug ?? ''
}
