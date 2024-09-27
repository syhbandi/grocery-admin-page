import { FiFilter } from "react-icons/fi";
import { Button } from "../ui/button";

const FilterButton = () => {
  return (
    <Button variant={"outline"}>
      <FiFilter className="mr-1" />
      Filter
    </Button>
  );
};

export default FilterButton;
