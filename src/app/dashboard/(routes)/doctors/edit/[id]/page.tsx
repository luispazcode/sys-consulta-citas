import { getDoctorById, getSpecialties } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigLeftDashIcon } from "lucide-react";
import Link from "next/link";
import { EditDoctorForm } from "./ui/EditDoctorForm";

interface Props {
	params: {
		id: string;
	};
}

export default async function EditDoctorPage({ params }: Props) {
	const { ok, data: doctor, message } = await getDoctorById(params.id);
	const { data: specialties } = await getSpecialties();
	if (!ok) {
		<div>
			Error al cargar información del doctor, recargue el sistema.{" "}
			<p>{message}</p>
		</div>;
	}
	return (
		<>
			<div className='flex justify-end'>
				<Button variant='default' asChild>
					<Link
						href='/dashboard/doctors'
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
							Editar información del doctor
						</CardTitle>
					</CardHeader>
					<CardContent>
						<EditDoctorForm doctor={doctor!} specialties={specialties} />
					</CardContent>
				</Card>
			</section>
		</>
	);
}
