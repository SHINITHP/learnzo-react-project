import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateCourseMutation } from "@/services/courseApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title is required",
  }),
});

const AddCourse = () => {
  const [createCourse, { isLoading }] = useCreateCourseMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createCourse({ title: values.title }).unwrap();
      toast.success(`Course created successfully!`);
      navigate(`/courses/${response.data._id}/edit`);
    } catch (error: any) {
      toast.error(`Create course! : ${error}`);
    }
  };
 
  return (
    <div className="h-[100%] dark:border-gray-800 rounded-2xl dark:bg-white/[0.03] flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-5">Create Course</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4 w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%]"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. 'Advanced web development'"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button
              className="dark:bg-white"
              disabled={!isValid || isSubmitting || isLoading}
              type="submit"
            >
              {isSubmitting ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCourse;
