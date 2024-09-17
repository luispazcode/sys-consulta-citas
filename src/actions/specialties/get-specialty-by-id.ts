"use server";

import prisma from "@/lib/prisma";

export const getSpecialtyById = async (id: string) => {
	try {
		const specialty = await prisma.specialty.findUnique({
			where: {
				id,
			},
		});
		if (!specialty) {
			return {
				ok: false,
				message: "Especialidad no encontrada",
			};
		}
		return {
			ok: true,
			data: specialty,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Error al obtener la especialidad",
		};
	}
};
