"use server";

import { LoginFormValues } from "@/app/auth/login/ui/LoginForm";
import { signIn } from "@/auth.config";

export async function authenticate(
	prevState: String | undefined,
	formData: LoginFormValues
) {
	try {
		await signIn("credentials", {
			redirect: false,
			username: formData.username,
			password: formData.password,
		});
		return "SUCCESS";
	} catch (error) {
		if ((error as any).type === "CredentialsSignin") {
			return "INCORRECT_CREDENTIALS";
		}
		return "UNKNOWN_ERROR";
	}
}
