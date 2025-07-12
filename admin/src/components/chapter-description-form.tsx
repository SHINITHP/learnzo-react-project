import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { cn } from "@/utils/cn";
import toast from "react-hot-toast";
import { useUpdateChapterMutation } from "@/services/chapterApi";
import RichTextEditor from "./RichTextEditor";

interface ChapterDescriptionFormProps {
  initialData: {
    description?: string;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

const ChapterDescriptionForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterDescriptionFormProps) => {
  const [updateChapter, { isLoading }] = useUpdateChapterMutation();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description,
    },
  });

  // Function to render HTML content safely
  const renderDescription = (htmlContent: string) => {
    if (!htmlContent) return "No description";
    return (
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="prose prose-sm max-w-none"
      />
    );
  };

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateChapter({
        id: chapterId,
        courseId: courseId,
        updates: { description: values.description },
      }).unwrap();
      toast.success(`Description updated successfull`);
      toggleEdit();
    } catch (error: any) {
      toast.error(`Title update error! : ${error}`);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-lg pt-2 pb-4 pl-3 pr-2">
      <div className="font-medium flex items-center justify-between">
        Course description
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
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.description && "text-slate-500 italic"
          )}
        >
          {initialData.description ? renderDescription(initialData.description) : "No description"}
        </p>
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

export default ChapterDescriptionForm;
