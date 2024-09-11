"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addDoctorForm = z.object({
	idDoctor: z.string().refine((value) => /^\d{8}$/.test(value), {
		message: "El número de DNI debe tener exactamente 8 dígitos",
	}),
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	email: z.string().email("El email no es válido").optional(),
	phone: z
		.string()
		.min(10, "El teléfono debe tener al menos 10 caracteres")
		.optional(),
	// specialty: z.string().min(3, 'El departamento debe tener al menos 3 caracteres'), // Select de especialidades
});

type AddDoctorFormValues = z.infer<typeof addDoctorForm>;

export const AddDoctorForm = () => {
	const form = useForm<AddDoctorFormValues>({
		resolver: zodResolver(addDoctorForm),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
		},
	});

	const onSubmit = async (data: AddDoctorFormValues) => {
		console.log({ data });
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<div className='space-y-2'>
					<FormField
						control={form.control}
						name='idDoctor'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='idDoctor'>DNI</FormLabel>
								<Input {...field} id='idDoctor' />
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='space-y-2'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='name'>Nombre</FormLabel>
								<Input {...field} id='name' />
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='space-y-2'>
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
				</div>
				<div className='space-y-2'>
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
				</div>
				<Button
					type='submit'
					className='w-full bg-teal-600 hover:bg-teal-700 text-white'
				>
					Registrar Doctor
				</Button>
			</form>
		</Form>
	);
};
