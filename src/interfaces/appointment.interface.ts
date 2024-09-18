export interface Appointment {
	id: string;
	scheduledDate: Date;
	scheduledTime: string;
	cupo: number;
	shift: string;
	officeNumber: string | null;
	paymentCode?: string | null;
	specialtyId: string;
	doctorId: string;
	patientId: string;
}

export interface AppointmentTableItem extends Appointment {
	insurance: string | null;
	patient: {
		fullName: string;
	};
	doctor: {
		fullName: string;
	};
	service: {
		name: string;
	};
}

export interface CompleteAppointment extends Appointment {
	insurance?: InsuranceType | null | string;
	patient: {
		id: string;
		fullName: string;
		email?: string | null;
		phone?: string | null;
		medicalHistory?: string | null;
		accountNumber?: string | null;
	};
	doctor: {
		id: string;
		fullName: string;
	};
	service: {
		id: string;
		name: string;
	};
}

enum InsuranceType {
	SIS = "sis",
	Particular = "particular",
	None = "none",
}
