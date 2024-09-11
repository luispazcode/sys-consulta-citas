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

export const DialogAddAppointment = () => {
	return (
		<Dialog>
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
				<AddAppointmentForm />
			</DialogContent>
		</Dialog>
	);
};
