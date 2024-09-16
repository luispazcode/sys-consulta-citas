"use server";

import { AddAppointmentFormValues } from "@/app/dashboard/(routes)/appointments/ui/AddAppointmentForm";
import prisma from "@/lib/prisma";

export const createAppointment = async (data: AddAppointmentFormValues) => {
	try {
		const newAppointment = await prisma.appointment.create({
			data: {
				scheduledDate: data.scheduledDate,
				scheduledTime: data.scheduledTime,
				cupo: data.cupo,
				shift: data.shift,
				officeNumber: data.officeNumber,
				insurance: data.insuranceType,
				paymentCode: data.paymentCode,
				patientId: data.identityDocument,
				doctorId: data.doctor,
				specialtyId: data.service,
			},
		});
		return {
			ok: true,
			message: "Cita creada exitosamente",
			data: newAppointment,
		};
	} catch (error) {
		console.error(error);
		return {
			ok: false,
			message: "Error al crear la cita",
		};
	}
};
