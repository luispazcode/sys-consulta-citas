"use server";

import prisma from "@/lib/prisma";

export const deleteDoctor = async (id: string) => {
	try {
		const doctor = await prisma.doctor.delete({
			where: {
				id: id,
			},
		});
		return {
			ok: true,
			message: "Doctor eliminado correctamente",
			data: doctor,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Error al eliminar doctor",
		};
	}
};
