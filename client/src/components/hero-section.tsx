import AvatarGroup from "./group-avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Hero = () => {
  return (
    <div className="w-full pl-3 pr-3 sm:pl-6 sm:pr-6 lg:pl-6 lg:pr-6 xl:pl-16 xl:pr-16 bg-[#F8F9F5] h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 h-full flex flex-col pt-32 md:pt-36 xl:pt-48 items-center lg:items-start">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center lg:text-5xl lg:text-start xl:text-6xl font-bold text-[#2F4021] md:w-[90%] ">
          Unlock Your Future with Online Learning
        </h1>
        <p className="mt-12 w-full text-xs sm:text-sm md:text-lg text-center lg:text-start lg:text-sm xl:text-lg text-[#2F4021] tracking-wide leading-relaxed">
          Discover a wide range of expert-led courses tailored to your personal
          and professional growth. Learn at your own pace, access resources
          anytime, and unlock new opportunities with flexible, high-quality
          education designed for modern learners.
        </p>
        <Button className="bg-[#2F4021] hover:bg-[#AFD275] hover:text-[#2F4021] p-6 text-md xl:text-lg mt-8">
          Start learning now
        </Button>

        <div className="mt-12">
          <AvatarGroup />
        </div>
      </div>
      <div className="hidden w-1/2 lg:flex flex-col items-center pt-40">
        <div className="w-full h-[60%] flex lg:justify-center xl:justify-end gap-3">
          <img
            src="./hero-image.png"
            className="hidden xl:block w-1/3 h-full rounded-3xl object-cover"
            alt=""
          />
          <div className="w-[80%] xl:w-[50%] h-full bg-[#2F4021] rounded-3xl">
            <div className="flex justify-center items-center w-full h-1/2">
              <div className="w-1/2 h-full flex flex-col gap-2 justify-center items-center">
                <i className="fa-solid fa-users text-3xl text-[#AFD275]"/>
                <h1 className="text-3xl text-[#AFD275] font-bold">1,223</h1>
                <Badge className="w-[60%] h-8 font-bold text-md bg-[#AFD275] text-[#2F4021] rounded-3xl">
                  Students
                </Badge>
              </div>
              <div className="w-1/2 h-full flex flex-col gap-2 justify-center items-center">
                <i className="fa-solid fa-book text-3xl text-[#AFD275]"/>
                <h1 className="text-3xl text-[#AFD275] font-bold">1,223</h1>
                <Badge className="w-[60%] h-8 font-bold text-md bg-[#AFD275] text-[#2F4021] rounded-3xl">
                  Courses
                </Badge>
              </div>
            </div>
            <div className="flex justify-center items-center w-full h-1/2">
              <div className="w-1/2 h-full flex flex-col gap-2 justify-center items-center">
                <i className="fa-solid fa-user-graduate text-3xl text-[#AFD275]"/>
                <h1 className="text-3xl text-[#AFD275] font-bold">1,223</h1>
                <Badge className="w-[60%] h-8 font-bold text-md bg-[#AFD275] text-[#2F4021] rounded-3xl">
                  Teachers
                </Badge>
              </div>
              <div className="w-1/2 h-full flex flex-col gap-2 justify-center items-center">
                <i className="fa-solid fa-award text-3xl text-[#AFD275]"/>
                <h1 className="text-3xl text-[#AFD275] font-bold">1,223</h1>
                <Badge className="w-[60%] h-8 font-bold text-md bg-[#AFD275] text-[#2F4021] rounded-3xl">
                  Certified
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <p className="text-[#2F4021] w-[80%] xl:w-1/2 text-center text-xl xl:text-2xl mt-10">
          "This platform offers everything I need to boost my skills."
        </p>
      </div>
    </div>
  );
};

export default Hero;
