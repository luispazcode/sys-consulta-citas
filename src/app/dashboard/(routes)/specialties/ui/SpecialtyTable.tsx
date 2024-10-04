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
import { Specialty } from "@/interfaces";
import Link from "next/link";
import { DialogDeleteSpecialty } from "./DialogDeleteSpecialty";

export interface Props {
	specialties: Specialty[];
	ok: boolean;
	message?: string;
}

export const SpecialtyTable = ({ specialties, ok, message = "" }: Props) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nombre</TableHead>
					<TableHead>Descripción</TableHead>
					<TableHead>Acciones</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{!specialties && !ok ? (
					<p>{message}</p>
				) : (
					specialties.map((specialty) => (
						<TableRow key={specialty.id}>
							<TableCell>{specialty.name}</TableCell>
							<TableCell>{specialty.description}</TableCell>
							<TableCell>
								<Button variant='outline' size='sm' className='mr-2' asChild>
									<Link href={`/dashboard/specialties/edit/${specialty.id}`}>
										Editar
									</Link>
								</Button>
								<DialogDeleteSpecialty specialtyId={specialty.id} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};
