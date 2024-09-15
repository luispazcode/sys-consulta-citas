"use client";

import { createPatient } from "@/actions";
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
import { useToast } from "@/hooks/use-toast";
import { useUIStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addPatientForm = z.object({
	idPatient: z
		.string({ required_error: "El número de DNI del paciente es obligatorio" })
		.refine((value) => /^\d{8}$/.test(value), {
			message: "El número de DNI debe tener exactamente 8 dígitos",
		}),
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	email: z
		.string()
		.email({ message: "Debe ingresar un correo electrónico válido" })
		.optional()
		.or(z.literal("")),
	phone: z.string().optional(),
	medicalHistory: z.string().optional(),
	accountNumber: z.string().optional(),
});

export type AddPatientFormValues = z.infer<typeof addPatientForm>;

export const AddPatientForm = () => {
	const { toast } = useToast();
	const router = useRouter();
	const closeDialog = useUIStore((state) => state.closeDialog);
	const form = useForm<AddPatientFormValues>({
		resolver: zodResolver(addPatientForm),
		defaultValues: {
			idPatient: "",
			name: "",
			email: "",
			phone: "",
			medicalHistory: "",
			accountNumber: "",
		},
	});
	const onSubmit = async (data: AddPatientFormValues) => {
		const response = await createPatient(data);
		if (!response.ok) {
			return toast({
				variant: "destructive",
				title: "Error",
				description: response.message,
			});
		}
		toast({
			title: "Éxito",
			description: "El paciente ha sido registrado correctamente",
		});
		closeDialog();
		router.refresh();
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid grid-cols-1 md:grid-cols-2 gap-4'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='col-span-2'>
							<FormLabel htmlFor='name'>Nombres completos</FormLabel>
							<Input {...field} id='name' />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='idPatient'
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor='idPatient'>DNI</FormLabel>
							<FormControl>
								<Input {...field} id='idPatient' type='text' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor='email'>Email</FormLabel>
							<Input {...field} id='email' />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor='phone'>Teléfono</FormLabel>
							<Input {...field} id='phone' />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='medicalHistory'
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor='medicalHistory'>Historia Médica</FormLabel>
							<Input {...field} id='medicalHistory' />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='accountNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor='accountNumber'>Número de Cuenta</FormLabel>
							<Input {...field} id='accountNumber' />
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					className='bg-teal-600 hover:bg-teal-700 text-white md:col-span-2'
				>
					Registrar
				</Button>
			</form>
		</Form>
	);
};
