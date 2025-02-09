"use client";
import { deletePatient, verifyAppointments } from "@/actions";
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
	patientId: string;
}

export const DialogDeletePatient = ({ patientId }: Props) => {
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
						verifyAppointments(patientId).then((response) => {
							if (response.ok) {
								setMessage(response.message);
							} else {
								setMessage(response.message);
							}
						});
					}}
				>
					Eliminar
				</Button>
			</AlertDialogTrigger>
			<AlertDialogTitle></AlertDialogTitle>
			<AlertDialogContent>
				<AlertDialogHeader>
					¿Estás seguro de eliminar este paciente?
				</AlertDialogHeader>
				<AlertDialogDescription className='flex flex-col gap-2'>
					<span>{message}</span>
					<span>Esta acción no puede ser revertida.</span>
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							deletePatient(patientId).then((response) => {
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
