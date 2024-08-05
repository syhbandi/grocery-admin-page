import {
  AiOutlineDashboard,
  AiOutlineProduct,
  AiOutlineUser,
} from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
export interface MenuInterface {
  href: string;
  title: string;
  icon?: React.ReactNode;
}

export const menus: MenuInterface[] = [
  {
    href: "/",
    title: "Dashboard",
    icon: <AiOutlineDashboard className="text-2xl" />,
  },
  {
    href: "/products",
    title: "Products",
    icon: <AiOutlineProduct className="text-2xl" />,
  },
  {
    href: "/categories",
    title: "Categories",
    icon: <BiCategory className="text-2xl" />,
  },
  {
    href: "/orders",
    title: "Orders",
    icon: <FiShoppingBag className="text-2xl" />,
  },
  {
    href: "/users",
    title: "Users",
    icon: <AiOutlineUser className="text-2xl" />,
  },
];
