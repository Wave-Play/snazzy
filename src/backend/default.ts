/**
 * © 2023 WavePlay <dev@waveplay.com>
 */
import { StyleSheet } from 'react-native'
import type { StyleProp } from 'react-native'
import type { RawSheet, SnazzyBackend, StyleType } from './_base'

export class DefaultBackend implements SnazzyBackend {
	public create<T extends Record<string, unknown>>(style: T): RawSheet<T> {
		return StyleSheet.create(style)
	}

	public merge<T extends StyleType>(...styles: StyleProp<T>[]): StyleProp<T> {
		return styles.reduce((style1, style2) => StyleSheet.compose(style1, style2))
	}
}
export default DefaultBackend
