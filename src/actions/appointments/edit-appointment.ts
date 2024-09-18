"use server";

import { EditAppointmentFormValues } from "@/app/dashboard/(routes)/appointments/edit/[id]/ui/EditAppointmentForm";
import prisma from "@/lib/prisma";

export const editAppointment = async (
	id: string,
	data: EditAppointmentFormValues
) => {
	try {
		const appointmentUpdated = await prisma.appointment.update({
			where: { id },
			data: {
				scheduledDate: data.scheduledDate,
				scheduledTime: data.scheduledTime,
				cupo: data.cupo,
				shift: data.shift,
				officeNumber: data.officeNumber,
				paymentCode: data.paymentCode,
				specialtyId: data.service,
				patientId: data.patient,
				doctorId: data.doctor,
				insurance: data.insuranceType,
			},
		});
		return {
			ok: true,
			data: appointmentUpdated,
			message: "Cita editada correctamente",
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Error al editar la cita",
			data: null,
		};
	}
};
