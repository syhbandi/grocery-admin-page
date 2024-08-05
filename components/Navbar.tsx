import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <div className="flex items-center px-10 py-4 bg-white shadow shadow-neutral-200">
      <div className="ml-auto flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-primary font-medium">Administrator</div>
          <div className="text-sm text-secondary-foreground">
            admin@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
