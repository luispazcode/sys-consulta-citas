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
import { AddPatientForm } from "./AddPatientForm";
import { useUIStore } from "@/store";

export const DialogAddPatient = () => {
	const isDialogOpen = useUIStore((state) => state.isDialogOpen);
	const openDialog = useUIStore((state) => state.openDialog);
	const closeDialog = useUIStore((state) => state.closeDialog);
	const toggleDialog = isDialogOpen ? closeDialog : openDialog;
	return (
		<Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
			<DialogTrigger asChild>
				<Button className='bg-teal-600 hover:bg-teal-700 text-white'>
					<PlusIcon className='w-4 h-4 mr-2' />
					Añadir paciente
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-2xl'>
				<DialogHeader className='items-center'>
					<DialogTitle>Registrar nuevo Paciente</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<AddPatientForm />
			</DialogContent>
		</Dialog>
	);
};
