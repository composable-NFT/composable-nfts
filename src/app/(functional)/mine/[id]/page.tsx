// src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${cid}`}

import Image from "next/image";

const Mine = ({ params } : any) => {
	const nftId = params.id;
	return (
		<main className="h-full overflow-auto bg-[#111827] flex items-center justify-center">
			<Image src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${nftId}`} alt='NFT' width={200} height={200} />
		</main>
	);
};

export default Mine;
