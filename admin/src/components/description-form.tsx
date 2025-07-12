import * as z from "zod";
import type { DescriptionFormProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import RichTextEditor from "./RichTextEditor";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { useUpdateCourseMutation } from "@/services/courseApi";
import toast from "react-hot-toast";

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }).refine(
    (value) => {
      // Remove HTML tags and check if there's actual text content
      const textContent = value.replace(/<[^>]*>/g, '').trim();
      return textContent.length > 0;
    },
    {
      message: 'Description cannot be empty'
    }
  ),
});

const DescriptionForm = ({ initialData }: DescriptionFormProps) => {
  const { id } = useParams<{ id: string }>();
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description || '',
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCourse({
        id: id!,
        updates: { description: values.description },
      }).unwrap();
      toast.success(`Description updated successfully`);
      toggleEdit();
    } catch (error: any) {
      toast.error(`Description update error! : ${error}`);
    }
  };

  // Function to render HTML content safely
  const renderDescription = (htmlContent: string) => {
    if (!htmlContent) return "No description";
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="prose prose-sm max-w-none" />;
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-lg pt-2 pb-4 pl-3 pr-2">
      <div className="font-medium flex items-center justify-between">
        Course description
        <Button className="text-xs sm:text-sm" onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {initialData.description ? renderDescription(initialData.description) : "No description"}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RichTextEditor
                      content={field.value}
                      onChange={field.onChange}
                      placeholder="e.g. 'This course is about...'"
                      className={cn(
                        "dark:bg-white/[0.03]",
                        form.formState.errors.description && "border-red-500"
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                className="w-20"
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

export default DescriptionForm;