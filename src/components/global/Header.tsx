import Link from "next/link";
import { Button } from "../ui/button";
import { BriefcaseMedical, Hospital } from "lucide-react";

export const Header = () => {
	return (
		<header className='w-full shadow-md'>
			<div className='template-container flex justify-between items-center py-4'>
				<h1 className='text-xl md:text-2xl font-bold flex items-center gap-2 text-balance'>
					<Hospital className='text-teal-600' />
					<span>Hospital Nuestra Sra. De las Mercedes</span>
				</h1>
				<Button
					asChild
					variant='default'
					className='bg-teal-600 hover:bg-teal-700 text-white'
				>
					<Link href='/auth/login' className='flex items-center gap-2'>
						<BriefcaseMedical />
						<span>Área de médicos</span>
					</Link>
				</Button>
			</div>
		</header>
	);
};
