import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X as CloseIcon, Search } from "lucide-react";
import { Button } from "./ui/button";

interface MenuModalProps {
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-start">
      <AnimatePresence>
        <motion.div
          initial={{ x: "-100vw", opacity: 0 }} // Slide in from left
          animate={{ x: "0vw", opacity: 1 }} // Settle at center
          exit={{ x: "-100vw", opacity: 0 }} // Slide out to left
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full bg-white m-0 p-0 relative border-r flex flex-col justify-between"
        >
          <header className="border-b border-b-[#464545] h-14 flex flex-row items-center">
            <button className="h-full bg-[#2F4021] cursor-pointer text-white outline-none border-none w-14 flex justify-center items-center">
              <Search size={26} />
            </button>
            <input
              type="text"
              className="h-full flex-grow outline-none border-none pl-2 pr-2 text-md font-extralight text-[#1b1b1b]"
              placeholder="What do you want to learn?"
            />
            <button className="h-full outline-none cursor-pointer border-none w-14 flex justify-center items-center">
              <CloseIcon size={26} className="text-black" onClick={onClose} />
            </button>
          </header>

          <section>{/* body content */}</section>

          <footer className="border-t-4 p-3">
            <Button className="text-lg w-full h-13 rounded-sm bg-transparent text-[#2F4021] cursor-pointer border border-[#2F4021] hover:bg-[#2F4021] hover:text-white transition-all duration-300 ease-in-out">Sign In</Button>
            <Button className="text-lg w-full h-13 rounded-sm mt-2 cursor-pointer transition-all duration-300 ease-in-out bg-[#2F4021] text-[#fff] hover:bg-[#2F4021] hover:text-[#fff]">Get Started</Button>
          </footer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MenuModal;
