import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { PlusIcon, SearchIcon } from "lucide-react";
import { DialogAddDoctor } from "./ui/DialogAddDoctor";

const doctors = [
	{
		id: 1,
		name: "Dr. Juan Pérez",
		speciality: "Cardiología",
		email: "juan.perez@hospital.com",
		phone: "123-456-7890",
		department: "Cardiología",
	},
	{
		id: 2,
		name: "Dra. María Rodríguez",
		speciality: "Neurología",
		email: "maria.roriguez@hospital.com",
		phone: "123-456-7890",
		department: "Neurología",
	},
	{
		id: 3,
		name: "Dr. Pedro Gómez",
		speciality: "Pediatría",
		email: "pedro.gomez@hospital.com",
		phone: "123-456-7890",
		department: "Pediatría",
	},
];

export default function DoctorsPage() {
	return (
		<section>
			<Card className='w-full'>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle className='text-2xl font-bold'>Doctores</CardTitle>
					<DialogAddDoctor />
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
								placeholder='Buscar doctores...'
								className='pl-10 w-full'
							/>
						</div>
					</div>
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nombre</TableHead>
									<TableHead>Especialidad</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Teléfono</TableHead>
									<TableHead>Departamento</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{doctors.map((doctor) => (
									<TableRow key={doctor.id}>
										<TableCell>{doctor.name}</TableCell>
										<TableCell>{doctor.speciality}</TableCell>
										<TableCell>{doctor.email}</TableCell>
										<TableCell>{doctor.phone}</TableCell>
										<TableCell>{doctor.department}</TableCell>
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
