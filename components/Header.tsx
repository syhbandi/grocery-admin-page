import CustomBreadcrumb from "./CustomBreadcrumb";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <h1 className="text-2xl text-secondary-foreground font-semibold">
        {title}
      </h1>
      <CustomBreadcrumb />
    </div>
  );
};

export default Header;
