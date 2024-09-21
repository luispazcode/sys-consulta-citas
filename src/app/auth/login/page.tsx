import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {
	return (
		<main className='min-h-screen flex items-center justify-center'>
			<Card className='w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden'>
				<CardHeader className='bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white text-center'>
					<CardTitle className='text-2xl font-bold'>Inicio de Sesión</CardTitle>
				</CardHeader>
				<CardContent className='p-6'>
					<LoginForm />
				</CardContent>
				<CardFooter className='bg-gray-50 dark:bg-gray-700 p-6 flex flex-col gap-2 items-start'>
					{/* <p className='text-sm text-gray-600 dark:text-gray-400'>
						¿No tiene una cuenta?{" "}
						<Link href='#' className='text-teal-600 hover:underline'>
							Contacte al administrador
						</Link>
					</p> */}
					<p className='text-sm text-gray-600 dark:text-gray-400'>
						¿Quiere saber más de su cita?{" "}
						<Link href='/' className='text-teal-600 hover:underline'>
							Ingrese a nuestro portal web
						</Link>
					</p>
				</CardFooter>
			</Card>
		</main>
	);
}
