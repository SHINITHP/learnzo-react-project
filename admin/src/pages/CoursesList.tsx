"use client";

import CourseCard from "@/components/course-cards";
// import { sampleCourses } from "@/data/sampleCourses";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";
import { PaginationControls } from "@/components/pagination-controls";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import { useGetCoursesQuery } from "@/services/courseApi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const itemsPerPage = 5;

const CoursesList = () => {
  const { data: categoryResponse } = useGetCategoriesQuery();
  const { data: courseResponse } = useGetCoursesQuery();

  const CategoryData = categoryResponse?.data || [];

  const categories = [{ _id: "all", name: "All" }, ...CategoryData];

  const courses = courseResponse?.data || [];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => {
          const category = course.categoryId;

          if (typeof category === "string") return false; // not populated
          return category?.name === selectedCategory;
        });

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen dark:bg-transparent bg-gray-100 flex flex-col justify-between">
      <div className="w-full py-14 sm:py-12">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Course Library
            </h1>
            <p className="text-gray-600 text-xs lg:text-lg">
              Discover and learn with our comprehensive courses
            </p>
          </div>
          <Link to="/create-course">
            <Button className="w-full sm:w-auto dark:bg-slate-800 dark:text-white">
              <Plus className="h-4 w-4 mr-0" />
              Create Course
            </Button>
          </Link>
        </div>
        {/* Categories */}
        <div className="mb-8">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-2 pb-4">
              {categories &&
                categories.map((category) => (
                  <Badge
                    key={category._id}
                    onClick={() => handleCategorySelect(category.name)}
                    variant={
                      selectedCategory === category.name
                        ? "default"
                        : "secondary"
                    }
                    className={`cursor-pointer transition-colors px-4 py-2 flex-shrink-0 ${
                      selectedCategory === category.name
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    {category.name}
                  </Badge>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Course Cards */}
        <div className="w-full">
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
              <CourseCard key={course._id} {...course} />
            ))}
            {!currentCourses.length && (
              <div className="h-[500px] col-span-full text-center flex items-center justify-center text-gray-500">
                No courses found in this category.
              </div>
            )}
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
