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
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";

interface Data {
  id: string;
  name: string;
  price: string;
  stock: string;
  image: string;
}

const ProductTable = ({ data }: { data: Data[] }) => {
  return (
    <Table className="border border-neutral-200">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>
              <Link href={`/dashboard/products/${product.id}/update`}>
                <Button variant={"ghost"}>
                  <FiEdit2 />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
