import { auth } from "@/auth";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const session = await auth();

  if (session) return redirect("/dashboard");
  return redirect("/api/auth/signin");
};

export default HomePage;
