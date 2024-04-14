import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';
import { Toaster } from '@/components/ui/toaster';

import * as china from '@/components/china.json';

const inter = Inter({ subsets: ['latin'] });
import * as echarts from 'echarts/core';
// @ts-ignore
echarts.registerMap('china', china);

export const metadata: Metadata = {
	title: 'Palamedes',
	description: 'A composed NFT issued on Ethereum blockchain'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	console.log(echarts, 'echarts');
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>{children}</Providers>
				<Toaster />
			</body>
		</html>
	);
}
