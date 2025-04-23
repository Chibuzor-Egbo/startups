import React from "react";
import Form from "next/form";
import { Search } from "lucide-react";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className="relative" id="searcher">
      <input
        type="text"
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className="rounded-full indent-[10px] bg-neutral-200 outline-none pr-12 py-2 border-4 border-black font-semibold"
      />
      <div className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center gap-2">
        {query && <SearchFormReset />}
        <button type="submit" className=" cursor-pointer">
          <Search />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
