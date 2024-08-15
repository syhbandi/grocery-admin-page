import UpdateCategoryForm from "@/components/categories/Update-form";
import Header from "@/components/Header";
import { getUploads } from "@/components/uploads/UploadList";
import { Category } from "@/lib/types";

type Props = {
  params: {
    id: string;
  };
};

type Response = {
  data: Category;
};

const getCategory = async (id: string): Promise<Response> => {
  try {
    const res = await fetch(`${process.env.API_URL}/categories/${id}`, {
      method: "get",
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    throw new Error("Failed to get category");
  }
};

const UpdateCategoryPage = async ({ params }: Props) => {
  const { id } = params;
  const { data: category } = await getCategory(id);
  const { data: images } = await getUploads();
  return (
    <>
      <Header title="Update Category" />
      <UpdateCategoryForm category={category} images={images} />
    </>
  );
};

export default UpdateCategoryPage;
