"use server";

import prisma from "@/lib/prisma";

export const getAppointmentById = async (id: string) => {
	try {
		const appointment = await prisma.appointment.findUnique({
			where: {
				id: id,
			},
			include: {
				patient: {
					select: {
						id: true,
						fullName: true,
						email: true,
						phone: true,
						medicalHistory: true,
						accountNumber: true,
					},
				},
				doctor: {
					select: {
						id: true,
						fullName: true,
					},
				},
				service: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
		if (!appointment) {
			return {
				ok: false,
				message: "No se encontró la cita",
				data: null,
			};
		}
		return {
			ok: true,
			data: appointment,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Error al obtener la cita",
			data: null,
		};
	}
};
