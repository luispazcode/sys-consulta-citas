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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addPatientForm = z.object({
	idPatient: z.string().refine((value) => /^\d{8}$/.test(value), {
		message: "El número de DNI debe tener exactamente 8 dígitos",
	}),
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	email: z.string().optional(),
	phone: z
		.string()
		// .min(9, "El teléfono debe tener al menos 9 caracteres")
		.optional(),
	medicalHistory: z
		.string()
		// .min(3, "La historia médica debe tener al menos 3 caracteres")
		.optional(),
	accountNumber: z
		.string()
		// .min(3, "La cuenta debe tener al menos 3 caracteres")
		.optional(),
});

type AddPatientFormValues = z.infer<typeof addPatientForm>;

export const AddPatientForm = () => {
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
		console.log({ data });
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
