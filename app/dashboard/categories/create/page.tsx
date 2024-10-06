import CreateCategoryForm from "@/components/categories/Create-form";
import Header from "@/components/Header";
import { getUploads } from "@/components/uploads/UploadList";

const CreateCategoriesPage = async () => {
  const { data: images } = await getUploads();
  return (
    <>
      <Header title="Create Category" />
      <CreateCategoryForm />
    </>
  );
};

export default CreateCategoriesPage;
