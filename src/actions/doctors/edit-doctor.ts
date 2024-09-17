"use server";

import { EditDoctorFormValues } from "@/app/dashboard/(routes)/doctors/edit/[id]/ui/EditDoctorForm";
import prisma from "@/lib/prisma";

export const editDoctor = async (id: string, data: EditDoctorFormValues) => {
	try {
		const doctorToEdit = await prisma.doctor.findUnique({
			where: { id },
		});
		if (!doctorToEdit) {
			return {
				ok: false,
				message: "Doctor no encontrado",
				data: null,
			};
		}
		const doctorEdited = await prisma.doctor.update({
			data: {
				id: data.idDoctor,
				fullName: data.name,
				email: data.email,
				phone: data.phone,
				specialtyId: data.specialty,
			},
			where: { id },
		});
		return {
			ok: true,
			message: "Doctor editado correctamente",
			data: doctorEdited,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Error al editar el doctor",
			data: null,
		};
	}
};
