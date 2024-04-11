import { Hreo } from '@/components/hero';
import { Navbar } from '@/components/navbar';
import Image from 'next/image';

export default function Home() {
	return (
		<main className="h-full overflow-auto bg-[#111827]">
			<div className="mx-auto h-full max-w-screen-xl">
				<Navbar />
				<Hreo />
			</div>
		</main>
	);
}
