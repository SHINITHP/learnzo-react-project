"use client";

import { Input } from "./ui/input";

export default function SearchBox() {
  
  return (
    <form className="w-[100%] mx-auto">
      <label
        htmlFor="default-search"
        className="text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative w-full flex justify-start">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <Input
          type="search"
          className="block w-full h-12 ps-10 text-sm text-gray-900 border border-gray-300 rounded-4xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search Mockups, Logos..."
          required
        />
        <button
          type="submit"
          className=" text-lg text-white cursor-pointer transition-all duration-300 ease-in-out absolute h-full right-0 top-0 w-28 bg-[#2F4021] focus:ring-4 focus:outline-none rounded-4xl focus:ring-blue-300 font-medium px-4 py-2 "
        >
          Search
        </button>
      </div>
    </form>
  );
}
