import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

import coursesOne from "../assets/image1.jpg";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import {
  // useGetCategoriesQuery,
  useGetCoursesQuery,
} from "@/services/courseApi";
import { useRef } from "react";

export const CourseCard = () => {
  const navigate = useNavigate();

  // Create a ref for the carousel instance
  const autoplayInstance = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const { data } = useGetCoursesQuery();
  const course = data?.data;

  // const { categories } = useGetCategoriesQuery();

  interface Name {
    _id: string;
    title: string;
    imageSrc: string;
    // profession: string;
    price: string;
    category: string;
  }
  const courseItems: Name[] =
    course?.map((course: any) => ({
      _id: course._id,
      title: course.title,
      imageSrc: course.imageUrl,
      // profession: course.title,
      price: course.price,
      category: course.categoryId?.name, // Make sure label matches allowed union
    })) || [];

  return (
    <section className="h-screen md:mt-20  pl-3 pr-3 sm:pl-6 sm:pr-6 lg:pl-6 lg:pr-6 xl:pl-16 xl:pr-16 w-full flex flex-col">
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
        className="w-full pl-2 pr-2"
        opts={{ loop: true, align: "start" }}
        onMouseEnter={() => autoplayInstance.current.stop()}
        onMouseLeave={() => autoplayInstance.current.play()}
      >
        <CarouselContent className="flex items-stretch py-5">
          {courseItems.map((data, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex"
            >
              <div className="">
                <Card className="h-full pt-3 bg-[#f9fcf2] cursor-pointer group hover:scale-[1.03] transition-transform duration-300 border border-[#2F4021] hover:border-[#2F4021] rounded-2xl w-full">
                  <CardContent className="flex pl-3 pr-3">
                    <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-xl flex flex-col justify-between group-hover:opacity-75">
                      <img
                        className="w-full h-72 rounded-md"
                        src={data.imageSrc}
                        alt=""
                      />
                      <div className="pt-3 pl-2 text-[#2F4021]">
                        <i className="fa-regular fa-circle-check text-md "> </i>
                        <span className="text-md pl-2 font-bold">
                          Certified, Popular
                        </span>
                      </div>

                      <div className="mt-5 min-h-[60px] px-2">
                        <h1 className="text-lg font-extrabold text-[#2F4021] line-clamp-2">
                          {data.title}
                        </h1>
                      </div>

                      {/* course button + auther name */}
                      <div className="flex items-center justify-between text-[#2F4021] pl-2 border-t-2 border-image-[linear-gradient(to_right,black_30%,transparent_70%)_1]  border-t-[#AFD275] border-dashed pt-4 mt-5">
                        <div className="flex items-center">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={coursesOne}
                            alt=""
                          />
                          <h1 className="pl-2 text-sm font-bold">
                            {/* author name */}
                            {/* {data.course} */}
                          </h1>
                        </div>
                        <button onClick={() => navigate(`/courses/${data._id}`)} className="text-sm w-28 h-8 cursor-pointer border font-medium text-[#fff] border-[#2F4021] bg-[#2F4021] rounded-3xl transition duration-300 ease-in-out hover:bg-[#AFD275] hover:border-[#AFD275] hover:text-[#fff]">
                          View Course
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
