"use client";

import { createDoctor } from "@/actions";
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
import { useToast } from "@/hooks/use-toast";
import { Specialty } from "@/interfaces";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addDoctorForm = z.object({
	idDoctor: z
		.string({ required_error: "El número de DNI del doctor es obligatorio" })
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
	specialty: z.string({ required_error: "La especialidad es requerida" }), // Select de especialidades
});

interface Props {
	specialties: Specialty[];
}

export type AddDoctorFormValues = z.infer<typeof addDoctorForm>;

export const AddDoctorForm = ({ specialties }: Props) => {
	const { toast } = useToast();
	const closeDialog = useUIStore((state) => state.closeDialog);
	const router = useRouter();
	const form = useForm<AddDoctorFormValues>({
		resolver: zodResolver(addDoctorForm),
		defaultValues: {
			idDoctor: "",
			name: "",
			email: "",
			phone: "",
		},
	});

	const onSubmit = async (data: AddDoctorFormValues) => {
		const response = await createDoctor(data);
		if (!response.ok) {
			toast({
				variant: "destructive",
				title: "Error",
				description: response.message,
			});
		}
		toast({
			title: "Doctor creado",
			description: "El doctor ha sido creado correctamente",
			variant: "default",
		});
		form.reset();
		closeDialog();
		router.refresh();
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
													? specialties.find(
															(specialty) => specialty.id === field.value
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
													{specialties.map((specialty) => (
														<CommandItem
															key={specialty.id}
															value={specialty.id}
															onSelect={() => {
																form.setValue("specialty", specialty.id);
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
