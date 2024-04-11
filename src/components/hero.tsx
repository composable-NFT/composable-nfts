'use client';

import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';
import { Button } from '@/components/ui/button';

export const Hreo = () => {
	return (
		<div className="space-y-5 py-36 text-center font-bold text-white">
			<div className="space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
				<h1>To make your NFT jounery</h1>
				<div className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
					<TypewriterComponent
						options={{
							strings: ['Composable!', 'Explore more.', 'Enjoy more.'],
							autoStart: true,
							loop: true
						}}
					/>
				</div>
			</div>
			<div className="text-sm font-light text-zinc-400 md:text-xl">
				Create your own Composable NFTs.
			</div>
			<div>
				<Link href="/mint">
					<Button
						variant="premium"
						className="rounded-full p-4 font-semibold md:p-6 md:text-lg"
					>
						Start Mint
					</Button>
				</Link>
			</div>
		</div>
	);
};
