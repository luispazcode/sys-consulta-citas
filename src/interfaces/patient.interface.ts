export interface Patient {
	id: string;
	fullName: string;
	email?: string | null;
	phone?: string | null;
	medicalHistory?: string | null;
	accountNumber?: string | null;
}
