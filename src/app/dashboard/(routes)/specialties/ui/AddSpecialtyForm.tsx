"use client";

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const addSpecialtyForm = z.object({
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	description: z.string().optional(),
});

type AddSpecialtyFormValues = z.infer<typeof addSpecialtyForm>;

export const AddSpecialtyForm = () => {
	const form = useForm<AddSpecialtyFormValues>({
		resolver: zodResolver(addSpecialtyForm),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const onSubmit = async (data: AddSpecialtyFormValues) => {
		console.log({ data });
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
					Registrar Especialidad
				</Button>
			</form>
		</Form>
	);
};
