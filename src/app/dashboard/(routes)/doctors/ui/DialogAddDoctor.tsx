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

export const DialogAddDoctor = () => {
	return (
		<Dialog>
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
				<AddDoctorForm />
			</DialogContent>
		</Dialog>
	);
};
