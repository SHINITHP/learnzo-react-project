import type { TitleFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateCourseMutation } from "@/services/courseApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const TitleForm = ({ initialData }: TitleFormProps) => {
  const { id } = useParams<{ id: string }>();
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCourse({
        id: id!,
        updates: { title: values.title },
      }).unwrap();
      toast.success(`Title updated successfull`);
      toggleEdit();
    } catch (error: any) {
      toast.error(`Title update error! : ${error}`);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-lg pt-2 pb-4 pl-3 pr-2">
      <div className="font-medium flex items-center justify-between dark:text-white">
        Course title
        <Button
          className="text-xs sm:text-sm"
          onClick={toggleEdit}
          variant={"ghost"}
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil />
              Edit title
            </>
          )}
        </Button>
      </div>

      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
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
                className="dark:bg-white w-20 border"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      )}
      {!initialData.title && "No Title"}
    </div>
  );
};

export default TitleForm;
