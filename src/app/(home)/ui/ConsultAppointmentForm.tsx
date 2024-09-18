"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ClipboardListIcon, Loader2, SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getAppointmentsByPatientId } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import { useMedicalConsultationStore } from "@/store";

const consultAppointmentSchema = z.object({
	idPatient: z.string().refine((value) => /^\d{8}$|^\d{10}$/.test(value), {
		message:
			"El número de identificación debe tener exactamente 8 o 10 dígitos",
	}),
});

type ConsultAppointmentFormValues = z.infer<typeof consultAppointmentSchema>;

export const ConsultAppointmentForm = () => {
	const { toast } = useToast();
	const { setHasAppointments, setAppointments, setHasConsulted } =
		useMedicalConsultationStore((state) => state);
	const form = useForm<ConsultAppointmentFormValues>({
		resolver: zodResolver(consultAppointmentSchema),
		defaultValues: {
			idPatient: "",
		},
	});

	const onSubmit = async (data: ConsultAppointmentFormValues) => {
		const {
			ok,
			message,
			data: appointments,
		} = await getAppointmentsByPatientId(data.idPatient);
		if (!ok) {
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
			return;
		}
		if (appointments) {
			toast({
				title: "Éxito",
				description: message,
			});
			setHasAppointments(true);
			setAppointments(appointments);
		}
		setHasConsulted(true);
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'
			>
				<div className='flex-grow'>
					<FormField
						control={form.control}
						name='idPatient'
						render={({ field }) => (
							<FormItem>
								<FormLabel>DNI del Paciente</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											{...field}
											type='text'
											placeholder='Ingresa tu DNI'
											className='pl-10 pr-4 py-2 border-gray-300 dark:border-gray-600 focus:ring-teal-500 focus:border-teal-500 block w-full rounded-md'
										/>
										<SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className='flex items-end'>
					<Button
						type='submit'
						className='w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out'
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? (
							<>
								<Loader2 className='mr-2 h-5 w-5 animate-spin' />
								Buscando
							</>
						) : (
							<>
								<ClipboardListIcon className='w-5 h-5 mr-2' />
								Buscar Citas
							</>
						)}
					</Button>
				</div>
			</form>
			{form.formState.errors.idPatient && (
				<div className='w-full py-2'>
					<FormMessage>{form.formState.errors.idPatient.message}</FormMessage>
				</div>
			)}
		</Form>
	);
};
