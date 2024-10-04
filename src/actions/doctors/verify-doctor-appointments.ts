"use server";

import prisma from "@/lib/prisma";

export const verifyDoctorAppointments = async (doctorId: string) => {
	try {
		const doctorHasAppointments = await prisma.appointment.findMany({
			where: {
				doctorId: doctorId,
			},
		});
		if (doctorHasAppointments.length > 0) {
			return {
				ok: true,
				message: `Este doctor tiene ${doctorHasAppointments.length} citas, si lo elimina todas sus citas serán eliminadas también.`,
			};
		}
		return {
			ok: true,
			message:
				"Este doctor no tiene citas pendientes, puede eliminarse sin problemas.",
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Error al eliminar Doctor",
		};
	}
};
