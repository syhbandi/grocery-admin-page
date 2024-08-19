import { BiSort } from "react-icons/bi";
import { Button } from "../ui/button";

const SortButton = () => {
  return (
    <Button variant={"outline"}>
      <BiSort className="mr-1" />
      Sort
    </Button>
  );
};

export default SortButton;
