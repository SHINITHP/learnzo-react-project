"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/signin-form";
import RegisterForm from "@/components/signup-form";
import ForgotPassword from "@/components/forgot-password";
import OtpForm from "@/components/otp-form";

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
          className={`w-full ${
            authMode === "verify-otp" ? "sm:w-3/4 justify-center h-full sm:h-fit" : "h-[98%]"
          } md:w-[65%] lg:w-1/2 xl:w-1/3 border rounded-sm bg-white m-0 p-0 relative border-r flex flex-col items-center  shadow-2xl overflow-y-auto`}
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
              : authMode === "verify-otp"
              ? "Verify OTP"
              : "Welcome Back"}
          </h1>

          {authMode === "verify-otp" && (
            <p className="text-md mt-5 text-muted-foreground w-full sm:w-3/4 text-center">
              We’ve sent a 6-digit verification code to your email. Enter it
              below to continue.
            </p>
          )}

          {/* sign-in form */}
          <div className="p-7 sm:p-13 w-full">
            {authMode === "sign-in" && <LoginForm />}

            {/* sign-up form */}
            {authMode === "sign-up" && <RegisterForm />}

            {/* forgot-password form */}
            {authMode === "forgot" && <ForgotPassword />}

            {/* verify-otp form */}
            {authMode === "verify-otp" && <OtpForm />}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthModal;
