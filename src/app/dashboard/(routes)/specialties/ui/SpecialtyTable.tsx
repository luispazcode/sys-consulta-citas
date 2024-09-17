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
								<Button
									variant='outline'
									size='sm'
									className='bg-red-100 text-red-600 hover:bg-red-200'
									onClick={
										() =>
											console.log(
												`Eliminar especialidad con el id ${specialty.id}`
											)
										// Server action to delete specialty
									}
								>
									Eliminar
								</Button>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};
