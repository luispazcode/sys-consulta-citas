import Link from "next/link";
import { Button } from "../ui/button";
import { BriefcaseMedical } from "lucide-react";

export const Header = () => {
	return (
		<header className='container-section w-full'>
			<div className='flex justify-between items-center py-4'>
				<h1 className='text-xl md:text-2xl font-bold'>
					H. Las Mercedes | Consultas
				</h1>
				<Button asChild variant='default'>
					<Link href='/auth/login' className='flex items-center gap-2'>
						<BriefcaseMedical />
						<span>Área de médicos</span>
					</Link>
				</Button>
			</div>
		</header>
	);
};
