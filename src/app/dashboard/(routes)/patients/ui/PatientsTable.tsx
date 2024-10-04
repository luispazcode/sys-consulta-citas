"use client";

import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Patient } from "@/interfaces";
import Link from "next/link";
import { DialogDeletePatient } from "./DialogDeletePatient";

interface Props {
	response: boolean;
	patients: Patient[];
	message?: string;
}

export const PatientsTable = ({ response, patients, message }: Props) => {
	return (
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
				{!response ? (
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
								<Button variant='outline' size='sm' className='mr-2' asChild>
									<Link href={`/dashboard/patients/edit/${patient.id}`}>
										Editar
									</Link>
								</Button>

								<DialogDeletePatient patientId={patient.id} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};
