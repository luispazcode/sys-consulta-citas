import {
	getAppointmentById,
	getDoctors,
	getPatients,
	getSpecialties,
} from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigLeftDashIcon } from "lucide-react";
import Link from "next/link";
import { EditAppointmentForm } from "./ui/EditAppointmentForm";

interface Props {
	params: {
		id: string;
	};
}

export default async function EditAppointmentPage({ params }: Props) {
	const {
		ok,
		data: appointment,
		message,
	} = await getAppointmentById(params.id);
	if (!ok) {
		<div>Error al cargar información de la cita, recargue el sistema</div>;
	}
	const results = await Promise.allSettled([
		getPatients(),
		getSpecialties(),
		getDoctors(),
	]);
	const patients =
		results[0].status === "fulfilled" ? results[0].value.data : [];
	const specialties =
		results[1].status === "fulfilled" ? results[1].value.data : [];
	const doctors =
		results[2].status === "fulfilled" ? results[2].value.data : [];
	return (
		<>
			<div className='flex justify-end'>
				<Button variant='default' asChild>
					<Link
						href='/dashboard/appointments'
						className='flex items-center gap-1 font-medium'
					>
						<ArrowBigLeftDashIcon />
						<span className='text-base'>Regresar</span>
					</Link>
				</Button>
			</div>
			<section className='w-full grid place-items-center mt-10'>
				<Card>
					<CardHeader>
						<CardTitle className='text-center'>
							Editar información de la especialidad
						</CardTitle>
					</CardHeader>
					<CardContent>
						<EditAppointmentForm
							appointment={appointment!}
							patients={patients}
							specialties={specialties}
							doctors={doctors}
						/>
					</CardContent>
				</Card>
			</section>
		</>
	);
}
