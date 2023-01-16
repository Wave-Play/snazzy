/**
 * © 2023 WavePlay <dev@waveplay.com>
 */
import { Platform } from 'react-native'
import type { SnazzyBackend, SnazzyOptions, StyleType } from './backend/_base'

const IS_NATIVE = Platform.OS === 'ios' || Platform.OS === 'android'

type RawSheet = { [key: string]: StyleType }

interface SnazzyInitOptions {
	backend?: SnazzyBackend
	transformers?: SnazzyTransformer[]
}

export interface SnazzySheet {
	[key: string]: SnazzyStyle<StyleType>
}

export interface SnazzyStyle<T> {
	style: T | Array<T>
}

export interface SnazzyTransformer {
	<T>(style: T, options: SnazzyOptions): T
}

export class Snazzy {
	private readonly _backend: SnazzyBackend
	private readonly _transformers: SnazzyTransformer[]

	constructor(options: SnazzyInitOptions) {
		this._backend = options.backend
		this._transformers = options.transformers ?? []
	}

	public css<T = StyleType>(style: T, options?: SnazzyOptions): SnazzyStyle<T> {
		const { raw } = options ?? {}

		// If marked as raw, return as plain style object (don't run through the backend)
		const isRaw = raw === true || (IS_NATIVE && raw === 'native') || (!IS_NATIVE && raw === 'web')
		if (isRaw) {
			return this.cssRaw(style)
		}

		// Create a single style object
		return {
			style: (this._backend.create<T>({
				style: this._transform(style, options)
			} as T, {
				...(options ?? {}),
				isNative: IS_NATIVE
			}) as any).style
		}
	}

	public cssRaw<T = StyleType>(style: T): SnazzyStyle<T> {
		return { style: this._transform(style, { raw: true }) }
	}

	public merge<T = StyleType>(...snazzyStyles: SnazzyStyle<T>[]): SnazzyStyle<T> {
		return {
			style: this._backend.merge(
				...snazzyStyles.map((snazzyStyle) => snazzyStyle.style) as T[]
			)
		}
	}

	public sheet<T>(styles: T | RawSheet, options?: SnazzyOptions): T {
		// Transform each style
		const transformedStyles = Object.keys(styles).reduce((acc, key) => {
			acc[key] = this._transform(styles[key], options)
			return acc
		}, {})

		// Run through the backend to create a sheet
		const sheet = this._backend.create(transformedStyles, {
			...(options ?? {}),
			isNative: IS_NATIVE
		})

		// Convert the sheet to a SnazzySheet for snazzy syntax!
		return Object.keys(sheet).reduce((acc, key) => {
			acc[key] = { style: sheet[key] }
			return acc
		}, {} as T)
	}

	public sheetRaw(styles: RawSheet): SnazzySheet {
		return Object.keys(styles).reduce((acc, key) => {
			acc[key] = this.cssRaw(styles[key])
			return acc
		}, {} as SnazzySheet)
	}

	private _transform<T>(style: T, options: SnazzyOptions): T {
		for (const transformer of this._transformers) {
			style = transformer<T>(style, options)
		}
		return style
	}
}
