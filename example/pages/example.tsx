import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { usePilot } from '@waveplay/pilot'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { css, merge, sheet } from '../snazz'

interface ExamplePageProps {
	title?: string
}
const ExamplePage = (props: ExamplePageProps) => {
	const { title } = props
	const pilot = usePilot()

	return (
		<View {...merge(rootStyle, rootOverrideStyle)}>
			<Head>
				<title>Pilot - {title}</title>
			</Head>
			<Text {...titleStyle}>{title}</Text>
			<TouchableOpacity {...styles.button} onPress={() => pilot.back()}>
				<Text {...styles.buttonText}>Go back</Text>
			</TouchableOpacity>
		</View>
	)
}
export default ExamplePage

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			title: 'Example Page'
		},
		revalidate: 60
	}
}

const rootStyle = css({
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center'
})

const rootOverrideStyle = css({
	backgroundColor: '#ddd'
})

const titleStyle = css({
	color: 'black',
	fontSize: 24,
	fontWeight: '600'
}, { id: 'title' })

const styles = sheet({
	button: {
		height: 48,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		backgroundColor: 'teal',
		borderRadius: 24,
		paddingLeft: 16,
		paddingRight: 16,
		marginTop: 16
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '400'
	}
}, { tags: ['button'] })
