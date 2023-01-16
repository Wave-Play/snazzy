import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src'],
	external: ['react-native'],
	format: ['esm', 'cjs'],
	bundle: false,
	clean: true,
	dts: true,
	minify: true,
	sourcemap: true
})
