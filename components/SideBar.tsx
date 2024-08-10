import { menus } from "@/constants/sidebarMenu";
import Link from "next/link";
import SideBarMenu from "./SideBarMenu";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "@/auth";
import { doSignOut } from "@/lib/actions";

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
        <form
          action={async () => {
            "use server";
            await doSignOut();
          }}
        >
          <button
            type="submit"
            className="flex gap-4 items-center hover:bg-green-700 hover:text-white px-4 py-3 rounded-lg font-medium w-full text-neutral-800"
          >
            <FiLogOut className="text-2xl" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
};

export default SideBar;
