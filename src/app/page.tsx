import { Hreo } from '@/components/hero';
import { LandingContent } from '@/components/landing-content';
import { Navbar } from '@/components/navbar';

export default function Home() {
	return (
		<main className="h-full overflow-auto bg-[#111827]">
			<div className="mx-auto h-full max-w-screen-xl">
				<Navbar />
				<Hreo />
				<LandingContent />
			</div>
		</main>
	);
}
