import { Card, CardContent } from "./ui/card";

import coursesOne from "../assets/image1.jpg";
import { useNavigate } from "react-router-dom";
import type { ICourse } from "@/types";

export const CourseCard = ({ courses }: { courses: ICourse | undefined }) => {

    console.log("courses", courses);
  const navigate = useNavigate();

  return (
    <Card className="h-full pt-3 bg-[#f9fcf2] cursor-pointer group hover:scale-[1.03] transition-transform duration-300 border border-[#2F4021] hover:border-[#2F4021] rounded-2xl w-full">
      <CardContent className="flex pl-3 pr-3">
        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-xl flex flex-col justify-between group-hover:opacity-75">
          <img className="w-full h-72 rounded-md" src={courses?.imageUrl} alt="" />
          <div className="pt-3 pl-2 text-[#2F4021]">
            <i className="fa-regular fa-circle-check text-md "> </i>
            <span className="text-md pl-2 font-bold">Certified, Popular</span>
          </div>

          <div className="mt-5 min-h-[60px] px-2">
            <h1 className="text-lg font-extrabold text-[#2F4021] line-clamp-2">
              {courses?.title}
            </h1>
          </div>

          {/* course button + auther name */}
          <div className="flex items-center justify-between text-[#2F4021] pl-2 border-t-2 border-image-[linear-gradient(to_right,black_30%,transparent_70%)_1]  border-t-[#AFD275] border-dashed pt-4 mt-5">
            <div className="flex items-center">
              <img className="w-8 h-8 rounded-full" src={coursesOne} alt="" />
              <h1 className="pl-2 text-sm font-bold">
                {/* author name */}
                {/* {data.course} */}
              </h1>
            </div>
            <button
              onClick={() => navigate(`/courses/${courses?._id}`)}
              className="text-sm w-28 h-8 cursor-pointer border font-medium text-[#fff] border-[#2F4021] bg-[#2F4021] rounded-3xl transition duration-300 ease-in-out hover:bg-[#AFD275] hover:border-[#AFD275] hover:text-[#fff]"
            >
              View Course
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
