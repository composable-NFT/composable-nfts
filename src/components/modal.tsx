import React, { useEffect } from 'react';
import shanghai from '../../public/shanghai.jpg';
import Image from 'next/image';
import { Button } from './ui/button';
import { MintButton } from './mint-ui/mint-button';
interface ModalProps {
	show: boolean;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
	// const [info, setInfo] = React.useState<any>();
	const [info, setInfo] = React.useState({});
	useEffect(() => {
		if (show) {
			setInfo(
				Math.random() < 0.5
					? {
							des: "Shanghai is the largest city in China by population and the largest city proper by population in the world. It is one of the four direct-controlled municipalities of the People's Republic of China, with a population of more than 24 million as of 2017. It is a global financial center and transport hub, with the world's busiest container port. Located in the Yangtze River Delta, it sits on the south edge of the estuary of the Yangtze in the middle portion of the East China coast. The municipality borders the provinces of Jiangsu and Zhejiang to the north, south and west, and is bounded to the east by the East China Sea.",
							src: '/shanghai.jpg',
							name: 'SHANGHAI'
						}
					: {
							des: "Beijing, alternatively romanized as Peking, is the capital of the People's Republic of China. It is the world's most populous capital city, with over 21 million residents within an administrative area of 16,410.5 km2. The city, located in Northern China, is governed as a municipality under the direct administration of the central government with 16 urban, suburban, and rural districts. Beijing is mostly surrounded by Hebei Province with the exception of neighboring Tianjin to the southeast; together, the three divisions form the Jingjinji megalopolis and the national capital region of China.",
							src: '/beijing.jpg',
							name: 'BEIJING'
						}
			);
		} else {
			setInfo({});
		}
	}, [show]);
	return (
		<div
			className={`fixed inset-0  z-30 scale-105 transform bg-black bg-opacity-50 ${show ? 'visible opacity-100' : 'invisible opacity-0'} transition-all duration-300`}
			onClick={onClose}
		>
			<div
				className="absolute left-1/2 top-1/2  z-50 flex w-4/5 max-w-lg -translate-x-1/2 -translate-y-1/2 transform items-center space-x-4 bg-white p-4"
				onClick={(e) => e.stopPropagation()}
			>
				{Object.keys(info).length !== 0 && (
					<Image
						className="w-1/2"
						// @ts-ignore
						src={info!.src}
						width={300}
						height={440}
						alt="Modal"
					/>
				)}
				<div>
					{/* @ts-ignore */}
					<p className="flex-grow text-black">{info?.name}</p>
					<div className=" text-start text-xs  font-normal text-gray-500">
						{/* @ts-ignore */}
						{info?.des}
					</div>
					{/* <Button
						variant="premium"
						className="mt-4 rounded-full p-4  font-semibold md:p-6 md:text-lg"
					>
						Start Mint!
					</Button> */}
					<MintButton />
				</div>
			</div>
		</div>
	);
};

export default Modal;
