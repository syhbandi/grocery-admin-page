import { CategoriesTableSkeleton } from "@/components/categories/Skeleton";
import CategoriesTable from "@/components/categories/Table";
import Header from "@/components/Header";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";

type Props = {
  searchParams: {
    page?: string;
    search?: string;
    size?: string;
  };
};

const CategoriesPage = ({ searchParams }: Props) => {
  const { page, search, size } = searchParams;
  return (
    <>
      <Header title="Categories" />
      <Card>
        <CardHeader className="flex-row items-center space-y-0 space-x-2">
          <Search placeholder="Search categories" />
          <Link href={"/dashboard/categories/create"}>
            <Button>Add Category</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<CategoriesTableSkeleton />}>
            <CategoriesTable page={page} search={search} size={size} />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
};

export default CategoriesPage;
