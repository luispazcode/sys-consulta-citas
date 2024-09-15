"use server";

import { AddPatientFormValues } from "@/app/dashboard/(routes)/patients/ui/AddPatientForm";
import prisma from "@/lib/prisma";

export const createPatient = async (data: AddPatientFormValues) => {
	try {
		const newPatient = await prisma.patient.create({
			data: {
				id: data.idPatient,
				fullName: data.name,
				email: data.email,
				phone: data.phone,
				medicalHistory: data.medicalHistory,
				accountNumber: data.accountNumber,
			},
		});
		return {
			ok: true,
			message: "Paciente creado correctamente",
			data: newPatient,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Ocurrió un error al crear el paciente",
		};
	}
};
