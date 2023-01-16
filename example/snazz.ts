import { Snazzy } from '@waveplay/snazzy/core'
import { DefaultBackend } from '@waveplay/snazzy/backend/default'
import type { SnazzyOptions, StyleType } from '@waveplay/snazzy/backend'

const exampleTransformer = <T extends StyleType>(style: T, options: SnazzyOptions) => {
	if (options?.id === 'title') {
		style.backgroundColor = 'pink'
	}
	return style
}

const snazz = new Snazzy({
	backend: new DefaultBackend(),
	transformers: [ exampleTransformer ]
})

export default snazz
export const css = snazz.css.bind(snazz)
export const cssRaw = snazz.cssRaw.bind(snazz)
export const merge = snazz.merge.bind(snazz)
export const sheet = snazz.sheet.bind(snazz)
