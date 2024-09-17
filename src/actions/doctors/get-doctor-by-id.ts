"use server";

import prisma from "@/lib/prisma";

export const getDoctorById = async (id: string) => {
	try {
		const doctor = await prisma.doctor.findUnique({
			where: {
				id,
			},
			include: {
				specialty: {
					select: {
						name: true,
					},
				},
			},
		});
		if (!doctor) {
			return {
				ok: false,
				message: "No se encontró el doctor",
				data: null,
			};
		}
		return {
			ok: true,
			data: doctor,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Error al obtener el doctor",
			data: null,
		};
	}
};
