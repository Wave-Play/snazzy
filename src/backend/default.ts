/**
 * © 2023 WavePlay <dev@waveplay.com>
 */
import { StyleSheet } from 'react-native'
import type { SnazzyBackend } from './_base'

export class DefaultBackend implements SnazzyBackend {
	public create<T>(style: T): T {
		return StyleSheet.create(style)
	}

	public merge<T>(...styles: T[]): T {
		return styles.reduce((style1, style2) => StyleSheet.compose(style1, style2) as T)
	}
}
export default DefaultBackend
