import React from "react";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <p className="w-[95%] text-md text-center mb-10">
        Enter the email address you use on LearnEase. We'll send you a link to
        reset your password.
      </p>
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
                    className="rounded-sm h-12"
                    placeholder="name@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="text-lg w-full h-13 rounded-sm text-white cursor-pointer bg-[#2F4021] hover:bg-[#2f4021f4] mt-10">
            Reset Password
          </Button>
        </form>
      </Form>
      <p className="w-full text-center mt-10" onClick={() => navigate("/?authMode=sign-in")}>
        Back to
        <span className="text-md pl-1 text-blue-600 underline cursor-pointer">
          Sign-in
        </span>
      </p>
    </>
  );
};

export default ForgotPassword;
