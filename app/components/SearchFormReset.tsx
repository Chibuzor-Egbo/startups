"use client";
import React from "react";
import { Eraser } from "lucide-react";
import Link from "next/link";

const SearchFormReset = () => {
  const handleReset = () => {
    console.log("clicked");
    const form = document.getElementById("searcher") as HTMLFormElement;
    console.log(form);
    if (form) {
      form.reset();
    }
  };
  return (
    <button className="cursor-pointer" type="reset" onClick={handleReset}>
      <Link href="/">
        <Eraser />
      </Link>
    </button>
  );
};

export default SearchFormReset;
