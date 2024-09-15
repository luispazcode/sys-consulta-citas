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
import { SearchIcon } from "lucide-react";
import { DialogAddDoctor } from "./ui/DialogAddDoctor";
import { getDoctors, getSpecialties } from "@/actions";

export default async function DoctorsPage() {
	const { ok, data } = await getSpecialties();
	const specialties = !ok ? [] : data;
	const { ok: resp, data: doctors, message } = await getDoctors();
	return (
		<section>
			<Card className='w-full'>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle className='text-2xl font-bold'>Doctores</CardTitle>
					<DialogAddDoctor specialties={specialties} />
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
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{!resp ? (
									<p>{message}</p>
								) : (
									doctors.map((doctor) => (
										<TableRow key={doctor.id}>
											<TableCell>{doctor.fullName}</TableCell>
											<TableCell>{doctor.specialty.name}</TableCell>
											<TableCell>{doctor.email}</TableCell>
											<TableCell>{doctor.phone}</TableCell>
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
