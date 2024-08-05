import Header from "@/components/Header";
import Link from "next/link";

const ProductsPage = () => {
  return (
    <div>
      <Header title="Products" />
      <Link href={"/products/create"}>Create product</Link>
    </div>
  );
};

export default ProductsPage;
