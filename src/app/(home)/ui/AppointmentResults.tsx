"use client";

import { useMedicalConsultationStore } from "@/store";
import { CardResult } from "./CardResult";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export const AppointmentResults = () => {
	const {
		hasAppointments,
		appointments,
		setHasAppointments,
		setAppointments,
		hasConsulted,
		setHasConsulted,
	} = useMedicalConsultationStore((state) => state);

	const handleCleanResults = () => {
		setHasAppointments(false);
		setAppointments([]);
		setHasConsulted(false);
	};

	if (!hasConsulted && !hasAppointments) {
		return;
	}

	// if (hasConsulted && !hasAppointments) {
	// 	return (
	// 		<div className='flex flex-col items-center justify-center gap-4 mt-12'>
	// 			<p className='text-gray-500 text-sm'>
	// 				No hay citas disponibles para este paciente
	// 			</p>
	// 		</div>
	// 	);
	// }

	return (
		<section className='mt-12 flex flex-col gap-4'>
			<div className='flex justify-end'>
				<Button variant='destructive' onClick={handleCleanResults}>
					<Trash2 className='mr-2 h-4 w-4' />
					Limpiar resultados
				</Button>
			</div>
			<div className='bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden'>
				<div className='bg-gradient-to-r from-teal-600 to-teal-700 p-6'>
					<h2 className='text-2xl font-bold text-white'>Tus Citas</h2>
				</div>
				{appointments.map((appointment) => (
					<CardResult key={appointment.id} appointment={appointment} />
				))}
			</div>
		</section>
	);
};
