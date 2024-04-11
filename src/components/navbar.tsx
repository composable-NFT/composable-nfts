'use client';

import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const font = Montserrat({
	weight: '600',
	subsets: ['latin']
});

export const Navbar = () => {
	return (
		<nav className="flex items-center justify-between bg-transparent p-4">
			<Link href="/" className="flex items-center">
				<div className="relative mr-4 h-8 w-8">
					<Image width={64} height={64} alt="Logo" src="/logo1.jpg" priority sizes="" />
				</div>
				<h1 className={cn('text-2xl font-bold text-white', font.className)}>Palamedes</h1>
			</Link>
			<div className="flex items-center gap-x-2">
				<Link href={'/'}>
					<Button variant="outline" className="rounded-full">
						Wallet
					</Button>
				</Link>
			</div>
		</nav>
	);
};
