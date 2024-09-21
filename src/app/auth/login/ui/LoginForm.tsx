"use client";

import { authenticate } from "@/actions";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LockIcon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
	username: z
		.string({ required_error: "El nombre de usuario es requerido" })
		.min(5, "El nombre de usuario debe tener al menos 5 caracteres"),
	password: z
		.string({ required_error: "La contraseña es requerida" })
		.min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const LoginForm = () => {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const [authStatus, setAuthStatus] = useState<String | null>(null);
	const { toast } = useToast();

	const onSubmit = async (data: LoginFormValues) => {
		const response = await authenticate(undefined, data);
		setAuthStatus(response);
	};

	useEffect(() => {
		if (authStatus === "SUCCESS") {
			toast({
				title: "Éxito",
				description: "Sesión iniciada correctamente",
				variant: "default",
			});
			window.location.replace("/dashboard");
		}
		if (authStatus === "INCORRECT_CREDENTIALS") {
			toast({
				title: "Error",
				description: "Usuario o contraseña incorrectos",
				variant: "destructive",
			});
			form.setError("username", {
				type: "manual",
				message: "Usuario o contraseña incorrectos",
			});
			form.setError("password", {
				type: "manual",
				message: "Usuario o contraseña incorrectos",
			});
		}
	}, [authStatus]);

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
					className='w-full bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-20'
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? (
						<>
							<Loader2 className='mr-2 h-5 w-5 animate-spin' />
							Iniciando sesión
						</>
					) : (
						<>Iniciar Sesión</>
					)}
				</Button>
			</form>
		</Form>
	);
};
