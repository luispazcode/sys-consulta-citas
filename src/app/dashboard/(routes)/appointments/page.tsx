import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { SearchIcon } from "lucide-react";
import { DialogAddAppointment } from "./ui/DialogAddAppointment";
import {
	getAppointments,
	getDoctors,
	getPatients,
	getSpecialties,
} from "@/actions";

export default async function AppointmenstPage() {
	const { ok, data: appointments, message } = await getAppointments();

	const results = await Promise.allSettled([
		getPatients(),
		getSpecialties(),
		getDoctors(),
	]);

	const patients =
		results[0].status === "fulfilled" ? results[0].value.data : [];
	const specialties =
		results[1].status === "fulfilled" ? results[1].value.data : [];
	const doctors =
		results[2].status === "fulfilled" ? results[2].value.data : [];

	return (
		<section>
			<Card className='w-full'>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle className='text-2xl font-bold'>Gestión de citas</CardTitle>
					<DialogAddAppointment
						patients={patients}
						specialties={specialties}
						doctors={doctors}
					/>
					{/* DIalog */}
				</CardHeader>
				<CardContent>
					<div className='mb-4'>
						<Label htmlFor='search' className='sr-only'>
							Buscar
						</Label>
						<div className='relative'>
							<SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
							<Input
								id='search'
								placeholder='Buscar citas...'
								className='pl-10 w-full'
							/>
						</div>
					</div>
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Id cita</TableHead>
									<TableHead>Paciente</TableHead>
									<TableHead>Fecha programada</TableHead>
									<TableHead>Hora</TableHead>
									<TableHead>Doctor</TableHead>
									<TableHead>Especialidad</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{!ok ? (
									<p>{message}</p>
								) : (
									appointments.map((appointment) => (
										<TableRow key={appointment.id}>
											<TableCell>
												{appointment.id.slice(-6).toUpperCase()}
											</TableCell>
											<TableCell>{appointment.patient.fullName}</TableCell>
											<TableCell>
												{appointment.scheduledDate.toLocaleDateString()}
											</TableCell>
											<TableCell>{appointment.scheduledTime}</TableCell>
											<TableCell>{appointment.doctor.fullName}</TableCell>
											<TableCell>{appointment.service.name}</TableCell>
											<TableCell>
												<Button variant='outline' size='sm' className='mr-2'>
													Editar
												</Button>
												<Button
													variant='outline'
													size='sm'
													className='bg-red-100 text-red-600 hover:bg-red-200'
												>
													Eliminar
												</Button>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
