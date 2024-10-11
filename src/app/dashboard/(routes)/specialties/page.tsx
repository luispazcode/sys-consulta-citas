export const dynamic = "force-dynamic";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, SearchIcon } from "lucide-react";
import { DialogAddSpecialty } from "./ui/DialogAddSpecialty";
import { getSpecialties } from "@/actions";
import { SpecialtyTable } from "./ui/SpecialtyTable";

export default async function SpecialtiesPage() {
	const { ok, data: specialties, message } = await getSpecialties();
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
						<SpecialtyTable
							specialties={specialties}
							ok={ok}
							message={message}
						/>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
