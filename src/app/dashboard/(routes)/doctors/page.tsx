import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogAddDoctor } from "./ui/DialogAddDoctor";
import { getDoctors, getSpecialties } from "@/actions";
import { DoctorsTable } from "./ui/DoctorsTable";

export default async function DoctorsPage() {
	const { ok, data } = await getSpecialties();
	const specialties = !ok ? [] : data;
	const { ok: resp, data: doctors, message } = await getDoctors();
	console.log(doctors[0].specialty);
	return (
		<section>
			<Card className='w-full'>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle className='text-2xl font-bold'>Doctores</CardTitle>
					<DialogAddDoctor specialties={specialties} />
				</CardHeader>
				<CardContent>
					<div className='overflow-x-auto'>
						<DoctorsTable
							response={resp}
							doctors={doctors}
							message={message || ""}
						/>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
