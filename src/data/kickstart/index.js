import { MODULES_META, moduleMetaById } from './modules.js'
import module1 from './module-1-basics.js'
import module2 from './module-2-ethics.js'
import module3 from './module-3-tools.js'
import module4 from './module-4-prompting.js'
import module5 from './module-5-build.js'

// Only modules with content written so far are registered here — add each
// new module-N-*.js file to this map as it's built.
const CONTENT = {
  basics: module1,
  ethics: module2,
  'getting-started': module3,
  prompting: module4,
  build: module5,
}

export { MODULES_META }

export function moduleById(id) {
  const meta = moduleMetaById(id)
  const content = CONTENT[id]
  if (!meta || !content) return null
  return { ...meta, steps: content.steps }
}

// Dashboard cards only need meta + step count, not full block content —
// this avoids importing every module's content just to render the list.
export function modulesForDashboard() {
  return MODULES_META.map((meta) => ({
    ...meta,
    steps: CONTENT[meta.id]?.steps ?? [],
    isBuilt: Boolean(CONTENT[meta.id]),
  }))
}
