"use server";

import { AddDoctorFormValues } from "@/app/dashboard/(routes)/doctors/ui/AddDoctorForm";
import prisma from "@/lib/prisma";

export const createDoctor = async (data: AddDoctorFormValues) => {
	try {
		const newDoctor = await prisma.doctor.create({
			data: {
				id: data.idDoctor,
				fullName: data.name,
				email: data.email,
				phone: data.phone,
				specialtyId: data.specialty,
			},
		});
		return {
			ok: true,
			message: "Doctor creado correctamente",
			data: newDoctor,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Ocurrió un error al crear el doctor",
		};
	}
};
