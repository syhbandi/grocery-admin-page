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
import { getRowNumber } from "@/lib/utils";
import DeleteCategoryButton from "./DeleteButton";
import Image from "next/image";

type Props = {
  page?: string;
  size?: string;
  search?: string;
};

type Response = {
  data: Category[];
  meta: {
    current_page: number;
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
      <Table className="border ">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.length ? (
            data.data.map((category, index) => (
              <TableRow key={category.id}>
                <TableCell>
                  {getRowNumber(
                    data.meta.current_page,
                    data.meta.per_page,
                    index
                  )}
                </TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  {category.images.map((image) => (
                    <Link
                      key={image.id}
                      href={`/dashboard/uploads/${image.id}`}
                    >
                      <Image
                        src={`${process.env.ASSETS_URL}/${image.url}`}
                        alt="image"
                        width={50}
                        height={50}
                      />
                    </Link>
                  ))}
                </TableCell>
                <TableCell className="space-x-2">
                  <Link href={`/dashboard/categories/${category.id}/update`}>
                    <Button size={"icon"} variant={"outline"}>
                      <FiEdit2 />
                    </Button>
                  </Link>
                  <DeleteCategoryButton id={category.id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-foreground">
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
