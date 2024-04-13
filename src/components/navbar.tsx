'use client';

import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { injected } from 'wagmi/connectors';
import { useConnect } from 'wagmi';

const font = Montserrat({
	weight: '600',
	subsets: ['latin']
});
const navigation = [
	{ name: 'Marketplace', href: '#' },
	{ name: 'Share to X', href: 'https://twitter.com/VitalikButerin' },
	{ name: 'Github', href: 'https://github.com/composable-NFT' }
];

export const Navbar = () => {
	const { connect } = useConnect();
	return (
		<nav className="flex items-center justify-between bg-transparent p-4">
			<Link href="/" className="flex items-center">
				<div className="relative mr-4 h-8 w-8">
					<Image
						width={64}
						height={64}
						alt="Logo"
						src="/logo1.jpg"
						priority
						sizes=""
					/>
				</div>
				<h1 className={cn('text-2xl font-bold text-white', font.className)}>
					Palamedes
				</h1>
			</Link>
			<div className="hidden lg:flex lg:gap-x-12">
				{' '}
				{navigation.map((item) => (
					<a
						key={item.name}
						href={item.href}
						className="text-lg font-semibold leading-6 text-white"
						target="_blank"
					>
						{item.name}
					</a>
				))}
			</div>
			<div className="flex items-center gap-x-2">
				<Link href={'/'}>
					<Button
						variant="outline"
						className="rounded-full"
						onClick={() => connect({ connector: injected() })}
					>
						Connect Wallet
					</Button>
				</Link>
			</div>
		</nav>
	);
};
