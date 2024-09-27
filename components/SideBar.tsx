import { menus } from "@/constants/sidebarMenu";
import SideBarMenu from "./SideBarMenu";
import { ScrollArea } from "./ui/scroll-area";

const SideBar = () => {
  return (
    <div className="hidden lg:block fixed top-0 left-0 w-64 h-screen bg-neutral-50 shadow-lg shadow-neutral-200">
      <ScrollArea className="h-full">
        <div className="text-3xl font-semibold text-green-700 text-center py-5">
          Grosir
        </div>
        <div className="flex flex-col px-5 gap-2">
          {menus.map((menu, index) => (
            <SideBarMenu menu={menu} key={index} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default SideBar;
