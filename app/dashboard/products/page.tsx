import { auth } from "@/auth";
import Header from "@/components/Header";
import Search from "@/components/products/Search";
import { TableSkeleton } from "@/components/products/Skeleton";
import ProductsTable from "@/components/products/Table";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";

interface Props {
  searchParams: {
    page?: string;
    search?: string;
    size?: string;
  };
}

const ProductsPage = async ({ searchParams }: Props) => {
  const { page, search, size } = searchParams;

  return (
    <>
      <Header title="Products" />
      <Card className="p-6 mt-5">
        <CardHeader className="p-0 flex-row items-center space-y-0 space-x-3 mb-3">
          <Search placeholder="Search products" />
          <Link href={"/dashboard/products/create"}>
            <Button>Add Product</Button>
          </Link>
        </CardHeader>
        <Suspense fallback={<TableSkeleton />}>
          <ProductsTable page={page} search={search} size={size} />
        </Suspense>
      </Card>
    </>
  );
};

export default ProductsPage;
