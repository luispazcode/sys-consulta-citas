"use server";

import prisma from "@/lib/prisma";

export const getSpecialties = async () => {
	try {
		const specialties = await prisma.specialty.findMany();
		if (!specialties) {
			return {
				ok: false,
				message: "No se encontraron especialidades",
				data: [],
			};
		}
		return {
			ok: true,
			data: specialties,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Ocurrió un error al obtener las especialidades",
			data: [],
		};
	}
};
