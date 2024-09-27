import { auth } from "@/auth";
import Header from "@/components/Header";
import Search from "@/components/Search";
import { ProductsTableSkeleton } from "@/components/products/Skeleton";
import ProductsTable from "@/components/products/Table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
      <Card className="">
        <CardHeader className="flex-row items-center space-y-0 space-x-2">
          <Search placeholder="Search products" />
          <Link href={"/dashboard/products/create"}>
            <Button>Add Product</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<ProductsTableSkeleton />}>
            <ProductsTable page={page} search={search} size={size} />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductsPage;
