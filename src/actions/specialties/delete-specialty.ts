"use server";

import prisma from "@/lib/prisma";

export const deleteSpecialty = async (id: string) => {
	try {
		const specialty = await prisma.specialty.delete({
			where: {
				id: id,
			},
		});
		return {
			ok: true,
			message: "Especialidad eliminada correctamente",
			data: specialty,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Error al eliminar especialidad",
		};
	}
};
