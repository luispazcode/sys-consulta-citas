import { getAppointmentById } from "@/actions";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	BuildingIcon,
	CalendarIcon,
	ClockIcon,
	FileTextIcon,
	MapPinIcon,
	UserIcon,
} from "lucide-react";
import Link from "next/link";

interface Props {
	params: {
		id: string;
	};
}

export default async function AppointmentPage({ params }: Props) {
	const {
		ok,
		data: appointment,
		message,
	} = await getAppointmentById(params.id);
	if (!ok) {
		return <p>{message}</p>;
	}

	return (
		<main className='template-container py-10 w-full'>
			<Card className='max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden'>
				<CardHeader className='bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white'>
					<CardTitle className='text-2xl font-bold'>
						Detalles de la Cita
					</CardTitle>
				</CardHeader>
				<CardContent className='p-6 space-y-6'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Fecha de programación */}
						<div className='flex items-center'>
							<CalendarIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-3' />
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									Fecha y Hora
								</h3>
								<p className='text-gray-600 dark:text-gray-300'>
									{appointment!.scheduledDate.toLocaleDateString()} a las{" "}
									{appointment!.scheduledTime}
								</p>
							</div>
						</div>
						{/* Doctor */}
						<div className='flex items-center'>
							<UserIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-3' />
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									Doctor
								</h3>
								<p className='text-gray-600 dark:text-gray-300'>
									{appointment!.doctor.fullName}
								</p>
							</div>
						</div>
						{/* Especialidad // Servicio */}
						<div className='flex items-center'>
							<BuildingIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-3' />
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									Servicio | Especialidad
								</h3>
								<p className='text-gray-600 dark:text-gray-300'>
									{appointment!.service.name}
								</p>
							</div>
						</div>
						{/* Número de consultorio */}
						<div className='flex items-start'>
							<MapPinIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-3 mt-1' />
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									Número de consultorio
								</h3>
								<p className='text-gray-600 dark:text-gray-300'>
									{appointment!.officeNumber}
								</p>
							</div>
						</div>
						{/* Número de cupo */}
						<div className='flex items-center'>
							<FileTextIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-3' />
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									Cupo
								</h3>
								<p className='text-gray-600 dark:text-gray-300'>
									{appointment!.cupo}
								</p>
							</div>
						</div>
						{/* Nro Historia */}
						<div className='flex items-center'>
							<FileTextIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-3' />
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									Nro. Historia
								</h3>
								<p className='text-gray-600 dark:text-gray-300'>
									{appointment?.patient.medicalHistory ||
										"No tiene historia clínica"}
								</p>
							</div>
						</div>
						{/* DNI del paciente */}
						<div className='flex items-start'>
							<UserIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-3 mt-1' />
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									DNI del paciente
								</h3>
								<p className='text-gray-600 dark:text-gray-300'>
									{appointment!.patient.id}
								</p>
							</div>
						</div>
						{/* Nombres completos del paciente */}
						<div className='flex items-start'>
							<UserIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-3 mt-1' />
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									Nombres del paciente
								</h3>
								<p className='text-gray-600 dark:text-gray-300'>
									{appointment!.patient.fullName}
								</p>
							</div>
						</div>
						{/* Turno de la cita */}
						<div className='flex items-center'>
							<ClockIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-3' />
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									Turno
								</h3>
								<p className='text-gray-600 dark:text-gray-300'>
									{appointment!.shift || "No tiene turno"}
								</p>
							</div>
						</div>
						{/* SIS ó Interconsulta */}
						<div className='flex items-center'>
							<FileTextIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-3' />
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									SIS
								</h3>
								<p className='text-gray-600 dark:text-gray-300'>
									{appointment?.insurance === "sis" ? "Sí" : "No"}
								</p>
							</div>
						</div>
						{/* isParticular? */}
						<div className='flex items-center'>
							<FileTextIcon className='w-6 h-6 text-teal-600 dark:text-teal-400 mr-3' />
							<div>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									Particular
								</h3>
								<p className='text-gray-600 dark:text-gray-300'>
									{appointment?.insurance === "particular" ? "Sí" : "No"}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter className='bg-gray-50 dark:bg-gray-700 p-6'>
					<Button
						asChild
						className='w-full bg-teal-600 hover:bg-teal-700 text-white'
					>
						<Link href='/'>Volver</Link>
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
