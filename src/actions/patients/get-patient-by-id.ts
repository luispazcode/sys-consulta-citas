"use server";

import prisma from "@/lib/prisma";

export const getPatientById = async (id: string) => {
	try {
		const patient = await prisma.patient.findUnique({
			where: {
				id,
			},
		});
		if (!patient) {
			return {
				ok: false,
				message: "No se encontró el paciente",
				data: null,
			};
		}
		return {
			ok: true,
			data: patient,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Error al obtener el paciente",
			data: null,
		};
	}
};
