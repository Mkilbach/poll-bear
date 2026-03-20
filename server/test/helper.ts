import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import { build as buildApplication } from 'fastify-cli/helper'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const AppPath = join(__dirname, '..', 'app.js')

export function config () {
  return {
    skipOverride: true
  }
}

export async function build (t: any) {
  const argv = [AppPath]
  const app = await buildApplication(argv, config())
  t.after(() => app.close())
  return app
}
