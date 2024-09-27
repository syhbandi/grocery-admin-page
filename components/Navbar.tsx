import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="flex items-center px-10 py-4">
      <div className="ml-auto flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-secondary-foreground font-semibold text-sm">
            {session?.user?.full_name}
          </div>
          <div className="text-xs text-neutral-400">{session?.user?.role}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
