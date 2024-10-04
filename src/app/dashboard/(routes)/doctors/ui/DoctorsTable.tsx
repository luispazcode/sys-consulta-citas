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
import { DialogDeleteDoctor } from "./DialogDeleteDoctor";

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
								<DialogDeleteDoctor doctorId={doctor.id} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};
