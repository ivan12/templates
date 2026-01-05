import { cpSync, existsSync, rmSync, renameSync } from "node:fs"
import { join } from "node:path"

const outDir = join(process.cwd(), "out")
const distDir = join(process.cwd(), "dist")

if (!existsSync(outDir)) {
  console.error("Expected Next.js export output in ./out.")
  process.exit(1)
}

if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true, force: true })
}

try {
  renameSync(outDir, distDir)
} catch (error) {
  cpSync(outDir, distDir, { recursive: true })
  rmSync(outDir, { recursive: true, force: true })
}
