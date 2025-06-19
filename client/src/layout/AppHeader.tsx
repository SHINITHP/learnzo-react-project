import { Button } from "@/components/ui/button";
import SearchBox from "@/components/search-box";
import { Menu } from "lucide-react";
import { useState } from "react";
import MenuModal from "@/components/menubar-modal";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileButton } from "@/components/profile-button";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/redux/slices/authSlice";

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div className="w-full h-20 border-b border-b-[#d5d5d5] bg-white flex items-center justify-between pl-5 xl:pl-16 pr-5 xl:pr-16">
      <div className="text-8xl font-bold text-[#2F4021]">
        <img
          className="h-full w-40 sm:w-52 lg:w-62"
          src={"/logo1.png"}
          alt=""
        />
      </div>

      <div className="hidden lg:block w-[55%] pl-8 pr-8">
        <SearchBox />
      </div>

      <div className="flex gap-2 items-center">
        {!isAuthenticated ? (
          <>
            <Button
              onClick={() => {
                navigate("/?authMode=sign-in");
              }}
              className="hidden lg:block w-24 lg:w-32 h-12 rounded-xl text-sm lg:text-lg font-extralight cursor-pointer bg-transparent text-[#2F4021] border-1 border-[#2F4021] hover:border-[#AFD275] hover:bg-transparent transition-all duration-300 ease-in-out "
            >
              Sign-in
            </Button>
            <Button className="hidden lg:block w-24 lg:w-32 h-12 rounded-xl text-sm lg:text-lg font-extralight cursor-pointer transition-all duration-300 ease-in-out bg-[#2F4021] text-[#fff] hover:bg-[#2F4021] hover:text-[#fff]">
              Get Started
            </Button>
          </>
        ) : (
          <div className="hidden lg:block">
            <ProfileButton
              name="Shinith N"
              email="shinith@example.com"
              avatarUrl="/user.jpg"
              onProfile={() => console.log("Go to profile")}
              onSettings={() => console.log("Go to settings")}
              onLogout={() => console.log("Logout")}
            />
          </div>
        )}

        <Menu
          className="block lg:hidden text-gray-800 hover:text-primary transition-colors"
          size={28}
          onClick={() => setIsMenuOpen(true)}
        />
      </div>
      {isMenuOpen && <MenuModal onClose={() => setIsMenuOpen(false)} />}
    </div>
  );
};

export default AppHeader;
