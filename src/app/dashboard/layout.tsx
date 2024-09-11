import { Sidebar } from "@/components/global";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen bg-gray-100 dark:bg-gray-900 flex'>
			{/* Sidebar */}
			<Sidebar />
			{/* Main content */}
			<main className='flex-1 p-8'>
				<div>{children}</div>
			</main>
		</div>
	);
}
