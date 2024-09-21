export { createSpecialty } from "./specialties/create-specialty";
export { getSpecialties } from "./specialties/get-specialties";
export { getSpecialtyById } from "./specialties/get-specialty-by-id";
export { editSpecialty } from "./specialties/edit-specialty";

export { createDoctor } from "./doctors/create-doctor";
export { getDoctors } from "./doctors/get-doctors";
export { getDoctorById } from "./doctors/get-doctor-by-id";
export { editDoctor } from "./doctors/edit-doctor";

export { createPatient } from "./patients/create-patient";
export { getPatients } from "./patients/get-patients";
export { getPatientById } from "./patients/get-patient-by-id";
export { editPatient } from "./patients/edit-patient";

export { createAppointment } from "./appointments/create-appointment";
export { getAppointments } from "./appointments/get-appointments";
export { getAppointmentById } from "./appointments/get-appointment-by-id";
export { editAppointment } from "./appointments/edit-appointment";

export { getAppointmentsByPatientId } from "./medical-consultation/get-appointment-by-patient-id";

export { authenticate } from "./auth/authenticate";
export { logout } from "./auth/logout";
