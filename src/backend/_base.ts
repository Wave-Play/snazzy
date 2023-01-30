/**
 * © 2023 WavePlay <dev@waveplay.com>
 */
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native'

export type StyleType = ViewStyle | TextStyle | ImageStyle

export type RawSheet<T> = {
	[Property in keyof T]: StyleProp<StyleType>
}

export interface SnazzyBackend {
	create: <T extends Record<string, unknown>>(style: T, options: SnazzyOptionsBackend) => RawSheet<T>
	merge: <T extends StyleType>(...styles: StyleProp<T>[]) => StyleProp<T>
}

export interface SnazzyOptions {
	id?: string
	raw?: boolean | 'native' | 'web'
	tags?: string[]
}

export interface SnazzyOptionsBackend extends SnazzyOptions {
	isNative?: boolean
}
