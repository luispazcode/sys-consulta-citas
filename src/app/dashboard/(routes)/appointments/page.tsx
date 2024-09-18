import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Label } from "@radix-ui/react-label";
import { SearchIcon } from "lucide-react";
import { DialogAddAppointment } from "./ui/DialogAddAppointment";
import {
	getAppointments,
	getDoctors,
	getPatients,
	getSpecialties,
} from "@/actions";
import { AppointmentsTable } from "./ui/AppointmentsTable";

export default async function AppointmenstPage() {
	const { ok, data: appointments, message } = await getAppointments();

	if (!ok) {
		return <p>{message}</p>;
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
		<section>
			<Card className='w-full'>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle className='text-2xl font-bold'>Gestión de citas</CardTitle>
					<DialogAddAppointment
						patients={patients}
						specialties={specialties}
						doctors={doctors}
					/>
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
								placeholder='Buscar citas...'
								className='pl-10 w-full'
							/>
						</div>
					</div>
					<div className='overflow-x-auto'>
						<AppointmentsTable
							result={ok}
							appointments={appointments}
							message={message}
						/>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
