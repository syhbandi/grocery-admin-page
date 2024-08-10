"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: any) {
  const session = await auth();
  await fetch(`${process.env.API_URL}/products`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  revalidatePath("/products");
  redirect("/products");
}
