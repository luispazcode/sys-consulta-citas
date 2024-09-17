"use server";

import { EditSpecialtyFormValues } from "@/app/dashboard/(routes)/specialties/edit/[id]/ui/EditSpecialtyForm";
import prisma from "@/lib/prisma";

export const editSpecialty = async (
	id: string,
	data: EditSpecialtyFormValues
) => {
	try {
		const specialtyToEdit = await prisma.specialty.findUnique({
			where: { id },
		});
		if (!specialtyToEdit) {
			return {
				ok: false,
				data: null,
				message: "Especialidad no encontrada",
			};
		}
		const specialtyEdited = await prisma.specialty.update({
			data: {
				name: data.name,
				description: data.description,
			},
			where: { id },
		});
		return {
			ok: true,
			data: specialtyEdited,
			message: "Especialidad editada correctamente",
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			data: null,
			message: "Error al editar especialidad",
		};
	}
};
