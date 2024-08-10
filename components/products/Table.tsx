import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/lib/types";
import Link from "next/link";
import { FiDelete, FiEdit2, FiTrash } from "react-icons/fi";
import CustomPagination from "../Pagination";
import DeleteProductButton from "./DeleteButton";

type Props = {
  page?: string;
  size?: string;
  search?: string;
};

type Response = {
  data: Product[];
  meta: {
    per_page: number;
    total: number;
    current_page: number;
  };
};

const getProducts = async (
  page?: string,
  size?: string,
  search?: string
): Promise<Response> => {
  const url = `${process.env.API_URL}/products`;
  const params = new URLSearchParams();

  if (page) params.set("page", page);
  if (size) params.set("size", size);
  if (search) params.set("search", search);

  try {
    const res = await fetch(`${url}?${params.toString()}`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    throw new Error("Failed to load Products");
  }
};

const ProductsTable = async ({ page, size, search }: Props) => {
  const data = await getProducts(page, size, search);
  return (
    <>
      <Table className="border border-neutral-200">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.length ? (
            data.data.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>
                  {data.meta.current_page * data.meta.per_page -
                    data.meta.per_page +
                    index +
                    1}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="space-x-2">
                  <Link href={`/dashboard/products/${product.id}/update`}>
                    <Button size={"icon"} variant={"outline"}>
                      <FiEdit2 />
                    </Button>
                  </Link>
                  <DeleteProductButton id={product.id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-5">
        <CustomPagination
          totalPages={Math.ceil(data.meta.total / data.meta.per_page)}
        />
      </div>
    </>
  );
};

export default ProductsTable;
