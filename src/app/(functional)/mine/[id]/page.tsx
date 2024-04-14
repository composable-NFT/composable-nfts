// src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`}

const MineNFT = ({ params }: any) => {
	const nftId = params.id;
	return (
		<main className="h-full overflow-auto bg-[#111827] flex items-center justify-center">
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${nftId}`} alt='NFT' className='mx-auto w-1/2'/>
		</main>
	);
};

export default MineNFT;
