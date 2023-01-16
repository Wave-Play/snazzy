import React from 'react'
import { Text, View } from 'react-native'
import { Link } from '@waveplay/pilot/link'
import Head from 'next/head'
import { css, merge, sheet } from '@waveplay/snazzy'

const Home = () => {
	return (
		<View {...merge(rootStyle, rootOverrideStyle)}>
			<Head>
				<title>Pilot - Basic Demo</title>
			</Head>
			<Text {...titleStyle}>Home</Text>
			<Link {...styles.button} href={'/example'}>
				<Text {...styles.buttonText}>Go to example page</Text>
			</Link>
		</View>
	)
}
export default Home

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
