import Header from "@/components/Header";
import FilterButton from "@/components/orders/Filter";
import SortButton from "@/components/orders/Sort";
import OrdersTable from "@/components/orders/Table";
import Search from "@/components/Search";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Suspense } from "react";

interface Props {
  searchParams: {
    page?: string;
    search?: string;
    size?: string;
  };
}

const OrdersPage = ({ searchParams }: Props) => {
  const { page, search, size } = searchParams;
  return (
    <>
      <Header title="Orders" />
      <Card>
        <CardHeader className="flex-row space-y-0 space-x-2">
          <Search placeholder="Search User" />
          <SortButton />
          <FilterButton />
        </CardHeader>
        <CardContent>
          <Suspense fallback={"loading"}>
            <OrdersTable page={page} search={search} size={size} />
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
};

export default OrdersPage;
