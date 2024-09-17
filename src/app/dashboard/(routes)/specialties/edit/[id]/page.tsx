import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigLeftDashIcon } from "lucide-react";
import Link from "next/link";
import { EditSpecialtyForm } from "./ui/EditSpecialtyForm";
import { getSpecialtyById } from "@/actions";

interface Props {
	params: {
		id: string;
	};
}

export default async function EditSpecialtyPage({ params }: Props) {
	const { ok, data: specialty } = await getSpecialtyById(params.id);
	if (!ok) {
		<div>
			Error al cargar información de la especialidad, recargue el sistema
		</div>;
	}
	return (
		<>
			<div className='flex justify-end'>
				<Button variant='default' asChild>
					<Link
						href='/dashboard/specialties'
						className='flex items-center gap-1 font-medium'
					>
						<ArrowBigLeftDashIcon />
						<span className='text-base'>Regresar</span>
					</Link>
				</Button>
			</div>
			<section className='w-full grid place-items-center mt-20'>
				<Card>
					<CardHeader>
						<CardTitle className='text-center'>
							Editar información de la especialidad
						</CardTitle>
					</CardHeader>
					<CardContent>
						<EditSpecialtyForm specialty={specialty!} />
					</CardContent>
				</Card>
			</section>
		</>
	);
}
