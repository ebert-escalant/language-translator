import { type FC } from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Traductor',
	description: 'Traductor de texto'
}

interface Props {
	children: React.ReactNode
}

const RootLayout: FC<Props> = ({ children }): JSX.Element => {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-gray-900 text-gray-300`}>
				{children}
			</body>
		</html>
	)
}

export default RootLayout