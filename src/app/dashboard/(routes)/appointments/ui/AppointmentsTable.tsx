"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AppointmentTableItem } from "@/interfaces";
import Link from "next/link";
import { DialogDeleteAppointment } from "./DialogDeleteAppointment";

interface Props {
	result: boolean;
	appointments: AppointmentTableItem[];
	message?: string;
}

export const AppointmentsTable = ({
	result,
	appointments,
	message = "",
}: Props) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Id cita</TableHead>
					<TableHead>Paciente</TableHead>
					<TableHead>Fecha programada</TableHead>
					<TableHead>Hora</TableHead>
					<TableHead>Doctor</TableHead>
					<TableHead>Especialidad</TableHead>
					<TableHead>Acciones</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{!result ? (
					<p>{message}</p>
				) : (
					appointments.map((appointment) => (
						<TableRow key={appointment.id}>
							<TableCell>{appointment.id.slice(-6).toUpperCase()}</TableCell>
							<TableCell>{appointment.patient.fullName}</TableCell>
							<TableCell>
								{appointment.scheduledDate.toLocaleDateString()}
							</TableCell>
							<TableCell>{appointment.scheduledTime}</TableCell>
							<TableCell>{appointment.doctor.fullName}</TableCell>
							<TableCell>{appointment.service.name}</TableCell>
							<TableCell>
								<Button variant='outline' size='sm' className='mr-2' asChild>
									<Link href={`/dashboard/appointments/edit/${appointment.id}`}>
										Editar
									</Link>
								</Button>
								<DialogDeleteAppointment appointmentId={appointment.id} />
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};
