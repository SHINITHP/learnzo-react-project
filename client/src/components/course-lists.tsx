import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseCard from "./course-cards";
import { FilterPanel, type FilterState } from "@/components/FilterPanel";
import { Badge } from "@/components/ui/badge";
import { useGetCoursesQuery } from "@/services/courseApi";
import NotFound from "./not-found";
import type { ICourse } from "@/types";
import { PaginationControls } from "./pagination-controls";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

// Mock data for courses

const CoursesList = () => {
  const { data, isLoading } = useGetCoursesQuery();
  const courses = data?.data;

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    difficulty: [],
    price: [],
    duration: [],
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses = useMemo((): ICourse[] => {
    if (!courses) return [];
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(course.categoryId?.name);

      const matchesDifficulty =
        filters.difficulty.length === 0 ||
        filters.difficulty.includes(course.difficultyLevel || "");

      const matchesPrice =
        filters.price.length === 0 ||
        filters.price.includes(course.price ? "Free" : "Paid");

      const matchesDuration =
        filters.duration.length === 0 ||
        filters.duration.includes(course.hours || "");

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty &&
        matchesPrice &&
        matchesDuration
      );
    });
  }, [searchQuery, filters, courses]);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 />
      </div>
    );
  }

  if (!courses) {
    return <NotFound />;
  }

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      difficulty: [],
      price: [],
      duration: [],
    });
  };

  const activeFiltersCount = Object.values(filters).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  return (
    <div className="min-h-screen bg-[#F8F9F5] py-28">
      {/* Header */}
      <div className="bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Explore Courses
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover {courses.length} courses to advance your skills
              </p>
            </div>

            {/* Search and View Controls */}
            <div className="flex flex-col sm:flex-row gap-3 lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                {/* Mobile Filter Toggle */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="lg:hidden relative"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      {activeFiltersCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <FilterPanel
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                      onClearFilters={handleClearFilters}
                      className="border-0 shadow-none"
                    />
                  </SheetContent>
                </Sheet>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex border border-border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 bg-transparent">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 bg-[#F8F9F5]">
              <FilterPanel
                className="bg-transparent border border-gray-300 p-6"
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </aside>

          {/* Courses Grid */}
          <main className="flex-1">
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredCourses?.length} of {courses.length} courses
                {searchQuery && (
                  <span>
                    {" "}
                    for "
                    <span className="font-medium text-foreground">
                      {searchQuery}
                    </span>
                    "
                  </span>
                )}
              </div>

              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {activeFiltersCount} filter
                    {activeFiltersCount > 1 ? "s" : ""} active
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-xs text-muted-foreground hover:text-foreground h-6 px-2"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </div>

            {/* Courses Display */}
            {filteredCourses.length > 0 ? (
              <>
                <div
                  className={`grid gap-6 mb-8 ${
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {currentCourses.map((course) => (
                    <CourseCard key={course._id} {...course} />
                  ))}
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => {
                              setCurrentPage(Math.max(1, currentPage - 1));
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() => {
                              setCurrentPage(
                                Math.min(totalPages, currentPage + 1)
                              );
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              /* No Results */
              <div className="text-center py-16">
                <div className="w-32 h-32 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No courses found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  We couldn't find any courses matching your criteria. Try
                  adjusting your filters or search terms.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleClearFilters} variant="outline">
                    Clear Filters
                  </Button>
                  <Button onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Pagination Controls
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )} */}
    </div>
  );
};

export default CoursesList;
