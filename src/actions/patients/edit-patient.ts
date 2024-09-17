"use server";

import { EditPatientFormValues } from "@/app/dashboard/(routes)/patients/edit/[id]/ui/EditPatientForm";
import prisma from "@/lib/prisma";

export const editPatient = async (id: string, data: EditPatientFormValues) => {
	try {
		const patientToEdit = await prisma.patient.findUnique({
			where: { id },
		});
		if (!patientToEdit) {
			return {
				ok: false,
				data: null,
				message: "Paciente no encontrado",
			};
		}
		const patientEdited = await prisma.patient.update({
			data: {
				id: data.idPatient,
				fullName: data.name,
				email: data.email,
				phone: data.phone,
				medicalHistory: data.medicalHistory,
				accountNumber: data.accountNumber,
			},
			where: { id },
		});
		return {
			ok: true,
			data: patientEdited,
			message: "Paciente editado correctamente",
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			data: null,
			message: "Error al editar paciente",
		};
	}
};
