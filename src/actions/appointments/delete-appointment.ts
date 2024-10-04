"use server";

import prisma from "@/lib/prisma";

export const deleteAppointment = async (id: string) => {
	try {
		const appointment = await prisma.appointment.delete({
			where: {
				id: id,
			},
		});
		return {
			ok: true,
			message: "Cita eliminada correctamente",
			data: appointment,
		};
	} catch (error) {
		console.log(error);
		return {
			ok: false,
			message: "Error al eliminar cita",
		};
	}
};
