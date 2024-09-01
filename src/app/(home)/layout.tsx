import { Footer, Header } from "@/components/global";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='grid grid-rows-[auto_1fr_auto] min-h-dvh'>
			<Header />
			{children}
			<Footer />
		</div>
	);
}
