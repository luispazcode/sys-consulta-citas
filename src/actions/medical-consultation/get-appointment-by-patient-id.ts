"use server";

import prisma from "@/lib/prisma";

export const getAppointmentsByPatientId = async (patientId: string) => {
	try {
		const appointments = await prisma.appointment.findMany({
			where: {
				patientId: patientId,
			},
			include: {
				patient: {
					select: {
						fullName: true,
					},
				},
				doctor: {
					select: {
						fullName: true,
					},
				},
				service: {
					select: {
						name: true,
					},
				},
			},
		});
		if (appointments.length === 0) {
			return {
				ok: false,
				message: "No hay citas para este paciente, intente con otro DNI",
				data: null,
			};
		}
		return {
			ok: true,
			message: "Citas obtenidas correctamente",
			data: appointments,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Error al obtener las citas del paciente, intente nuevamente",
		};
	}
};
