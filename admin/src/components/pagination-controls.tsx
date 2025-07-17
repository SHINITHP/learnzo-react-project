"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { getSlidingPages } from "@/lib/pagination-helper";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious
            onClick={handlePrevious}
            className={`${
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            } `}
          />
        </PaginationItem>
        {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={`px-3 ${
                page === currentPage
                  ? "bg-slate-800 text-white border border-slate-700"
                  : " bg-transparent border-0"
              }`}
            >
              {page}
            </Button>
          </PaginationItem>
        ))} */}

        {getSlidingPages(currentPage, totalPages).map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <span className="px-3 py-1 text-sm text-muted-foreground select-none">
                ...
              </span>
            ) : (
              <Button
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(Number(page))}
                className={`px-3 ${
                  page === currentPage
                    ? "bg-slate-800 text-white border border-slate-700"
                    : " bg-transparent border-0"
                }`}
              >
                {page}
              </Button>
            )}
          </PaginationItem>
        ))}

        <PaginationItem className="cursor-pointer">
          <PaginationNext
            onClick={handleNext}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
