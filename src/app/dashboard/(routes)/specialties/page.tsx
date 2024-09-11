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
import { DialogAddSpecialty } from "./ui/DialogAddSpecialty";

const departments = [
	{
		id: 1,
		name: "Cardiología",
		description: "Especialidad en enfermedades del corazón",
	},
	{
		id: 2,
		name: "Neurología",
		description: "Especialidad en enfermedades del sistema nervioso",
	},
	{
		id: 3,
		name: "Pediatría",
		description: "Especialidad en atención a niños y adolescentes",
	},
];

export default function SpecialtiesPage() {
	return (
		<section>
			<Card className='w-full'>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle className='text-2xl font-bold'>Especialidades</CardTitle>
					<DialogAddSpecialty />
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
								placeholder='Buscar departamentos...'
								className='pl-10 w-full'
							/>
						</div>
					</div>
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nombre</TableHead>
									<TableHead>Descripción</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{departments.map((department) => (
									<TableRow key={department.id}>
										<TableCell>{department.name}</TableCell>
										<TableCell>{department.description}</TableCell>
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
