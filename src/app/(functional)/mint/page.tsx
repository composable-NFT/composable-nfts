const mintPage = () => {
	return (
		<main className="h-full overflow-auto bg-[#111827]">
			<h1 className="text-white">Your NFTS</h1>

			<div className="grid grid-cols-3 gap-4">
				<div className="rounded-md bg-[#1F2937] p-4">
					<h2 className="text-white">NFT 1</h2>
					<p className="text-white">Description</p>
				</div>
				<div className="rounded-md bg-[#1F2937] p-4">
					<h2 className="text-white">NFT 2</h2>
					<p className="text-white">Description</p>
				</div>
				<div className="rounded-md bg-[#1F2937] p-4">
					<h2 className="text-white">NFT 3</h2>
					<p className="text-white">Description</p>
				</div>
			</div>
		</main>
	);
};

export default mintPage;
