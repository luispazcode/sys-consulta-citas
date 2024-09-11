"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ConsultAppointmentForm } from "./ConsultAppointmentForm";

export const ConsultCard = () => {
	return (
		<Card>
			<Card className='bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden'>
				<CardHeader className='bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white'>
					<CardTitle className='text-2xl font-bold'>
						Consulta tus Citas
					</CardTitle>
					<CardDescription className='text-teal-100'>
						Ingresa tu DNI para ver tus citas programadas.
					</CardDescription>
				</CardHeader>
				<CardContent className='p-6'>
					<ConsultAppointmentForm />
				</CardContent>
			</Card>
		</Card>
	);
};
