"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const addAppointmentSchema = z.object({
	patient: z.string().min(3, {
		message: "El nombre del paciente debe tener al menos 3 caracteres",
	}),
	identityDocument: z
		.string()
		.length(8, { message: "El DNI debe tener 8 caracteres" }),
	email: z.string().email({ message: "El email no es válido" }).optional(),
	phone: z
		.string()
		.length(9, { message: "El teléfono debe tener 9 caracteres" })
		.optional(),
	medicalHistory: z.string().min(3, {
		message: "El número de historia clínica debe tener al menos 3 caracteres",
	}),
	cupo: z.coerce
		.number()
		.int()
		.positive({ message: "El cupo debe ser un número positivo" }),
	shift: z
		.string()
		.min(3, { message: "El turno debe tener al menos 3 caracteres" }),
	service: z
		.string()
		.min(3, { message: "El servicio debe tener al menos 3 caracteres" }),
	scheduledDate: z.date({
		required_error: "La fecha de programación es requerida",
	}),
	scheduledTime: z.string().refine(
		(time) => {
			const [hours, minutes] = time.split(":").map(Number);
			return (
				(hours === 8 && minutes >= 0) ||
				hours === 9 ||
				hours === 10 ||
				hours === 11 ||
				(hours === 12 && minutes === 0)
			);
		},
		{
			message: "La hora debe estar entre las 8:00 AM y las 12:00 PM.",
		}
	),
	accountNumber: z.string().min(3, {
		message: "El número de cuenta debe tener al menos 3 caracteres",
	}),
	doctor: z.string().min(3, {
		message: "El nombre del doctor debe tener al menos 3 caracteres",
	}),
	sis: z.boolean().default(false).optional(),
	interconsultation: z.boolean().optional(),
});

type AddAppointmentFormValues = z.infer<typeof addAppointmentSchema>;

export const AddAppointmentForm = () => {
	const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
	const form = useForm<AddAppointmentFormValues>({
		resolver: zodResolver(addAppointmentSchema),
		defaultValues: {
			patient: "",
			identityDocument: "",
			email: "",
			phone: "",
			medicalHistory: "",
			cupo: 0,
			shift: "",
			service: "",
			scheduledDate: new Date(),
			scheduledTime: "",
			accountNumber: "",
			doctor: "",
			sis: false,
			interconsultation: false,
		},
	});
	const onSubmit = (data: AddAppointmentFormValues) => {
		console.log({ data });
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				<fieldset className='grid sm:grid-cols-2 gap-2'>
					<legend className='text-lg font-semibold'>Datos del Paciente</legend>
					{/* Nombres completos */}
					<div className='space-y-2 col-span-2'>
						<FormField
							control={form.control}
							name='patient'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombres completos</FormLabel>
									<Input {...field} type='text' />
								</FormItem>
							)}
						/>
					</div>
					{/* Número de DNI */}
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='identityDocument'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nro. Documento de Identidad</FormLabel>
									<Input {...field} type='text' />
								</FormItem>
							)}
						/>
					</div>
					{/* Correo electrónico */}
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<Input {...field} type='email' />
								</FormItem>
							)}
						/>
					</div>
					{/* Teléfono */}
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Teléfono</FormLabel>
									<Input {...field} type='text' />
								</FormItem>
							)}
						/>
					</div>
					{/* Número de historia clínica */}
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='medicalHistory'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nro. Historia Clínica</FormLabel>
									<Input {...field} type='text' />
								</FormItem>
							)}
						/>
					</div>
				</fieldset>

				<fieldset className='grid sm:grid-cols-2 gap-2'>
					<legend className='text-lg font-semibold'>Datos de la Cita</legend>
					{/* Fecha de programación */}
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='scheduledDate'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Fecha de la Cita</FormLabel>
									<Popover
										open={isCalendarOpen}
										onOpenChange={setIsCalendarOpen}
									>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant='outline'
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPPP")
													) : (
														<span>Selecciona una fecha</span>
													)}
													<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-full p-0' align='center'>
											<Calendar
												mode='single'
												selected={field.value}
												onSelect={(e) => {
													field.onChange(e);
													setIsCalendarOpen(false);
												}}
												disabled={(date) =>
													date > new Date("2026-01-01") ||
													date < new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* Hora de programación */}
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='scheduledTime'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Hora de la cita</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												type='time'
												placeholder='Selecciona la hora'
												min='08:00'
												max='12:00'
												step='300'
												className='justify-start'
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* Servicio / Especialidad */}
					<div className='space-y-2'>
						{/* TODO: Implement a select component (get the data from the API) */}
						<FormField
							control={form.control}
							name='service'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Servicio</FormLabel>
									<Input {...field} type='text' />
								</FormItem>
							)}
						/>
					</div>
					{/* Cupo de la cita */}
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='cupo'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cupo</FormLabel>
									<Input {...field} type='number' />
								</FormItem>
							)}
						/>
					</div>
					{/* Turno */}
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='shift'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Turno</FormLabel>
									<Input {...field} type='text' />
								</FormItem>
							)}
						/>
					</div>
					{/* Número de cuenta */}
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='accountNumber'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nro. Cuenta</FormLabel>
									<FormControl>
										<Input {...field} type='text' />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					{/* SIS & Interconsulta */}
					<div className='flex items-center gap-6 mt-2 col-span-2 justify-center'>
						<FormField
							control={form.control}
							name='sis'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center space-x-2 space-y-0'>
									<FormLabel>SIS</FormLabel>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='interconsultation'
							render={({ field }) => (
								<FormItem className='flex flex-row items-center space-x-2 space-y-0'>
									<FormLabel>Interconsulta</FormLabel>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
				</fieldset>

				<fieldset>
					<legend className='text-lg font-semibold'>Datos del Doctor</legend>
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='doctor'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombres completos del Doctor</FormLabel>
									<Input {...field} type='text' />
								</FormItem>
							)}
						/>
					</div>
				</fieldset>
				<Button
					type='submit'
					className='w-full bg-teal-600 hover:bg-teal-700 text-white'
				>
					Registrar
				</Button>
			</form>
		</Form>
	);
};
