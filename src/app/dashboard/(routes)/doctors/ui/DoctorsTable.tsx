"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { DoctorWithSpecialty } from "@/interfaces";
import Link from "next/link";

interface Props {
	response: boolean;
	doctors: DoctorWithSpecialty[];
	message: string;
}

export const DoctorsTable = ({ response, doctors, message }: Props) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Especialidad</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Teléfono</TableHead>
					<TableHead>Acciones</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{!response ? (
					<p>{message}</p>
				) : (
					doctors.map((doctor) => (
						<TableRow key={doctor.id}>
							<TableCell>{doctor.fullName}</TableCell>
							<TableCell>{doctor.specialty.name}</TableCell>
							<TableCell>{doctor.email}</TableCell>
							<TableCell>{doctor.phone}</TableCell>
							<TableCell>
								<Button variant='outline' size='sm' className='mr-2' asChild>
									<Link href={`/dashboard/doctors/edit/${doctor.id}`}>
										Editar
									</Link>
								</Button>
								{/* <Button
									variant='outline'
									size='sm'
									className='bg-red-100 text-red-600 hover:bg-red-200'
									onClick={
										() => console.log(`Eliminar doctor con el id ${doctor.id}`)
										// Server action to delete doctor
									}
								>
									Eliminar
								</Button> */}
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};
