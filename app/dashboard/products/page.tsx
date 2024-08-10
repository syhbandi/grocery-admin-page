import { auth } from "@/auth";
import Header from "@/components/Header";
import Search from "@/components/products/Search";
import { TableSkeleton } from "@/components/products/Skeleton";
import ProductsTable from "@/components/products/table";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
        {/* <Pagination className="mt-6 ml-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/dashboard/products?page=${data.meta.current_page - 1}`}
                aria-disabled={data.meta.current_page === 1}
                className={
                  data.meta.current_page === 1
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
            {Array.from(
              { length: Math.ceil(data.meta.total / data.meta.per_page) },
              (_, index) => index + 1
            ).map((val) => (
              <PaginationItem key={val}>
                <PaginationLink
                  href={`/dashboard/products?page=${val}`}
                  aria-disabled={data.meta.current_page === val}
                  className={
                    data.meta.current_page === val
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                >
                  {val}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={`/dashboard/products?page=${data.meta.current_page + 1}`}
                aria-disabled={data.meta.current_page === data.meta.last_page}
                className={
                  data.meta.current_page === data.meta.last_page
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
      </Card>
      {/* {JSON.stringify(data)} */}
    </>
  );
};

export default ProductsPage;
