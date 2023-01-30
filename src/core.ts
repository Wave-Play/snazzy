/**
 * © 2023 WavePlay <dev@waveplay.com>
 */
import { Platform } from 'react-native'
import type { StyleProp } from 'react-native'
import type { SnazzyBackend, SnazzyOptions, StyleType } from './backend/_base'

const IS_NATIVE = Platform.OS === 'ios' || Platform.OS === 'android'

interface SnazzyInitOptions {
	backend?: SnazzyBackend
	transformers?: SnazzyTransformer[]
}

export type SnazzySheet<T> = {
	[Property in keyof T]: SnazzyStyle<StyleType>
}

export interface SnazzyStyle<T> {
	style: StyleProp<T>
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

	public css<T = StyleType>(style: T, options?: SnazzyOptions): SnazzyStyle<StyleType> {
		const { raw } = options ?? {}

		// If marked as raw, return as plain style object (don't run through the backend)
		const isRaw = raw === true || (IS_NATIVE && raw === 'native') || (!IS_NATIVE && raw === 'web')
		if (isRaw) {
			return this.cssRaw(style)
		}

		// Create a single style object
		return {
			style: this._backend.create(
				{
					style: this._transform(style, options)
				},
				{
					...(options ?? {}),
					isNative: IS_NATIVE
				}
			).style
		}
	}

	public cssRaw<T = StyleType>(style: T): SnazzyStyle<T> {
		return { style: this._transform(style, { raw: true }) }
	}

	public merge<T = StyleType>(...snazzyStyles: SnazzyStyle<T>[]): SnazzyStyle<T> {
		return {
			style: this._backend.merge(...(snazzyStyles.map((snazzyStyle) => snazzyStyle.style) as T[]))
		}
	}

	public sheet<Value extends StyleType, T extends Record<string, Value>>(styles: T, options?: SnazzyOptions): SnazzySheet<T> {
		// These keys are used to transform and create Snazzy syntax
		const keys = Object.keys(styles) as (keyof T)[]

		// Transform each style
		const transformedStyles = keys.reduce((acc, key) => {
			acc[key] = this._transform(styles[key], options)
			return acc
		}, {} as Record<keyof T, StyleType>)

		// Run through the backend to create a sheet
		const sheet = this._backend.create(transformedStyles, {
			...(options ?? {}),
			isNative: IS_NATIVE
		})

		// Convert the sheet to a SnazzySheet for snazzy syntax!
		return keys.reduce((acc, key) => {
			acc[key] = { style: sheet[key] }
			return acc
		}, {} as SnazzySheet<T>)
	}

	public sheetRaw<Value extends StyleType, T extends Record<string, Value>>(styles: T): SnazzySheet<T> {
		// These keys are used to transform and create Snazzy syntax
		const keys = Object.keys(styles) as (keyof T)[]

		// Transform each style
		const transformedStyles = keys.reduce((acc, key) => {
			acc[key] = this._transform(styles[key], {})
			return acc
		}, {} as Record<keyof T, StyleType>)

		return keys.reduce((acc, key) => {
			acc[key] = this.cssRaw(transformedStyles[key])
			return acc
		}, {} as SnazzySheet<T>)
	}

	private _transform<T>(style: T, options: SnazzyOptions): T {
		for (const transformer of this._transformers) {
			style = transformer<T>(style, options)
		}
		return style
	}
}
