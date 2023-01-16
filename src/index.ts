/**
 * © 2023 WavePlay <dev@waveplay.com>
 */
import { Snazzy } from './core'
import DefaultBackend from './backend/default'

const snazzy = new Snazzy({
	backend: new DefaultBackend()
})

export * from './core'
export default snazzy
export const css = snazzy.css.bind(snazzy)
export const cssRaw = snazzy.cssRaw.bind(snazzy)
export const merge = snazzy.merge.bind(snazzy)
export const sheet = snazzy.sheet.bind(snazzy)
