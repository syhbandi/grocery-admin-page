import { auth } from "@/auth";
import Header from "@/components/Header";
import Link from "next/link";

const ProductsPage = async () => {
  const session = await auth();
  const res = await fetch(`${process.env.API_URL}/products`, {
    method: "get",
    headers: { Authorization: "bearer " + session?.user?.token },
  });
  const data = await res.json();
  return (
    <div>
      <Header title="Products" />
      <Link href={"/dashboard/products/create"}>Create product</Link>
      {res.statusText}
      {JSON.stringify(data)}
    </div>
  );
};

export default ProductsPage;
