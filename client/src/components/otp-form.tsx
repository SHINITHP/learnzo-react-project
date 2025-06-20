"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useVerifyOTPMutation } from "@/services/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";

interface OtpFormData {
  otp: string[];
}

const OtpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = localStorage.getItem("otpEmail");
  const token = localStorage.getItem("otpToken");
  const [verifyOtp, { isLoading }] = useVerifyOTPMutation();

  const { control, handleSubmit, setValue, getValues } = useForm<OtpFormData>({
    defaultValues: {
      otp: Array(6).fill(""),
    },
  });

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const onSubmit = async ({ otp }: OtpFormData) => {
    try {
      const joinedOtp = otp.join("");
      if (joinedOtp.length < 6) {
        //   toast.error("Please enter the full 6-digit OTP.");
        return;
      }

      if (!email || !token) {
        console.error("OTP session expired. Please try again.");
        return;
      }

      const response = await verifyOtp({
        email,
        otp: joinedOtp,
        token,
      }).unwrap();
      const { data } = response;

      if (response.success) {
        localStorage.removeItem("otpToken");
        localStorage.removeItem("otpEmail");
        dispatch(setAuth({ token: data.token, user: data.user }));
        navigate("/");
        toast.success("Welcome to LearnEase!");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data?.message);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length > 1) return;

    setValue(`otp.${index}`, value);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !getValues(`otp.${index}`) && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-center ">
      <div className="flex justify-center gap-2">
        {[...Array(6)].map((_, index) => (
          <Controller
            key={index}
            name={`otp.${index}`}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                maxLength={1}
                inputMode="numeric"
                className="w-12 h-12 text-center text-lg font-bold border border-[#b0afaf] tracking-widest"
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            )}
          />
        ))}
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-md cursor-pointer mt-4 bg-[#2F4021] hover:bg-[#2f4021f4]"
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </Button>
    </form>
  );
};

export default OtpForm;
