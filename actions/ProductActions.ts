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
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function updateProduct(id: string, formData: any) {
  const session = await auth();
  await fetch(`${process.env.API_URL}/products/${id}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(id: string) {
  const session = await auth();
  await fetch(`${process.env.API_URL}/products/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      "Content-Type": "application/json",
    },
  });
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
