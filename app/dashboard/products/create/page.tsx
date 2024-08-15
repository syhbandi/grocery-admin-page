import CreateProductForm from "@/components/products/Create-form";
import Header from "@/components/Header";
import { Category } from "@/lib/types";
import { getUploads } from "@/components/uploads/UploadList";

export const getCategories = async (): Promise<{ data: Category[] }> => {
  try {
    const res = await fetch(`${process.env.API_URL}/categories?no_paginate`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    throw new Error("Failed to load categories");
  }
};

const CreateProductPage = async () => {
  const { data: categories } = await getCategories();
  const { data: images } = await getUploads();
  return (
    <div>
      <Header title="Create Product" />
      <CreateProductForm categories={categories} images={images} />
    </div>
  );
};

export default CreateProductPage;
