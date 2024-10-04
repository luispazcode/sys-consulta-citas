"use server";

import prisma from "@/lib/prisma";

export const verifySpecialtyDoctorsAndAppointments = async (
	specialtyId: string
) => {
	try {
		const specialtyHasDoctors = await prisma.doctor.findMany({
			where: {
				specialtyId: specialtyId,
			},
		});
		const specialtyHasAppointments = await prisma.appointment.findMany({
			where: {
				specialtyId: specialtyId,
			},
		});
		if (specialtyHasDoctors.length > 0 || specialtyHasAppointments.length > 0) {
			return {
				ok: true,
				message: `Esta especialidad tiene ${specialtyHasDoctors.length} doctores y ${specialtyHasAppointments.length} citas, si la elimina todas sus citas y/o doctores serán eliminadas también.`,
			};
		}
		return {
			ok: true,
			message:
				"Esta especialidad no tiene citas ni doctores relacionados a ella, puede eliminarse sin problemas.",
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message:
				"Error al verificar información relacionada con esta especialidad",
		};
	}
};
