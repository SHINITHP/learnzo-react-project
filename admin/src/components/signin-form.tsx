import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "@/services/authApi";
import { setAuth } from "@/redux/slices/authSlice";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signIn] = useSignInMutation();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await signIn(values).unwrap();
      const { data } = response;
      console.log(data);
      dispatch(setAuth({ token: data.token, admin: data.admin }));
      toast.success("Welcome back to LearnEase!");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md text-gray-400">Email*</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="h-11 rounded-lg"
                    placeholder="name@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md text-gray-400">
                  Password*
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="rounded-sm h-12 pr-10"
                      placeholder="Enter your password"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />

                <div className="flex justify-start pl-2">
                  <button
                    type="button"
                    className="text-xs text-blue-700 hover:underline cursor-pointer mb-4"
                    onClick={() => navigate("/?authMode=forgot")}
                  >
                    Forgot Password?
                  </button>
                </div>
                <FormDescription></FormDescription>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-11 rounded-lg bg-[#465fff] text-white hover:bg-[#3641f5] text-md mt-20"
          >
            Sign In
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignInForm;
