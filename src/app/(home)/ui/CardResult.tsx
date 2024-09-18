import { BuildingIcon, CalendarIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppointmentTableItem } from "@/interfaces";

interface Props {
	appointment: AppointmentTableItem;
}

export const CardResult = ({ appointment }: Props) => {
	return (
		<div className='p-6 appointment-card'>
			<div className='mb-8 last:mb-0 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-md'>
				<div className='flex items-center mb-4'>
					<CalendarIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-2' />
					<span className='text-lg font-semibold text-gray-800 dark:text-white'>
						Programada para: {appointment.scheduledDate.toLocaleDateString()} a
						las {appointment.scheduledTime}
					</span>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='flex items-center'>
						<UserIcon className='w-5 h-5 text-gray-600 dark:text-gray-400 mr-2' />
						<span className='text-gray-700 dark:text-gray-300'>
							Paciente: {appointment.patient.fullName}
						</span>
					</div>
					<div className='flex items-center'>
						<UserIcon className='w-5 h-5 text-gray-600 dark:text-gray-400 mr-2' />
						<span className='text-gray-700 dark:text-gray-300'>
							Doctor: {appointment.doctor.fullName}
						</span>
					</div>
					<div className='flex items-center'>
						<BuildingIcon className='w-5 h-5 text-gray-600 dark:text-gray-400 mr-2' />
						<span className='text-gray-700 dark:text-gray-300'>
							Especialidad: {appointment.service.name}
						</span>
					</div>
					<div className='flex items-center'>
						<BuildingIcon className='w-5 h-5 text-gray-600 dark:text-gray-400 mr-2' />
						<span className='text-gray-700 dark:text-gray-300'>
							Cupo: {appointment.cupo}
						</span>
					</div>
				</div>

				<div className='mt-6'>
					<Button
						variant='outline'
						asChild
						className='w-full md:w-auto border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-400 dark:hover:text-white transition duration-300 ease-in-out'
					>
						<Link href={`/appointment/${appointment.id}`}>
							Ver más detalles
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
