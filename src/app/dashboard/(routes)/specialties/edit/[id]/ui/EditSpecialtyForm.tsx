"use client";

import { editSpecialty } from "@/actions";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Specialty } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editSpecialtyForm = z.object({
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	description: z.string().optional(),
});

export type EditSpecialtyFormValues = z.infer<typeof editSpecialtyForm>;

interface Props {
	specialty: Specialty;
}

export const EditSpecialtyForm = ({ specialty }: Props) => {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<EditSpecialtyFormValues>({
		resolver: zodResolver(editSpecialtyForm),
		defaultValues: {
			name: specialty.name,
			description: specialty.description || "",
		},
	});
	const onSubmit = async (data: EditSpecialtyFormValues) => {
		const { ok, message } = await editSpecialty(specialty.id, data);
		if (!ok) {
			toast({
				variant: "destructive",
				title: "Error",
				description: message,
			});
			return;
		}
		toast({
			variant: "default",
			title: "Éxito!",
			description: message,
		});
		router.push("/dashboard/specialties");
		router.refresh();
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='description'>Descripción</FormLabel>
								<Input {...field} id='description' />
							</FormItem>
						)}
					/>
				</div>
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
