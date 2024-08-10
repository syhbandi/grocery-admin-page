"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { useDebouncedCallback } from "use-debounce";

type Props = {
  placeholder: string;
};

const Search = ({ placeholder }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="h-9 px-3 flex-1 flex items-center space-x-2 border border-neutral-300 rounded-lg focus-within:border-primary">
      <input
        id="search"
        name="search"
        type="search"
        className="outline-none flex-1 peer placeholder:text-sm"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
      />
      <FiSearch className="text-neutral-300 peer-focus:text-primary" />
    </div>
  );
};

export default Search;
