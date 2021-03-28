import React from 'react'
import { ThemeProvider } from '@emotion/react'
import { theme } from 'styles/Theme'

export default function ResponsiveThemeProvider({
	children,
}: React.PropsWithChildren<{}>) {
	const deviceWidth = window.innerWidth

	let device = 'desktop'

	if (deviceWidth < 600) {
		device = 'phone'
	} else if (deviceWidth < 1200) {
		device = 'tablet'
	} else if (deviceWidth < 1800) device = 'big'

	return <ThemeProvider theme={{ ...theme, device }}>{children}</ThemeProvider>
}
