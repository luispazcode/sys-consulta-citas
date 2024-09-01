"use client";
import { Button } from "@/components/ui/button";
import { BuildingIcon, CalendarIcon, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
	{
		name: "Citas",
		icon: CalendarIcon,
		slug: "appointments",
	},
	{
		name: "Departamentos",
		icon: BuildingIcon,
		slug: "specialties",
	},
	{
		name: "Doctores",
		icon: UserIcon,
		slug: "doctors",
	},
];

export const Sidebar = () => {
	const pathname = usePathname();

	return (
		<aside className='w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col justify-between'>
			<div className='p-4'>
				<div className='flex items-center mb-6'>
					<CalendarIcon className='h-8 w-8 text-teal-600 dark:text-teal-400 mr-3' />
					<span className='font-bold text-xl text-gray-900 dark:text-white'>
						Dashboard
					</span>
				</div>
				<nav className='space-y-2'>
					{routes.map((route) => (
						<Link href={`/dashboard/${route.slug}`} key={route.name}>
							<Button
								variant={`${
									pathname.includes(route.slug) ? "default" : "ghost"
								}`}
								className='w-full justify-start'
							>
								<route.icon className='mr-2 h-4 w-4' />
								{route.name}
							</Button>
						</Link>
					))}
				</nav>
			</div>
			<div className='p-4'>
				<Link href='/auth/login' className='w-full'>
					<Button variant='outline' className='w-full justify-start'>
						<LogOutIcon className='mr-2 h-4 w-4' />
						Cerrar Sesión
					</Button>
				</Link>
			</div>
		</aside>
	);
};
