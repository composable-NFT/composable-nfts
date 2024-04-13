'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Loading } from '@/components/loading';
import { useModalStore } from '@/store/useModalStore';

export const MintButton = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();
	const { isShow, setIsShow } = useModalStore();

	const handleMint = () => {
		console.log('jjj');

		setIsLoading(true);
		try {
			const txSignature = '88888';
			toast({
				title: 'Mint successfully 🎉',
				description: (
					<a
						href={`https://solscan.io/tx/${txSignature}?cluster=devnet`}
						className="hover:underline"
						target="_blank"
					>
						View on explorer 🔗
					</a>
				),
				action: <ToastAction altText="Confirm">Confirm ✨</ToastAction>
			});
			setIsShow(false);
			console.log('Deposit transaction:', txSignature);
		} catch (error) {
			toast({
				title: 'Something went wrong 💥'
			});
			console.error('Error during transaction or setup:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<Button
				variant="premium"
				className="mt-4 rounded-full p-4  font-semibold md:p-6 md:text-lg"
				onClick={handleMint}
			>
				Start Mint!
			</Button>
			{isLoading && <Loading />}
		</div>
	);
};
