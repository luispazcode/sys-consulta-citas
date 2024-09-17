import { getPatientById } from "@/actions";
import { EditPatientForm } from "./ui/EditPatientForm";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftDashIcon } from "lucide-react";

interface Props {
	params: {
		id: string;
	};
}

export default async function EditPatientPage({ params }: Props) {
	const { ok, data: patient } = await getPatientById(params.id);
	if (!ok) {
		<div>Error al cargar información del paciente, recargue el sistema</div>;
	}
	return (
		<>
			<div className='flex justify-end'>
				<Button variant='default' asChild>
					<Link
						href='/dashboard/patients'
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
							Editar información del paciente
						</CardTitle>
					</CardHeader>
					<CardContent>
						<EditPatientForm patient={patient!} />
					</CardContent>
				</Card>
			</section>
		</>
	);
}
