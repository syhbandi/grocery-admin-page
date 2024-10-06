import CreateCategoryForm from "@/components/categories/Create-form";
import Header from "@/components/Header";

const CreateCategoriesPage = async () => {
  return (
    <>
      <Header title="Create Category" />
      <CreateCategoryForm />
    </>
  );
};

export default CreateCategoriesPage;
