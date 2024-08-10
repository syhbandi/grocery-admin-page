"use server";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Email or Password wrong";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function doSignOut() {
  const session = await auth();
  await fetch(`${process.env.API_URL}/user`, {
    method: "delete",
    headers: { Authorization: `Bearer ${session?.user?.token}` },
  });
  await signOut({ redirectTo: "/" });
  redirect("/");
}
