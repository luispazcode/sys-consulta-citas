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
import { PlusIcon, SearchIcon } from "lucide-react";
import { DialogAddAppointment } from "./ui/DialogAddAppointment";

const appointments = [
	{
		id: 1,
		patientName: "Juan Pérez",
		appointmentDate: "2023-07-15",
		appointmentTime: "10:30",
		doctorName: "Dra. María Rodríguez",
		department: "Cardiología",
	},
	{
		id: 2,
		patientName: "María Gómez",
		appointmentDate: "2023-07-15",
		appointmentTime: "11:30",
		doctorName: "Dr. Juan López",
		department: "Neurología",
	},
	{
		id: 3,
		patientName: "Pedro Martínez",
		appointmentDate: "2023-07-15",
		appointmentTime: "12:30",
		doctorName: "Dra. Ana Pérez",
		department: "Pediatría",
	},
];

export default function AppointmenstPage() {
	return (
		<section>
			<Card className='w-full'>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle className='text-2xl font-bold'>Gestión de citas</CardTitle>
					{/* <Button className='bg-teal-600 hover:bg-teal-700 text-white'>
						<PlusIcon className='w-4 h-4 mr-2' />
						Nueva Cita
					</Button> */}
					<DialogAddAppointment />
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
									<TableHead>Paciente</TableHead>
									<TableHead>Fecha</TableHead>
									<TableHead>Hora</TableHead>
									<TableHead>Doctor</TableHead>
									<TableHead>Departamento</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{appointments.map((appointment) => (
									<TableRow key={appointment.id}>
										<TableCell>{appointment.patientName}</TableCell>
										<TableCell>{appointment.appointmentDate}</TableCell>
										<TableCell>{appointment.appointmentTime}</TableCell>
										<TableCell>{appointment.doctorName}</TableCell>
										<TableCell>{appointment.department}</TableCell>
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
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
