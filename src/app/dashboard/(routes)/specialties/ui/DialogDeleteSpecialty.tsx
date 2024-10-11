"use client";
import {
	deleteSpecialty,
	verifySpecialtyDoctorsAndAppointments,
} from "@/actions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
	specialtyId: string;
}

export const DialogDeleteSpecialty = ({ specialtyId }: Props) => {
	const [message, setMessage] = useState("");
	const { toast } = useToast();
	const router = useRouter();
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant='outline'
					size='sm'
					className='bg-red-100 text-red-600 hover:bg-red-200'
					onClick={() => {
						verifySpecialtyDoctorsAndAppointments(specialtyId).then(
							(response) => {
								if (response.ok) {
									setMessage(response.message);
								} else {
									setMessage(response.message);
								}
							}
						);
					}}
				>
					Eliminar
				</Button>
			</AlertDialogTrigger>
			<AlertDialogTitle></AlertDialogTitle>
			<AlertDialogContent>
				<AlertDialogHeader>
					¿Estás seguro de eliminar esta especialidad?
				</AlertDialogHeader>
				<AlertDialogDescription className='flex flex-col gap-2'>
					<span>{message}</span>
					<span>Esta acción no puede ser revertida.</span>
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							deleteSpecialty(specialtyId).then((response) => {
								if (response.ok) {
									toast({
										title: "Éxito",
										description: response.message,
										variant: "default",
									});
									router.refresh();
								} else {
									toast({
										title: "Error",
										description: response.message,
										variant: "destructive",
									});
								}
							});
						}}
					>
						Eliminar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
