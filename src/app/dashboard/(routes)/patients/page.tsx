import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { PlusIcon } from "lucide-react";
import { DialogAddPatient } from "./ui/DialogAddPatient";

const patients = [
	{
		id: 82738273,
		name: "Juan Pérez",
		age: 25,
		historyNumber: 123456,
		accountNumber: 1231231231,
		phone: "123-456-7890",
		email: "jperez@gmail.com",
	},
	{
		id: 82738274,
		name: "María Rodríguez",
		age: 30,
		historyNumber: 123457,
		accountNumber: 1231231232,
		phone: "123-456-7890",
		email: "mrodriguez22@gmail.com",
	},
	{
		id: 82738275,
		name: "Pedro Gómez",
		age: 35,
		historyNumber: 123458,
		accountNumber: 1231231233,
		phone: "123-456-7890",
		email: "pgomez@gmail.com",
	},
];

export default function PatientsPage() {
	return (
		<section>
			<Card className='w-full'>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle className='text-2xl font-bold'>Pacientes</CardTitle>
					<DialogAddPatient />
				</CardHeader>
				<CardContent>
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nombre</TableHead>
									<TableHead>Edad</TableHead>
									<TableHead>Historia</TableHead>
									<TableHead>Cuenta</TableHead>
									<TableHead>Teléfono</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{patients.map((patient) => (
									<TableRow key={patient.id}>
										<TableCell>{patient.name}</TableCell>
										<TableCell>{patient.age}</TableCell>
										<TableCell>{patient.historyNumber}</TableCell>
										<TableCell>{patient.accountNumber}</TableCell>
										<TableCell>{patient.phone}</TableCell>
										<TableCell>{patient.email}</TableCell>
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
