import { menus } from "@/constants/sidebarMenu";
import Link from "next/link";
import SideBarMenu from "./SideBarMenu";

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 min-h-screen bg-neutral-50 shadow-lg shadow-neutral-200">
      <div className="text-3xl font-semibold text-green-700 text-center py-5">
        Grosir
      </div>
      <div className="flex flex-col px-5 gap-2">
        {menus.map((menu, index) => (
          <SideBarMenu menu={menu} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
