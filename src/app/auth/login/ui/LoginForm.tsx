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
import { LockIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
	username: z
		.string({ required_error: "El nombre de usuario es requerido" })
		.min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
	password: z
		.string({ required_error: "La contraseña es requerida" })
		.min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = (data: LoginFormValues) => {
		console.log({ data });
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<div className='space-y-2'>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='username'>Nombre de Usuario</FormLabel>
								<div className='relative'>
									<UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
									<Input
										type='text'
										placeholder='Ingrese su nombre de usuario'
										{...field}
										className='pl-10 w-full'
									/>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='space-y-2'>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor='password'>Contraseña</FormLabel>
								<div className='relative'>
									<LockIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
									<Input
										type='password'
										placeholder='Ingrese su contraseña'
										{...field}
										className='pl-10 w-full'
									/>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					type='submit'
					className='w-full bg-teal-600 hover:bg-teal-700 text-white'
				>
					Iniciar Sesión
				</Button>
			</form>
		</Form>
	);
};
