import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const users = await prisma.user.findMany();
		if (users.length > 0) {
			await prisma.user.deleteMany();
		}
		// await prisma.user.create({
		// 	data: {
		// 		name: "Admin",
		// 		username: "admin",
		// 		password: bcryptjs.hashSync("123456admin", 10),
		// 		role: "ADMIN",
		// 	},
		// });
		await prisma.user.createMany({
			data: [
				{
					name: "Margarita",
					username: "margarita",
					password: bcryptjs.hashSync("123456margarita", 10),
					role: "ADMIN",
				},
				{
					name: "Sarita",
					username: "sarita",
					password: bcryptjs.hashSync("123456sarita", 10),
					role: "ADMIN",
				},
			],
		});
		return NextResponse.json(
			{ message: "User created successfully" },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
