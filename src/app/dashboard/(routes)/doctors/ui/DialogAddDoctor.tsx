"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { AddDoctorForm } from "./AddDoctorForm";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useUIStore } from "@/store";
import { Specialty } from "@/interfaces";

interface Props {
	specialties: Specialty[];
}

export const DialogAddDoctor = ({ specialties }: Props) => {
	const isDialogOpen = useUIStore((state) => state.isDialogOpen);
	const openDialog = useUIStore((state) => state.openDialog);
	const closeDialog = useUIStore((state) => state.closeDialog);
	const toggleDialog = isDialogOpen ? closeDialog : openDialog;
	return (
		<Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
			<DialogTrigger asChild>
				<Button className='bg-teal-600 hover:bg-teal-700 text-white'>
					<PlusIcon className='w-4 h-4 mr-2' />
					Añadir doctor
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader className='items-center'>
					<DialogTitle>Registrar nuevo Doctor</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<AddDoctorForm specialties={specialties} />
			</DialogContent>
		</Dialog>
	);
};
