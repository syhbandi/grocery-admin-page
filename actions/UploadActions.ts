"use server";

import { auth } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";

const PATH = "/dashboard/uploads";

export const upload = async (formData: FormData, isUploadPage?: boolean) => {
  const session = await auth();
  const res = await fetch(`${process.env.API_URL}/uploads`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload image");

  if (isUploadPage) revalidatePath(PATH);

  return await res.json();
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
};
