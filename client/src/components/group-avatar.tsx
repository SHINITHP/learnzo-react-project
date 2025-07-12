import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AvatarGroup = () => {
  return (
    <div className="inline-flex items-center">
      {/* Avatar Stack */}
      <div className="flex -space-x-4">
        <Avatar className="border-4 border-[#fff] w-16 h-16">
          <AvatarImage src="./img1.jpg" alt="User 1" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar className="border-4 border-[#fff] w-16 h-16">
          <AvatarImage src="./img2.jpeg" alt="User 2" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <Avatar className="border-4 border-[#fff] w-16 h-16">
          <AvatarImage src="./img3.jpg" alt="User 3" />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
        <Avatar className="border-4 border-[#fff] w-16 h-16">
          <AvatarImage src="./img4.jpeg" alt="User 3" />
          <AvatarFallback>AK</AvatarFallback>
        </Avatar>
      </div>

    </div>
  );
};

export default AvatarGroup;