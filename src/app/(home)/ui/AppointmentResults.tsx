import { Button } from "@/components/ui/button";
import { BuildingIcon, CalendarIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export const AppointmentResults = () => {
	return (
		<div className='mt-12 bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden'>
			<div className='bg-gradient-to-r from-teal-600 to-teal-700 p-6'>
				<h2 className='text-2xl font-bold text-white'>Tus Citas</h2>
			</div>
			<div className='p-6 appointment-card'>
				<div className='mb-8 last:mb-0 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-md'>
					<div className='flex items-center mb-4'>
						<CalendarIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-2' />
						<span className='text-lg font-semibold text-gray-800 dark:text-white'>
							Programada para: 2023-07-15 a las 10:30
						</span>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div className='flex items-center'>
							<UserIcon className='w-5 h-5 text-gray-600 dark:text-gray-400 mr-2' />
							<span className='text-gray-700 dark:text-gray-300'>
								Doctor: Dra. María Rodríguez
							</span>
						</div>
						<div className='flex items-center'>
							<BuildingIcon className='w-5 h-5 text-gray-600 dark:text-gray-400 mr-2' />
							<span className='text-gray-700 dark:text-gray-300'>
								Especialidad: Cardiología
							</span>
						</div>
						<div className='flex items-center'>
							<BuildingIcon className='w-5 h-5 text-gray-600 dark:text-gray-400 mr-2' />
							<span className='text-gray-700 dark:text-gray-300'>Cupo: 15</span>
						</div>
					</div>

					<div className='mt-6'>
						<Button
							variant='outline'
							asChild
							className='w-full md:w-auto border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-white transition duration-300 ease-in-out'
						>
							<Link href={`/appointment/019283092jlkjlkj-323908`}>
								Ver más detalles
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
