import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { AddSpecialtyForm } from "./AddSpecialtyForm";
import { DialogDescription } from "@radix-ui/react-dialog";

export const DialogAddSpecialty = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='bg-teal-600 hover:bg-teal-700 text-white'>
					<PlusIcon className='w-4 h-4 mr-2' />
					Añadir especialidad
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader className='items-center'>
					<DialogTitle>Registrar Nueva Especialidad</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<AddSpecialtyForm />
			</DialogContent>
		</Dialog>
	);
};
