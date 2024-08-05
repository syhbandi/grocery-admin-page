import CustomBreadcrumb from "./CustomBreadcrumb";

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl text-primary font-semibold">{title}</h1>
      <CustomBreadcrumb title={title} />
    </div>
  );
};

export default Header;
