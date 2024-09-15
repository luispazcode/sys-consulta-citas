"use server";

import prisma from "@/lib/prisma";

export const getDoctors = async () => {
	try {
		const allDoctors = await prisma.doctor.findMany({
			include: {
				specialty: {
					select: {
						name: true,
					},
				},
			},
		});
		if (!allDoctors) {
			return {
				ok: false,
				message: "No se encontraron doctores",
				data: [],
			};
		}
		return {
			ok: true,
			data: allDoctors,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Error al obtener los doctores",
			data: [],
		};
	}
};
