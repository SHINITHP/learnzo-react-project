"use client";

import CourseCard from "@/components/course-cards";
import { sampleCourses } from "@/data/sampleCourses";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";
import { PaginationControls } from "@/components/pagination-controls";

const itemsPerPage = 1;

const CoursesList = () => {
  const categories = [
    "All",
    "Development",
    "Design",
    "Business",
    "Marketing",
    "Photography",
    "Music",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses =
    selectedCategory === "All"
      ? sampleCourses
      : sampleCourses.filter((course) => course.category === selectedCategory);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen dark:bg-transparent bg-gray-100 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto py-12">
        {/* Categories */}
        <div className="mb-8">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-2 pb-4">
              {categories.map((category) => (
                <Badge
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors px-4 py-2 flex-shrink-0 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {category}
                </Badge>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Course Cards */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Featured Courses
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredCourses.length} courses found
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </div>
      </div>
      {/* Pagination Controls */}
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
    </div>
  );
};

export default CoursesList;
