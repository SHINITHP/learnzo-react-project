export const getSlidingPages = (currentPage: number, totalPages: number): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (totalPages <= 4) {
    // Not enough to paginate
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  if (currentPage <= 2) {
    pages.push(1, 2, 3, "...", totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
  }

  return pages;
}
