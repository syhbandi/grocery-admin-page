import Header from "@/components/Header";
import UpdateProductForm from "@/components/products/Update-form";
import { Card } from "@/components/ui/card";
import { Product } from "@/lib/types";
import { getCategories } from "../../create/page";
import { getUploads } from "@/components/uploads/UploadList";

type Props = {
  params: {
    id: string;
  };
};

const getProduct = async (id: string): Promise<{ data: Product }> => {
  try {
    const res = await fetch(`${process.env.API_URL}/products/${id}`, {
      method: "get",
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    throw new Error("Failed to load Product with id:" + id);
  }
};

const UpdateProductPage = async ({ params }: Props) => {
  const { data: product } = await getProduct(params.id);
  const { data: categories } = await getCategories();
  return (
    <>
      <Header title="Update Product" />
      <Card className="p-6 w-full lg:w-1/2">
        <UpdateProductForm product={product} categories={categories} />
      </Card>
    </>
  );
};

export default UpdateProductPage;
