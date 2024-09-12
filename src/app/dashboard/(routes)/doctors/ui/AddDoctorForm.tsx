"use client";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
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
	specialty: z.string({ required_error: "La especialidad es requerida" }), // Select de especialidades
});

type AddDoctorFormValues = z.infer<typeof addDoctorForm>;

const specialities = [
	{ id: 1, name: "Cardiología" },
	{ id: 2, name: "Dermatología" },
	{ id: 3, name: "Endocrinología" },
	{ id: 4, name: "Gastroenterología" },
	{ id: 5, name: "Ginecología" },
	{ id: 6, name: "Hematología" },
	{ id: 7, name: "Infectología" },
	{ id: 8, name: "Medicina Interna" },
	{ id: 9, name: "Nefrología" },
	{ id: 10, name: "Neumología" },
	{ id: 11, name: "Neurología" },
	{ id: 12, name: "Oftalmología" },
	{ id: 13, name: "Oncología" },
	{ id: 14, name: "Otorrinolaringología" },
	{ id: 15, name: "Pediatría" },
	{ id: 16, name: "Psiquiatría" },
	{ id: 17, name: "Reumatología" },
	{ id: 18, name: "Traumatología" },
	{ id: 19, name: "Urología" },
];

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
								<FormLabel htmlFor='name'>Nombres completos</FormLabel>
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
				{/* Servicio / Especialidad */}
				<div className='space-y-2 flex flex-col justify-end'>
					<FormField
						control={form.control}
						name='specialty'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Servicio (Especialidad)</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant='outline'
												role='combobox'
												className={cn(
													"w-full justify-between",
													!field.value && "text-muted-foreground"
												)}
											>
												{field.value
													? specialities.find(
															(specialty) => specialty.name === field.value
													  )?.name
													: "Selecciona una especialidad"}
												<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='w-full p-0'>
										<Command>
											<CommandInput placeholder='Seleccionar especialidad...' />
											<CommandList>
												<CommandEmpty>Especialidad no encontrado.</CommandEmpty>
												<CommandGroup>
													{specialities.map((specialty) => (
														<CommandItem
															key={specialty.id}
															value={specialty.name}
															onSelect={() => {
																form.setValue("specialty", specialty.name);
																// TODO: Set the rest of the specialty data in their fields
															}}
														>
															<Check
																className={cn(
																	"mr-2 h-4 w-4",
																	specialty.name === field.value
																		? "opacity-100"
																		: "opacity-0"
																)}
															/>
															{specialty.name}
														</CommandItem>
													))}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
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
