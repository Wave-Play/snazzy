/**
 * © 2023 WavePlay <dev@waveplay.com>
 */
import { Snazzy } from './core'
import { DefaultBackend } from './backend/default'

const snazzy = new Snazzy({
	backend: new DefaultBackend()
})

export * from './core'
export default snazzy
export const css: typeof snazzy.css = snazzy.css.bind(snazzy)
export const cssRaw: typeof snazzy.cssRaw = snazzy.cssRaw.bind(snazzy)
export const merge: typeof snazzy.merge = snazzy.merge.bind(snazzy)
export const sheet: typeof snazzy.sheet = snazzy.sheet.bind(snazzy)
