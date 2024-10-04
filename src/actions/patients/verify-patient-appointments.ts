"use server";

import prisma from "@/lib/prisma";

export const verifyAppointments = async (id: string) => {
	try {
		const patientHasAppointments = await prisma.appointment.findMany({
			where: {
				patientId: id,
			},
		});
		if (patientHasAppointments.length > 0) {
			return {
				ok: true,
				message: `El paciente tiene ${patientHasAppointments.length} citas registradas, las cuales serán eliminadas si se elimina al paciente.`,
			};
		}
		return {
			ok: true,
			message: `El paciente no tiene citas registradas, puede eliminarse.`,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Error al verificar citas del paciente",
		};
	}
};
