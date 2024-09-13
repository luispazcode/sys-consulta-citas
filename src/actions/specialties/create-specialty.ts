"use server";

import { AddSpecialtyFormValues } from "@/app/dashboard/(routes)/specialties/ui/AddSpecialtyForm";
import prisma from "@/lib/prisma";

export const createSpecialty = async (data: AddSpecialtyFormValues) => {
	try {
		const newSpecialty = await prisma.specialty.create({
			data: data,
		});
		return {
			ok: true,
			message: "Especialidad creada correctamente",
			data: newSpecialty,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Ocurrió un error al crear la especialidad",
		};
	}
};
