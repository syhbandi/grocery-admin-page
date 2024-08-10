import { auth } from "@/auth";
import ProductTable from "@/components/products/ProductTable";
import Header from "@/components/Header";
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
    page: string;
    search: string;
  };
}

const getProducts = async (page: string) => {
  const session = await auth();
  let url = `${process.env.API_URL}/products`;

  if (page) {
    url += `?page=${page}`;
  }

  const res = await fetch(url, {
    method: "get",
    headers: { Authorization: "bearer " + session?.user?.token },
    cache: "no-store",
  });
  return await res.json();
};

const ProductsPage = async ({ searchParams }: Props) => {
  const { page, search } = searchParams;
  const data = await getProducts(page);

  return (
    <>
      <Header title="Products" />
      <Card className="p-6 mt-5">
        <CardHeader className="p-0 flex-row items-center space-y-0 space-x-3 mb-3">
          <Input />
          <Link href={"/dashboard/products/create"}>
            <Button>Add Product</Button>
          </Link>
        </CardHeader>
        <ProductTable data={data.data} />
        <div className="flex items-center justify-between">
          <div>tes</div>
          <Pagination className="mt-6 ml-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/dashboard/products?page=${
                    data.meta.current_page - 1
                  }`}
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
                  href={`/dashboard/products?page=${
                    data.meta.current_page + 1
                  }`}
                  aria-disabled={data.meta.current_page === data.meta.last_page}
                  className={
                    data.meta.current_page === data.meta.last_page
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
      {/* {JSON.stringify(data)} */}
    </>
  );
};

export default ProductsPage;
