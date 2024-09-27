"use server";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const PATH = "/dashboard/categories";

export async function createCategory(data: any) {
  const session = await auth();
  await fetch(`${process.env.API_URL}/categories`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidatePath(PATH);
  redirect(PATH);
}

export async function updateCategory(id: string, data: any) {
  const session = await auth();
  await fetch(`${process.env.API_URL}/categories/${id}`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidatePath(PATH);
  redirect(PATH);
}
export async function deleteCategory(id: string) {
  const session = await auth();
  await fetch(`${process.env.API_URL}/categories/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
      "Content-Type": "application/json",
    },
  });
  revalidatePath(PATH);
  redirect(PATH);
}
