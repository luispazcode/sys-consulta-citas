import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
	return (
		<main className='min-h-screen flex items-center justify-center'>
			<Card className='w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden'>
				<CardHeader className='bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white text-center'>
					<CardTitle className='text-2xl font-bold'>Inicio de Sesión</CardTitle>
				</CardHeader>
				<CardContent className='p-6'>
					<form
						// onSubmit={handleLogin}
						className='space-y-4'
					>
						<div className='space-y-2'>
							<Label
								htmlFor='username'
								className='text-gray-700 dark:text-gray-300'
							>
								Nombre de usuario
							</Label>
							<div className='relative'>
								<UserIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
								<Input
									id='username'
									type='text'
									placeholder='Ingrese su nombre de usuario'
									// value={username}
									// onChange={(e) => setUsername(e.target.value)}
									className='pl-10 w-full'
									required
								/>
							</div>
						</div>
						<div className='space-y-2'>
							<Label
								htmlFor='password'
								className='text-gray-700 dark:text-gray-300'
							>
								Contraseña
							</Label>
							<div className='relative'>
								<LockIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
								<Input
									id='password'
									type='password'
									placeholder='Ingrese su contraseña'
									// value={password}
									// onChange={(e) => setPassword(e.target.value)}
									className='pl-10 w-full'
									required
								/>
							</div>
						</div>
						<Button
							type='submit'
							className='w-full bg-teal-600 hover:bg-teal-700 text-white'
						>
							Iniciar Sesión
						</Button>
					</form>
				</CardContent>
				<CardFooter className='bg-gray-50 dark:bg-gray-700 p-6 text-center'>
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						¿No tiene una cuenta?{" "}
						<Link href='#' className='text-teal-600 hover:underline'>
							Contacte al administrador
						</Link>
					</p>
				</CardFooter>
			</Card>
		</main>
	);
}
