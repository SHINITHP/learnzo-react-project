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
import { Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      const { data } = response;
      navigate(`/courses/${data?._id}`);
      toast.success(`Course created successfully!`);
    } catch (error: any) {
      console.log(error);
      toast.error(`Create course! : ${error}`);
    }
  };

  return (
    <div className=" dark:border-gray-800 mt-16 rounded-2xl dark:bg-white/[0.03] flex flex-col px-6 py-6">
      {/* Header */}
      <div className="mb-8 ">
        <Link
          to="/courses"
          className="inline-flex items-center text-sm text-foreground hover:text-muted-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create New Course
        </h1>
        <p className="text-gray-600 mt-2">
          Start building your course by adding a title
        </p>
      </div>

      <Card className="w-full dark:bg-slate-900">
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
          <CardDescription>
            Give your course a compelling title that describes what students
            will learn
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                        className="dark:bg-white/[0.03]"
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
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card className="mt-6 dark:bg-slate-900">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">
            💡 Tips for a Great Course Title
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Be specific about what students will learn</li>
            <li>• Use action words that inspire learning</li>
            <li>
              • Keep it concise but descriptive (aim for 60 characters or less)
            </li>
            <li>• Avoid jargon that beginners might not understand</li>
          </ul>
        </CardContent>
      </Card>

      {/* <Form {...form}>
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
      </Form> */}
    </div>
  );
};

export default AddCourse;
