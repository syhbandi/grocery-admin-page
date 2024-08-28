import { Order } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { currencyFormat, dateFormat, getRowNumber } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { FiEye } from "react-icons/fi";
import CustomPagination from "../Pagination";
import { auth } from "@/auth";
import { Badge } from "../ui/badge";
import OrderStatus from "./OrderStatusBadge";

type Props = {
  page?: string;
  size?: string;
  search?: string;
};

type Response = {
  data: Order[];
  meta: {
    per_page: number;
    total: number;
    current_page: number;
  };
};
const getOrders = async (
  page?: string,
  size?: string,
  search?: string
): Promise<Response> => {
  const session = await auth();
  const url = `${process.env.API_URL}/orders`;
  const params = new URLSearchParams();

  console.log(url);
  if (page) params.set("page", page);
  if (size) params.set("size", size);
  if (search) params.set("search", search);

  try {
    const res = await fetch(`${url}?${params.toString()}`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${session?.user?.token}` },
    });
    return await res.json();
  } catch (error) {
    throw new Error("Failed to load Products");
  }
};

const OrdersTable = async ({ page, size, search }: Props) => {
  const { data: orders, meta } = await getOrders(page, size, search);
  return (
    <>
      <Table className="border border-neutral-200">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.length ? (
            orders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>
                  {getRowNumber(meta.current_page, meta.per_page, index)}
                </TableCell>

                <TableCell>{order.user.full_name}</TableCell>
                <TableCell>{dateFormat(new Date(order.date))}</TableCell>
                <TableCell>
                  {currencyFormat(Number(order.total_price))}
                </TableCell>
                <TableCell className="space-x-2">
                  <OrderStatus status={order.status} />
                </TableCell>
                <TableCell className="space-x-2">
                  <Link href={`/dashboard/orders/${order.id}`}>
                    <Button variant={"outline"}>
                      <FiEye className="mr-1" />
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-5">
        <CustomPagination totalPages={Math.ceil(meta.total / meta.per_page)} />
      </div>
    </>
  );
};

export default OrdersTable;
