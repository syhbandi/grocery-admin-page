import { Category } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CustomPagination from "../Pagination";
import Link from "next/link";
import { Button } from "../ui/button";
import { FiEdit2 } from "react-icons/fi";

type Props = {
  page?: string;
  size?: string;
  search?: string;
};

type Response = {
  data: Category[];
  meta: {
    per_page: number;
    total: number;
  };
};

const getCategories = async (
  page?: string,
  size?: string,
  search?: string
): Promise<Response> => {
  const url = `${process.env.API_URL}/categories`;
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
    throw new Error("Failed to load categories");
  }
};

const CategoriesTable = async ({ page, search, size }: Props) => {
  const data = await getCategories(page, size, search);
  return (
    <>
      <Table className="border border-neutral-300">
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>name</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.length ? (
            data.data.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/categories/${category.id}/update`}>
                    <Button variant={"ghost"} size={"sm"}>
                      <FiEdit2 />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-foreground">
                No data found
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

export default CategoriesTable;
