import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { PlaySquareIcon } from "lucide-react";

export const InstructionalVideo = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='bg-teal-600 hover:bg-teal-700 text-white'>
					<PlaySquareIcon className='w-5 h-5 mr-2' />
					Vídeo instructivo
				</Button>
			</DialogTrigger>
			<DialogContent className='md:max-w-5xl max-h-screen'>
				<DialogHeader className='items-center'>
					<DialogTitle>Vídeo instructivo</DialogTitle>
					<DialogDescription>
						Este vídeo es un ejemplo de cómo puedes obtener información de tu
						cita con tu DNI.
					</DialogDescription>
				</DialogHeader>
				<section className='py-4 flex flex-col items-center justify-center gap-4'>
					<video src='/instructional.mp4' controls className='w-full' />
				</section>
			</DialogContent>
		</Dialog>
	);
};
