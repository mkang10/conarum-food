"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
  const [goToPage, setGoToPage] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setIsAnimating(true);
    onPageChange(newPage);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleGoToPage = () => {
    const target = Number.parseInt(goToPage);
    if (target >= 1 && target <= totalPages) {
      handlePageChange(target);
      setGoToPage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-5">
      <div className="text-sm text-muted-foreground">
        {itemsPerPage && totalItems ? (
          <>
            Showing {(page - 1) * itemsPerPage + 1} to{" "}
            {Math.min(page * itemsPerPage, totalItems)} of {totalItems} results
          </>
        ) : (
          <>
            Page {page} of {totalPages}
          </>
        )}
      </div>

      <div
        className={`flex items-center gap-2 rounded-full bg-white px-5 py-2.5 shadow-md dark:bg-slate-900 transition-all duration-300 ${
          isAnimating ? "scale-105" : ""
        }`}
      >
        {/* Previous */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, i) => (
            <button
              key={i}
              onClick={() => typeof p === "number" && handlePageChange(p)}
              disabled={p === "..." || p === page}
              className={`h-8 min-w-8 rounded-full px-2 text-sm font-medium transition-all duration-200  ${
                p === page
                  ? "scale-110 bg-blue-600 text-white shadow"
                  : p === "..."
                  ? "cursor-default text-muted-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground disabled:cursor-not-allowed"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Divider */}
        <div className="mx-2 h-6 w-px bg-border" />

        {/* Go to page input */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">Go to</span>
          <Input
            type="number"
            min="1"
            max={totalPages}
            value={goToPage}
            onChange={(e) => setGoToPage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGoToPage()}
            placeholder="Page"
            className="h-8 w-16 rounded-lg border border-border px-2 py-1 text-xs"
          />
          <Button
            onClick={handleGoToPage}
            disabled={
              !goToPage ||
              Number.parseInt(goToPage) < 1 ||
              Number.parseInt(goToPage) > totalPages
            }
            className="h-8 rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Go
          </Button>
        </div>
      </div>
    </div>
  );
}
