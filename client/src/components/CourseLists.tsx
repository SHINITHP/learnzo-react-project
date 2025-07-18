import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  useGetCoursesQuery,
} from "@/services/courseApi";
import { useRef } from "react";
import CourseCard from "./course-cards";

export const CourseLists = () => {
  const navigate = useNavigate();

  // Create a ref for the carousel instance
  const autoplayInstance = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const { data } = useGetCoursesQuery();
  const courses = data?.data;

  
  return (
    <section className="h-screen md:mt-20  pl-3 pr-3 sm:pl-6 sm:pr-6 lg:pl-6 lg:pr-6 xl:pl-16 xl:pr-16 w-full flex flex-col bg-[#f9fcf2]">
      <header className="w-full flex justify-between items-center pb-10">
        <h1 className="text-2xl md:text-4xl text-[#2F4021] font-bold">
          Popular Courses
        </h1>
        <Button
          onClick={() => navigate("/courses")}
          className="bg-transparent border button-transition rounded-md border-[#2F4021] text-md md:text-lg text-[#2F4021] hover:text-[#fff] hover:bg-[#2F4021] w-32 h-10 md:w-40 md:h-12"
        >
          Explore Course
        </Button>
      </header>

      <Carousel
        plugins={[autoplayInstance.current]}
        className="w-full px-2 bg-transparent"
        opts={{ loop: true, align: "start" }}
        onMouseEnter={() => autoplayInstance.current.stop()}
        onMouseLeave={() => autoplayInstance.current.play()}
      >
        <CarouselContent className="flex items-stretch bg-transparent">
          {courses?.map((course, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex bg-transparent"
            >
              <div className="w-full h-full flex items-center justify-center bg-transparent">
                <CourseCard {...course} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
