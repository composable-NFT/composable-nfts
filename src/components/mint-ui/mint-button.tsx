'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Loading } from '@/components/loading';
import { useModalStore } from '@/store/useModalStore';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

const sleep = (time: number) => (new Promise(r => setTimeout(r, time)))

const abi = [{"type":"function","name":"mintNft","inputs":[],"outputs":[],"stateMutability":"nonpayable"}]

// sepolia
const contractAddress = '0x5EcBC930C89AA39BB57534271324A4Cd6B81d4d7';

type PinataMetaData = {
	metaData: string,
	img: string,
}

export const MintButton = ({ metaData, img }: PinataMetaData) => {
	const [isLoading, setIsLoading] = useState(false);
	const [loadingText, setLoadingText] = useState('');
	const { toast } = useToast();
	const { isShow, setIsShow } = useModalStore();

	const [cid, setCid] = useState("");

	// 链上交互 START
	const { data: hash, error, isPending, writeContract } = useWriteContract();
	const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
	useEffect(() => {
		console.log('交易状态发生改变');
		console.log(hash);
		console.log(error);
		console.log(isPending);
		console.log(isConfirming);
		console.log(isConfirmed);
		if (isPending) {
			setLoadingText('NFT上链中')
		} else if (isConfirmed) {
			setLoadingText('交易已完成')
			mintFinished(null)
		} else if (isConfirming) {
			// 交易确认中
			setLoadingText('交易确认中')
			setTimeout(()=>{
				mintFinished(null)
			},3000)
		} else if (error) {
			console.log(error);
			setLoadingText("NFT上链失败：" + error.name)
			mintFinished(error.name)
		}

	}, [isPending, error, isConfirming, isConfirmed])
	// 链上交互 END 

	const uploadFile = async () => {
		const filePath = img;
		console.log(metaData, img);
		const fileStream = (await fetch(filePath));
		const type = fileStream.headers.get('Content-Type') || '';
		const buffer = await fileStream.arrayBuffer();
		const file = new File([buffer], filePath.split('/').pop() || 'image', { type });
		const data = new FormData();
		data.set("file", file);
		data.set("metadata", metaData);
		console.log('START upload');
		const res = await fetch("/api/files", {
			method: "POST",
			body: data,
		});
		const resData = await res.json();
		setCid(resData.IpfsHash);

	};

	const handleMint = async () => {
		setIsLoading(true);
		setLoadingText('NFT数据上传中...')
		try {
			await uploadFile();
			await sleep(3000);
			// 获取cid 保存至区块链中
			setLoadingText('NFT数据上链中...')
			writeContract({
				abi,
				address: contractAddress,
				functionName: 'mintNft',
				// args: [cid],
			})
		}
		catch (e) {
			return mintFinished(e)
		}

	};

	const mintFinished = (error: any) => {
		setLoadingText('')
		setIsShow(false);
		setIsLoading(false);
		if (error) {
			return toast({
				title: 'Something went wrong 💥' + error
			});
		} else {
			return toast({
				title: 'Mint successfully 🎉',
				description: (
					<a
						href={`https://sepolia.etherscan.io/tx/${hash}`}
						className="hover:underline"
						target="_blank"
					>
						View on explorer 🔗
					</a>
				),
				action: <ToastAction altText="Confirm">Confirm ✨</ToastAction>
			});
		}
	}

	return (
		<div>
			<Button
				variant="premium"
				className="mt-4 rounded-full p-4  font-semibold md:p-6 md:text-lg"
				onClick={handleMint}
			>
				Start Mint!
			</Button>
			{isLoading && <Loading loadingText={loadingText} />}
		</div>
	)
}