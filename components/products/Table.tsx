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
import { FiDelete, FiEdit2, FiEye, FiTrash } from "react-icons/fi";
import CustomPagination from "../Pagination";
import DeleteProductButton from "./DeleteButton";
import { currencyFormat, getRowNumber, numberFormat } from "@/lib/utils";
import Image from "next/image";

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
            <TableHead>Categories</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.length ? (
            data.data.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>
                  {getRowNumber(
                    data.meta.current_page,
                    data.meta.per_page,
                    index
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="space-x-2">
                  {product.categories.slice(0, 2).map((categoy) => (
                    <span
                      key={categoy.id}
                      className="p-1 rounded-lg border border-neutral-300"
                    >
                      {categoy.name}
                    </span>
                  ))}
                  {product.categories.length > 2 && (
                    <> and {product.categories.length - 2} more</>
                  )}
                </TableCell>
                <TableCell>{currencyFormat(product.price)}</TableCell>
                <TableCell>{numberFormat(product.stock)}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>
                  {product.images.map((image) => (
                    <Image
                      key={image.id}
                      alt="product image"
                      src={`${process.env.ASSETS_URL}/${image.url}`}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                  ))}
                </TableCell>
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
              <TableCell colSpan={8} className="text-center">
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
