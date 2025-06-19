"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/signin-form";
import RegisterForm from "@/components/signup-form";
import ForgotPassword from "@/components/forgot-password";

interface AuthModalProps {
  authMode: string;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ authMode, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          initial={{ y: "-100vh", opacity: 0 }} // Slide in from left
          animate={{ y: "0vh", opacity: 1 }} // Settle at center
          exit={{ y: "-100vh", opacity: 0 }} // Slide out to left
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-[65%] lg:w-1/2 xl:w-1/3 max-h-[97%] border rounded-sm bg-white m-0 p-0 relative border-r flex flex-col shadow-2xl overflow-y-auto"
        >
          <button
            className="absolute top-0 right-0 w-14 h-14 flex justify-center items-center cursor-pointer"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <X className="h-7 w-7 text-black" />
          </button>

          <h1 className="w-full mt-10 text-center text-3xl font-bold">
            {authMode === "forgot"
              ? "Forgot Password"
              : authMode === "sign-up"
              ? "Create an Account"
              : "Welcome Back"}
          </h1>

          {/* sign-in form */}
          <div className="p-7 sm:p-13">
            {authMode === "sign-in" && <LoginForm />}

            {/* sign-up form */}
            {authMode === "sign-up" && <RegisterForm />}

            {/* forgot-password form */}
            {authMode === "forgot" && <ForgotPassword />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthModal;
