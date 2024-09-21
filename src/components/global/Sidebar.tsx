"use client";
import { logout } from "@/actions";
import { Button } from "@/components/ui/button";
import {
	BuildingIcon,
	CalendarIcon,
	Loader2,
	LogOutIcon,
	UserIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const routes = [
	{
		name: "Citas",
		icon: CalendarIcon,
		slug: "appointments",
	},
	{
		name: "Especialidades",
		icon: BuildingIcon,
		slug: "specialties",
	},
	{
		name: "Doctores",
		icon: UserIcon,
		slug: "doctors",
	},
	{
		name: "Pacientes",
		icon: UserIcon,
		slug: "patients",
	},
];

export const Sidebar = () => {
	const pathname = usePathname();
	const [isSigningOut, setIsSigningOut] = useState(false);

	const handleLogout = async () => {
		setIsSigningOut(true);
		await logout();
		setIsSigningOut(false);
		// window.location.replace("/auth/login");
	};

	const { data: session } = useSession();
	return (
		<aside className='w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col justify-between'>
			<div className='p-4'>
				<div className='flex items-center mb-6'>
					<CalendarIcon className='h-8 w-8 text-teal-600 dark:text-teal-400 mr-3' />
					<span className='font-bold text-xl text-gray-900 dark:text-white'>
						Dashboard
					</span>
				</div>
				<div className='py-4'>
					<div className='flex flex-col items-center gap-2 mb-6'>
						<div className='bg-teal-600 h-20 w-20 rounded-full flex items-center justify-center mx-auto p-2'>
							<UserIcon className='h-12 w-12 text-white' />
						</div>
						<p>
							<span className='font-semibold'>User:</span> {session?.user?.name}
						</p>
						<p>
							<span className='font-semibold'>Role:</span> {session?.user?.role}
						</p>
					</div>
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
				<Button
					variant='outline'
					className='w-full justify-start'
					onClick={handleLogout}
					disabled={isSigningOut}
				>
					{isSigningOut && session?.user ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Cerrando sesión
						</>
					) : (
						<>
							<LogOutIcon className='mr-2 h-4 w-4' />
							Cerrar Sesión
						</>
					)}
				</Button>
			</div>
		</aside>
	);
};
