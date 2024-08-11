import {
  AiOutlineDashboard,
  AiOutlineProduct,
  AiOutlineUser,
} from "react-icons/ai";
import { FiLogOut, FiShoppingBag } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
export interface MenuInterface {
  href: string;
  title: string;
  icon?: React.ReactNode;
}

export const menus: MenuInterface[] = [
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: <AiOutlineDashboard className="text-2xl" />,
  },
  {
    href: "/dashboard/products",
    title: "Products",
    icon: <AiOutlineProduct className="text-2xl" />,
  },
  {
    href: "/dashboard/categories",
    title: "Categories",
    icon: <BiCategory className="text-2xl" />,
  },
  {
    href: "/dashboard/orders",
    title: "Orders",
    icon: <FiShoppingBag className="text-2xl" />,
  },
  {
    href: "/dashboard/users",
    title: "Users",
    icon: <AiOutlineUser className="text-2xl" />,
  },
  {
    href: "/signout",
    title: "Sign Out",
    icon: <FiLogOut className="text-2xl" />,
  },
];
