import { menus } from "@/constants/sidebarMenu";
import Link from "next/link";
import SideBarMenu from "./SideBarMenu";
import { FiLogOut } from "react-icons/fi";

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 overflow-auto w-64 h-screen bg-neutral-50 shadow-lg shadow-neutral-200">
      <div className="text-3xl font-semibold text-green-700 text-center py-5">
        Grosir
      </div>
      <div className="flex flex-col px-5 gap-2">
        {menus.map((menu, index) => (
          <SideBarMenu menu={menu} key={index} />
        ))}
        <Link
          href={"/api/auth/signout"}
          className="w-full flex gap-4 items-center hover:bg-green-700 hover:text-white px-4 py-3 rounded-lg font-medium text-neutral-800"
        >
          <FiLogOut className="text-xl" />
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
