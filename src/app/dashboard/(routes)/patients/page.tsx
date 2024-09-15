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
import { DialogAddPatient } from "./ui/DialogAddPatient";
import { getPatients } from "@/actions";

export default async function PatientsPage() {
	const { ok, data: patients, message } = await getPatients();
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
									<TableHead>DNI</TableHead>
									<TableHead>Historia</TableHead>
									<TableHead>Cuenta</TableHead>
									<TableHead>Teléfono</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{!ok ? (
									<p>{message}</p>
								) : (
									patients.map((patient) => (
										<TableRow key={patient.id}>
											<TableCell>{patient.fullName}</TableCell>
											<TableCell>{patient.id}</TableCell>
											<TableCell>{patient.medicalHistory}</TableCell>
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
