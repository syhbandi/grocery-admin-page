"use client";

import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const ProductsTableSkeleton = () => {
  return (
    <Table className="border border-neutral-200">
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }, (_, index) => index++).map((value) => (
          <TableRow key={value}>
            <TableCell className="w-[150px]">
              <Skeleton className="h-[20px] w-full rounded-full bg-secondary" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-[20px] w-full rounded-full bg-secondary" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-[20px] w-full rounded-full bg-secondary" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-[20px] w-full rounded-full bg-secondary" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-[20px] w-full rounded-full bg-secondary" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
