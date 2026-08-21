import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'kickstart-progress-v1'

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
    // localStorage unavailable (private browsing, quota, etc.) — progress
    // just won't persist across visits, which is an acceptable fallback.
  }
}

// data shape: { [lessonId]: string[] of completed step ids }
export default function useKickstartProgress() {
  const [data, setData] = useState(load)

  useEffect(() => {
    save(data)
  }, [data])

  const isStepDone = useCallback(
    (lessonId, stepId) => Boolean(data[lessonId]?.includes(stepId)),
    [data],
  )

  const markStepDone = useCallback((lessonId, stepId) => {
    setData((prev) => {
      const done = prev[lessonId] || []
      if (done.includes(stepId)) return prev
      return { ...prev, [lessonId]: [...done, stepId] }
    })
  }, [])

  const lessonProgress = useCallback(
    (lesson) => {
      const done = data[lesson.id] || []
      const completed = lesson.steps.filter((s) => done.includes(s.id)).length
      return { completed, total: lesson.steps.length }
    },
    [data],
  )

  return { isStepDone, markStepDone, lessonProgress }
}
