export interface Doctor {
	id: string;
	fullName: string;
	specialtyId: string;
	email?: string | null;
	phone?: string | null;
}

export interface DoctorWithSpecialty extends Doctor {
	specialty: {
		name: string;
	};
}
