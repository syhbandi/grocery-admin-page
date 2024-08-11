import CreateProductForm from "@/components/products/CreateProductForm";
import Header from "@/components/Header";
import { Category } from "@/lib/types";

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
  console.log(categories);
  return (
    <div>
      <Header title="Create Product" />
      <CreateProductForm categories={categories} />
    </div>
  );
};

export default CreateProductPage;
