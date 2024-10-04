"use server";

import prisma from "@/lib/prisma";

export const deletePatient = async (id: string) => {
	try {
		const patient = await prisma.patient.delete({
			where: {
				id: id,
			},
		});
		return {
			ok: true,
			message: "Paciente eliminado correctamente",
			data: patient,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Error al eliminar el paciente",
			data: null,
		};
	}
};
