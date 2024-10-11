export const dynamic = "force-dynamic";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogAddPatient } from "./ui/DialogAddPatient";
import { getPatients } from "@/actions";
import { PatientsTable } from "./ui/PatientsTable";

export default async function PatientsPage() {
	const { ok, data: patients, message } = await getPatients();
	return (
		<section>
			<Card className='w-full'>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle className='text-2xl font-bold'>Pacientes</CardTitle>
					<DialogAddPatient />
				</CardHeader>
				<CardContent>
					<div className='overflow-x-auto'>
						<PatientsTable
							response={ok}
							patients={patients}
							message={message}
						/>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
