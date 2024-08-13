"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upload = async (formData: FormData) => {
  const session = await auth();
  const res = await fetch(`${process.env.API_URL}/uploads`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload image");

  revalidatePath("/dashboard/uploads");
  redirect("/dashboard/uploads");
};
