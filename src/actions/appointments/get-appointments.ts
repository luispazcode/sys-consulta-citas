"use server";

import prisma from "@/lib/prisma";

export const getAppointments = async () => {
	try {
		const allAppointments = await prisma.appointment.findMany({
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
		if (!allAppointments) {
			return {
				ok: false,
				message: "No se encontraron citas",
				data: [],
			};
		}
		return {
			ok: true,
			data: allAppointments,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Error al obtener las citas",
			data: [],
		};
	}
};
