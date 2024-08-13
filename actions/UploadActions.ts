"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const PATH = "/dashboard/uploads";

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

  revalidatePath(PATH);
  redirect(PATH);
};

export const deleteImage = async (id: string) => {
  const session = await auth();
  const res = await fetch(`${process.env.API_URL}/uploads/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete image");

  revalidatePath(PATH);
  redirect(PATH);
};
