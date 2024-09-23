"use client";

import { editAppointment } from "@/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CompleteAppointment, Doctor, Patient, Specialty } from "@/interfaces";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editAppointmentSchema = z.object({
	patient: z.string({
		required_error: "El nombre del paciente es requerido",
	}),
	identityDocument: z
		.string()
		.length(8, { message: "El DNI debe tener 8 caracteres" }),
	email: z
		.string()
		.email({ message: "Debe ingresar un correo electrónico válido" })
		.optional()
		.or(z.literal("")),
	phone: z.string().optional(),
	medicalHistory: z.string().optional(),
	cupo: z.coerce
		.number()
		.int()
		.positive({ message: "El cupo debe ser un número positivo" }),
	shift: z
		.string()
		.min(3, { message: "El turno debe tener al menos 3 caracteres" }),
	service: z.string({
		required_error: "El servicio es requerido",
	}),
	scheduledDate: z.date({
		required_error: "La fecha de programación es requerida",
	}),
	scheduledTime: z.string().refine(
		(time) => {
			const [hours, minutes] = time.split(":").map(Number);
			return (hours >= 7 && hours <= 17) || (hours === 17 && minutes === 0);
		},
		{
			message: "La hora debe estar entre las 7:00 AM y las 5:00 PM.",
		}
	),
	officeNumber: z.string().optional(),
	doctor: z.string({
		required_error: "El nombre del Doctor es requerido",
	}),
	insuranceType: z.union([z.enum(["sis", "particular", "none"]), z.string()]),
	paymentCode: z
		.string()
		.optional()
		.refine(
			(value) => {
				if (value === "particular") {
					return value && value.length > 0;
				}
				return true;
			},
			{ message: "Código de pago es requerido para la opción Particular" }
		),
});

export type EditAppointmentFormValues = z.infer<typeof editAppointmentSchema>;

interface Props {
	appointment: CompleteAppointment;
	patients: Patient[];
	specialties: Specialty[];
	doctors: Doctor[];
}

export const EditAppointmentForm = ({
	appointment,
	patients,
	specialties,
	doctors,
}: Props) => {
	const { toast } = useToast();
	const router = useRouter();
	const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
	const [showPaymentCode, setShowPaymentCode] = useState(false);
	const [selectedSpecialty, setSelectedSpecialty] = useState<string>(
		appointment.specialtyId
	);
	const form = useForm<EditAppointmentFormValues>({
		resolver: zodResolver(editAppointmentSchema),
		defaultValues: {
			patient: appointment.patientId,
			identityDocument: appointment.patient.id,
			email: appointment.patient.email || "",
			phone: appointment.patient.phone || "",
			medicalHistory: appointment.patient.medicalHistory || "",
			cupo: appointment.cupo,
			shift: appointment.shift,
			service: appointment.specialtyId,
			scheduledDate: appointment.scheduledDate,
			scheduledTime: appointment.scheduledTime,
			officeNumber: appointment.officeNumber || "",
			doctor: appointment.doctorId,
			insuranceType: appointment.insurance || "none",
			paymentCode: appointment.paymentCode || "",
		},
	});

	const onSubmit = async (data: EditAppointmentFormValues) => {
		const { ok, message } = await editAppointment(appointment.id, data);
		if (!ok) {
			toast({
				title: "Error",
				description: message,
				variant: "destructive",
			});
			return;
		}
		toast({
			title: "Éxito",
			description: message,
		});
		router.push("/dashboard/appointments");
		router.refresh();
	};
	const filteredDoctors = doctors.filter(
		(doctor) => doctor.specialtyId === selectedSpecialty
	);
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
								<FormItem className='flex flex-col'>
									<FormLabel>Nombres completos del paciente</FormLabel>
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
														? patients.find(
																(patient) => patient.id === field.value
														  )?.fullName
														: "Selecciona un paciente"}
													<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-full p-0'>
											<Command>
												<CommandInput placeholder='Buscar paciente...' />
												<CommandList>
													<CommandEmpty>Paciente no encontrado.</CommandEmpty>
													<CommandGroup>
														{patients.map((patient) => (
															<CommandItem
																key={patient.id}
																value={patient.id}
																onSelect={() => {
																	form.setValue("patient", patient.id);
																	form.setValue("identityDocument", patient.id);
																	form.setValue("email", patient.email || "");
																	form.setValue("phone", patient.phone || "");
																	form.setValue(
																		"medicalHistory",
																		patient.medicalHistory || ""
																	);
																	// TODO: Set the rest of the patient data in their fields
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		patient.fullName === field.value
																			? "opacity-100"
																			: "opacity-0"
																	)}
																/>
																{patient.id} - {patient.fullName}
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
					{/* Número de DNI */}
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='identityDocument'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nro. Documento de Identidad</FormLabel>
									<Input {...field} type='text' disabled />
									<FormMessage />
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
									<Input {...field} type='email' disabled />
									<FormMessage />
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
									<Input {...field} type='text' disabled />
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
									<Input {...field} type='text' disabled />
									<FormMessage />
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
												min='07:00'
												max='17:00'
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
					<div className='space-y-2 flex flex-col justify-end'>
						<FormField
							control={form.control}
							name='service'
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
													<CommandEmpty>
														Especialidad no encontrado.
													</CommandEmpty>
													<CommandGroup>
														{specialties.map((specialty) => (
															<CommandItem
																key={specialty.id}
																value={specialty.id}
																onSelect={() => {
																	form.setValue("service", specialty.id);
																	setSelectedSpecialty(specialty.id);
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		specialty.id === field.value
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
					{/* Cupo de la cita */}
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='cupo'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cupo</FormLabel>
									<Input {...field} type='number' />
									<FormMessage />
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
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* Número de consultorio */}
					<div className='space-y-2'>
						<FormField
							control={form.control}
							name='officeNumber'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nro. de consultorio</FormLabel>
									<FormControl>
										<Input {...field} type='text' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* Modality: SIS, Particular or None */}
					<div className='space-y-2 col-span-2 grid grid-cols-2'>
						<FormField
							control={form.control}
							name='insuranceType'
							render={({ field }) => (
								<FormItem className='space-y-3'>
									<FormLabel>Tipo de seguro</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={(value) => {
												field.onChange(value);
												setShowPaymentCode(value === "particular");
											}}
											defaultValue={field.value}
											className='flex flex-col space-y-1'
										>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='sis' />
												</FormControl>
												<FormLabel>SIS</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='particular' />
												</FormControl>
												<FormLabel>Particular</FormLabel>
											</FormItem>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value='none' />
												</FormControl>
												<FormLabel>Ninguno</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{showPaymentCode && (
							<FormField
								control={form.control}
								name='paymentCode'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Código de pago</FormLabel>
										<FormControl>
											<Input
												placeholder='Ingrese el código de pago'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>
				</fieldset>

				<fieldset>
					<legend className='text-lg font-semibold'>Datos del Doctor</legend>
					<div className='space-y-2 col-span-2'>
						<FormField
							control={form.control}
							name='doctor'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Nombres completos del doctor</FormLabel>
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
														? filteredDoctors.find(
																(doctor) => doctor.id === field.value
														  )?.fullName
														: "Selecciona un doctor"}
													<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-full p-0'>
											<Command>
												<CommandInput placeholder='Buscar doctor...' />
												<CommandList>
													<CommandEmpty>Doctor no encontrado.</CommandEmpty>
													<CommandGroup>
														{filteredDoctors.map((doctor) => (
															<CommandItem
																key={doctor.id}
																value={doctor.id}
																onSelect={() => {
																	form.setValue("doctor", doctor.id);
																}}
															>
																<Check
																	className={cn(
																		"mr-2 h-4 w-4",
																		doctor.id === field.value
																			? "opacity-100"
																			: "opacity-0"
																	)}
																/>
																{doctor.id} - {doctor.fullName}
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
				</fieldset>
				<Button
					type='submit'
					className='w-full bg-teal-600 hover:bg-teal-700 text-white'
				>
					Actualiar cita
				</Button>
			</form>
		</Form>
	);
};
