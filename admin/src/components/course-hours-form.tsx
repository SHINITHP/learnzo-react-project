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
import { cn } from "@/utils/cn";

interface HoursFormProps {
  initialData: {
    hours: string;
  };
}

const formSchema = z.object({
  hours: z.string().min(1, {
    message: "language is required",
  }),
});

const HoursForm = ({ initialData }: HoursFormProps) => {
  const { id } = useParams<{ id: string }>();
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hours: initialData.hours,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCourse({
        id: id!,
        updates: { hours: values.hours },
      }).unwrap();
      toast.success(`hours updated successfull`);
      toggleEdit();
    } catch (error: any) {
      toast.error(`hours update error! : ${error}`);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-lg pt-2 pb-4 pl-3 pr-2">
      <div className="font-medium flex items-center justify-between dark:text-white">
        Course hours
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
              Edit hours
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.hours && "text-slate-500 italic"
          )}
        >
          {initialData.hours ? initialData.hours : "No course hours"}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="hours"
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
    </div>
  );
};

export default HoursForm;
