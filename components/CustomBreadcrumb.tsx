"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const CustomBreadcrumb = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames?.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <Item
              key={to}
              isLast={index === pathnames.length - 1}
              value={value}
              to={to}
            />
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const Item = ({
  value,
  isLast,
  to,
}: {
  value: any;
  isLast: boolean;
  to: string;
}) => {
  return (
    <>
      <BreadcrumbItem key={to}>
        {isLast ? (
          <BreadcrumbPage>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </BreadcrumbPage>
        ) : (
          <>
            <BreadcrumbLink href={to}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </BreadcrumbLink>
          </>
        )}
      </BreadcrumbItem>
      {!isLast && <BreadcrumbSeparator />}
    </>
  );
};

export default CustomBreadcrumb;
