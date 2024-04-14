import { Hreo } from '@/components/hero';
import { LandingContent } from '@/components/landing-content';
import { Navbar } from '@/components/navbar';
import CardList from '@/components/carousel/CardList';
import { hotDropsData } from '@/constants/MockupData';

export default function Home() {
	return (
		<main className="h-full overflow-auto bg-[#111827]">
			<div className="mx-auto h-full max-w-screen-xl">
				<Navbar />
				<Hreo />
				<div id="home" className=" relative -mt-20">
					<div id="list-container" className="flex justify-center">
						<CardList list={hotDropsData} />
					</div>
				</div>
				<LandingContent />
			</div>
		</main>
	);
}
