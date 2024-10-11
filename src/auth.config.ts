import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

const protectedRoutes = [
	"/dashboard/appointments",
	"/dashboard/doctors",
	"/dashboard/patients",
	"/dashboard/specialties",
];

const authenticationRoutes = ["/auth/login"];

export const authConfig: NextAuthConfig = {
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const authRoutes = authenticationRoutes.some((item) =>
				nextUrl.pathname.includes(item)
			);
			const routes = protectedRoutes.some((item) =>
				nextUrl.pathname.includes(item)
			);

			if (isLoggedIn && authRoutes) {
				return Response.redirect(new URL("/dashboard/appointments", nextUrl));
			}

			if (!isLoggedIn && routes) {
				return Response.redirect(
					new URL(`/auth/login?origin=${nextUrl.pathname}`, nextUrl)
				);
			}
			return true;
		},
		jwt({ token, user }) {
			if (user) {
				token.data = user;
			}
			return token;
		},
		session({ session, token, user }) {
			session.user = token.data as any;
			return session;
		},
	},

	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({
						username: z.string().min(5, {
							message: "El usuario debe tener al menos 5 caracteres",
						}),
						password: z.string().min(6, {
							message: "La contraseña debe tener al menos 6 caracteres",
						}),
					})
					.safeParse(credentials);
				if (!parsedCredentials.success) {
					return null;
				}
				const { username, password } = parsedCredentials.data;

				// Buscar el usuario en la base de datos
				const user = await prisma.user.findUnique({
					where: {
						username: username,
					},
				});
				if (!user) return null;

				// Verificar la contraseña
				if (!bcryptjs.compareSync(password, user.password)) return null;

				// Regresar el usuario sin el password
				const { password: _, ...rest } = user;
				return rest;
			},
		}),
	],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
