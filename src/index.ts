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
export const css = snazzy.css
export const cssRaw = snazzy.cssRaw
export const merge = snazzy.merge
export const sheet = snazzy.sheet
