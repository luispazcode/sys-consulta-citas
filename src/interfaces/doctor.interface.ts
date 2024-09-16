export interface Doctor {
	id: string;
	fullName: string;
	specialtyId: string;
	email?: string | null;
	phone?: string | null;
}
