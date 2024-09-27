import { auth } from "@/auth";
import SignInForm from "./form";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const session = await auth();

  if (session) return redirect("/dashboard");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary space-y-3">
      <h1 className="text-5xl font-semibold text-green-700">Grosir</h1>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
