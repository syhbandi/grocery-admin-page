import { auth } from "@/auth";
import Header from "@/components/Header";
import OrderStatus from "@/components/orders/OrderStatusBadge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/lib/types";
import { currencyFormat, dateFormat, numberFormat } from "@/lib/utils";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

type Response = {
  data: Order;
};

const getOrder = async (id: string): Promise<Response> => {
  const session = await auth();
  try {
    const response = await fetch(`${process.env.API_URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to load order data");
  }
};

const OrderItemsPage = async ({ params }: Props) => {
  const { id } = params;
  const { data: order } = await getOrder(id);
  return (
    <>
      <Header title={`Order #${id}`} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="col-span-2 space-y-5">
          <Card className="p-6 ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Items</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>QTY</TableHead>
                  <TableHead>SubTotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="flex items-center gap-3">
                      <Image
                        alt="product image"
                        src={`${process.env.ASSETS_URL}/${item.product.images[0].url}`}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                      {item.product.name}
                    </TableCell>
                    <TableCell>{currencyFormat(Number(item.price))}</TableCell>
                    <TableCell>{numberFormat(Number(item.quantity))}</TableCell>
                    <TableCell>
                      {currencyFormat(
                        Number(item.quantity) * Number(item.price)
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <Card>
            <CardHeader className="font-semibold">Customer summary</CardHeader>
            <CardContent>
              <ul>
                <li className="flex items-center justify-between py-5 border-b border-neutral-300">
                  <span>Username</span>
                  <span className="font-medium">@{order.user.username}</span>
                </li>
                <li className="flex items-center justify-between py-5 border-b border-neutral-300">
                  <span>Name</span>
                  <span className="font-medium">{order.user.full_name}</span>
                </li>
                <li className="flex items-center justify-between py-5">
                  <span>Email</span>
                  <span className="font-medium">{order.user.email}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-5">
          <Card>
            <CardHeader className="font-semibold">Order Summary</CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>Order Status</div>
                <OrderStatus status={order.status} />
              </div>
              <div className="flex items-center justify-between">
                <div>Order created</div>
                <div>{dateFormat(new Date(order.date))}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Subtotal</div>
                <div>{currencyFormat(Number(order.total_price))}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="font-semibold flex-row items-center justify-between">
              <span>Total</span>
              <span>{currencyFormat(Number(order.total_price))}</span>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderItemsPage;
