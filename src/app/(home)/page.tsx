import { ArrowBigDownDash } from "lucide-react";
import { AppointmentResults } from "./ui/AppointmentResults";
import { ConsultCard } from "./ui/ConsultCard";
import { InstructionalVideo } from "./ui/InstructionalVideo";

export default function Home() {
	return (
		<main className='template-container py-10 w-full'>
			<header className='flex flex-col items-center justify-center gap-6'>
				<h1 className='font-bold text-3xl md:text-5xl'>Bienvenidos</h1>
				<p className='text-base md:text-xl text-gray-700 text-center font-semibold'>
					Consulta tus citas médicas de forma fácil y rápida con tu documento de
					indentidad
				</p>
			</header>
			<div className='flex flex-col items-center justify-center gap-4 mt-10'>
				<div className='flex flex-col justify-center gap-2 items-center'>
					<p className='text-xs md:text-sm text-gray-500'>
						Si no sabes cómo consultar tus citas, puedes ver nuestro vídeo
						instructivo.
					</p>
					<ArrowBigDownDash className='w-5 h-5 text-teal-600 hover:text-teal-700 animate-bounce' />
				</div>
				<InstructionalVideo />
			</div>
			<section className='mt-6 md:mt-12'>
				<ConsultCard />
				<AppointmentResults />
			</section>
		</main>
	);
}
