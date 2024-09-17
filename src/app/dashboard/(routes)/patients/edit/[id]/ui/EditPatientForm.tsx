"use client";

import { editPatient } from "@/actions";
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
import { Patient } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editPatientForm = z.object({
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

export type EditPatientFormValues = z.infer<typeof editPatientForm>;

interface Props {
	patient: Patient;
}

export const EditPatientForm = ({ patient }: Props) => {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<EditPatientFormValues>({
		resolver: zodResolver(editPatientForm),
		defaultValues: {
			idPatient: patient.id,
			name: patient.fullName,
			email: patient.email || "",
			phone: patient.phone || "",
			medicalHistory: patient.medicalHistory || "",
			accountNumber: patient.accountNumber || "",
		},
	});
	const onSubmit = async (data: EditPatientFormValues) => {
		const {
			ok,
			data: patientEdited,
			message,
		} = await editPatient(patient.id, data);
		if (!ok) {
			toast({
				variant: "destructive",
				title: "Error",
				description: message,
			});
			return;
		}
		toast({
			title: "Éxito",
			description: message,
		});
		router.push("/dashboard/patients");
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
					Actualizar paciente
				</Button>
			</form>
		</Form>
	);
};
