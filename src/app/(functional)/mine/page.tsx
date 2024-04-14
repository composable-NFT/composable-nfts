// src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`}
'use client'
import { log } from 'console';
import Link from 'next/link';
import { useState } from 'react'
import { useReadContract } from 'wagmi'

// sepolia
const abi = [{"type":"function","name":"balanceOf","inputs":[{"name":"owner","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"}];
const contractAddress = '0x5EcBC930C89AA39BB57534271324A4Cd6B81d4d7';

const Mine = () => {
    const [nfts, setNfts] = useState([])
    const { data: balance } = useReadContract({
        abi,
        address: contractAddress,
        functionName: 'balanceOf',
    })

    return (
        <main className="h-screen w-screen overflow-auto bg-[#111827] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span>我的NFT：{balance + ''}</span>Ò
            {/* {
                balance && balance.map(r => {
                    return (<Link href={`/mine/${r}`} className='my-4' key={r}>{r}</Link>)
                })
            } */}
        </main>
    );
};

export default Mine;
