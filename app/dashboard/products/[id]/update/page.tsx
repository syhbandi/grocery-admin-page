import Header from "@/components/Header";
import { Product } from "@/lib/types";

type Props = {
  params: {
    id: string;
  };
};

const getProduct = async (id: string): Promise<{ data: Product }> => {
  try {
    const res = await fetch(`${process.env.API_URL}/products/${id}`, {
      method: "get",
    });
    return await res.json();
  } catch (error) {
    throw new Error("Failed to load Product with id:" + id);
  }
};

const UpdateProductPage = async ({ params }: Props) => {
  const data = await getProduct(params.id);
  return (
    <>
      <Header title="Update Product" />
      {JSON.stringify(data.data.id)}
    </>
  );
};

export default UpdateProductPage;
