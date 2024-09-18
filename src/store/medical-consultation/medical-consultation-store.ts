import { AppointmentTableItem } from "@/interfaces";
import { create } from "zustand";

interface State {
	hasConsulted: boolean;
	hasAppointments: boolean;
	appointments: AppointmentTableItem[];
	isLoading: boolean;
	setHasConsulted: (hasConsulted: boolean) => void;
	setHasAppointments: (hasAppointments: boolean) => void;
	setAppointments: (appointments: AppointmentTableItem[]) => void;
	setIsLoading: (isLoading: boolean) => void;
}

export const useMedicalConsultationStore = create<State>()((set) => ({
	hasConsulted: false,
	hasAppointments: false,
	appointments: [],
	appointment: null,
	isLoading: false,
	setHasConsulted: (hasConsulted: boolean) => set(() => ({ hasConsulted })),
	setHasAppointments: (hasAppointments: boolean) =>
		set(() => ({ hasAppointments })),
	setAppointments: (appointments: AppointmentTableItem[]) =>
		set(() => ({ appointments })),
	setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),
}));
