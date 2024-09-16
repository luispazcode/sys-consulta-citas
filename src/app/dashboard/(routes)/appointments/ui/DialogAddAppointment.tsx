"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { PlusIcon } from "lucide-react";
import { AddAppointmentForm } from "./AddAppointmentForm";
import { useUIStore } from "@/store";
import { Doctor, Patient, Specialty } from "@/interfaces";

interface Props {
	patients: Patient[];
	specialties: Specialty[];
	doctors: Doctor[];
}

export const DialogAddAppointment = ({
	patients,
	specialties,
	doctors,
}: Props) => {
	const isDialogOpen = useUIStore((state) => state.isDialogOpen);
	const openDialog = useUIStore((state) => state.openDialog);
	const closeDialog = useUIStore((state) => state.closeDialog);
	const toggleDialog = isDialogOpen ? closeDialog : openDialog;
	return (
		<Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
			<DialogTrigger asChild>
				<Button className='bg-teal-600 hover:bg-teal-700 text-white'>
					<PlusIcon className='w-4 h-4 mr-2' />
					Nueva Cita
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-5xl overflow-y-scroll max-h-screen'>
				<DialogHeader className='items-center'>
					<DialogTitle>Registrar Nueva Cita</DialogTitle>
					<DialogDescription>
						Completa la información de la cita para registrarla en el sistema
					</DialogDescription>
				</DialogHeader>
				<AddAppointmentForm
					patients={patients}
					specialties={specialties}
					doctors={doctors}
				/>
			</DialogContent>
		</Dialog>
	);
};
