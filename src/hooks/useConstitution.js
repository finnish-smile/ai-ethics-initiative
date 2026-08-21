import { useEffect, useState } from 'react'

const STORAGE_KEY = 'kickstart-constitution-v1'

function load() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function save(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage unavailable — the constitution just won't persist across
    // visits, which is an acceptable fallback rather than a hard error.
  }
}

// data shape: { [principleId]: string } — one commitment per principle
export default function useConstitution() {
  const [entries, setEntries] = useState(load)

  useEffect(() => {
    save(entries)
  }, [entries])

  const setEntry = (principleId, text) => {
    setEntries((prev) => ({ ...prev, [principleId]: text }))
  }

  const clearAll = () => setEntries({})

  return { entries, setEntry, clearAll }
}
