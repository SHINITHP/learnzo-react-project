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
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useSignInMutation } from "@/services/authApi";
import toast from "react-hot-toast";
import { setAuth } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const LoginForm = () => {
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
      const { email, password } = values;

      const response = await signIn({ email, password }).unwrap();
      const { data } = response;
      dispatch(setAuth({ token: data.token, user: data.user }));
      navigate("/");

      toast.success("Sign-in successfull");

    } catch (error: any) {
      console.log(error);
      toast.error(error.data?.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md font-bold">Email*</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="rounded-sm h-12 w-full"
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
                <FormLabel className="text-md font-bold">Password*</FormLabel>
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
                <div className="flex justify-start pl-2">
                  <button
                    type="button"
                    className="text-xs text-blue-700 hover:underline cursor-pointer"
                    onClick={() => navigate("/?authMode=forgot")}
                  >
                    Forgot Password?
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="text-lg w-full h-13 rounded-sm text-white cursor-pointer bg-[#2F4021] hover:bg-[#2f4021f4] mt-10"
          >
            Sign In
          </Button>
        </form>
      </Form>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-400 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <Button className="flex items-center gap-2 font-bold w-full h-13 rounded-sm text-black cursor-pointer bg-transparent border border-[#2F4021] hover:bg-[#edf1eaf4]">
        <FcGoogle className="w-8 h-8" size={36} />
        <span className="text-md">Continue with Google</span>
      </Button>
      <Button className="flex items-center mt-4 gap-2 font-bold w-full h-13 rounded-sm text-black cursor-pointer bg-transparent border border-[#2F4021] hover:bg-[#edf1eaf4]">
        <FaFacebookF className="w-8 h-8" size={36} />
        <span className="text-md">Continue with Google</span>
      </Button>

      <p className="text-md w-full flex justify-center items-center mt-4">
        New to LearnEase?
        <span
          className="text-md pl-1 text-blue-600 underline cursor-pointer"
          onClick={() => navigate("/?authMode=sign-up")}
        >
          Sign-up
        </span>
      </p>
    </>
  );
};

export default LoginForm;
