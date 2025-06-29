import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";
import type { ChapterFormProps, IChapter } from "@/types";
import { ChaptersList } from "./chapter-list";
import {
  useCreateChapterMutation,
  useUpdateChapterPositionsMutation,
} from "@/services/chapterApi";

const formSchema = z.object({
  title: z.string().min(1, { message: "Chapter title is required" }),
});

const ChapterForm = ({ initialData }: ChapterFormProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [createChapter] = useCreateChapterMutation();
  const [reorderChapter] = useUpdateChapterPositionsMutation();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [chapters, setChapters] = useState<IChapter[]>(
    initialData.chapters || []
  );

  useEffect(() => {
    setChapters(initialData.chapters || []);
  }, [initialData.chapters]);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    form.reset();
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await createChapter({
        courseId: id!,
        title: values.title,
      }).unwrap();
      setChapters((prev) => [
        ...prev,
        ...(Array.isArray(data) ? data : [data]),
      ]);
      toast.success("Chapter created successfully");
      toggleCreating();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await reorderChapter({ courseId: id!, list: updateData }).unwrap();
      toast.success("Chapters reordered successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    navigate(`/courses/${id}/chapters/${id}`);
  };

  return (
    <div className="relative mt-6 border bg-slate-100 dark:bg-slate-900 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
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
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {!chapters.length && "No chapters"}
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={chapters}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-sm text-muted-foreground mt-4">
          Drag and drop to reorder chapters
        </p>
      )}
    </div>
  );
};

export default ChapterForm;
