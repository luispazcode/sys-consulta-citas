import { Footer, Header } from "@/components/global";
import { Toaster } from "@/components/ui/toaster";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='grid grid-rows-[auto_1fr_auto] min-h-dvh'>
			<Header />
			{children}
			<Toaster />
			<Footer />
		</div>
	);
}
