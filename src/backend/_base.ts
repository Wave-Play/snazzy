/**
 * © 2023 WavePlay <dev@waveplay.com>
 */
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'

export type StyleType = ViewStyle | TextStyle | ImageStyle

export interface SnazzyBackend {
	create: <T extends StyleType>(style: T, options: SnazzyOptionsBackend) => T
	merge: <T extends StyleType>(...styles: T[]) => T
}

export interface SnazzyOptions {
	id?: string
	raw?: boolean | 'native' | 'web'
	tags?: string[]
}

export interface SnazzyOptionsBackend extends SnazzyOptions {
	isNative?: boolean
}
