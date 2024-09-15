"use server";

import prisma from "@/lib/prisma";

export const getPatients = async () => {
	try {
		const allPatients = await prisma.patient.findMany();
		if (!allPatients) {
			return {
				ok: false,
				message: "No se encontraron pacientes",
				data: [],
			};
		}
		return {
			ok: true,
			data: allPatients,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Error al obtener los pacientes",
			data: [],
		};
	}
};
