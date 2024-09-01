import { AppointmentResults } from "./ui/AppointmentResults";
import { ConsultCard } from "./ui/ConsultCard";

export default function Home() {
	return (
		<main className='template-container py-10 w-full'>
			<header className='flex flex-col items-center justify-center gap-6'>
				<h1 className='font-bold text-4xl'>Bienvenidos</h1>
				<p className='text-lg text-gray-700 text-center'>
					Consulta tus citas médicas de forma fácil y rápida con tu documento de
					indentidad
				</p>
			</header>
			<section className='mt-6 md:mt-12'>
				<ConsultCard />
				<AppointmentResults />
			</section>
		</main>
	);
}
