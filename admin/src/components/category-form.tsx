import * as z from "zod";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/utils/cn";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Combobox } from "./ui/combobox";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateCourseMutation } from "@/services/courseApi";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface CategoryFormProps {
  initialData: {
    categoryId: string;
  };
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

const CategoryForm = ({ initialData, options }: CategoryFormProps) => {
  const { id } = useParams<{ id: string }>();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData.categoryId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCourse({
        id: id!,
        updates: { categoryId: values.categoryId },
      }).unwrap();
      toast.success(`Category updated successfull`);
      toggleEdit();
    } catch (error: any) {
      toast.error(`Category update error! : ${error}`);
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  );

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-lg pt-2 pb-4 pl-3 pr-2">
      <div className="font-medium flex items-center justify-between">
        Course category
        <Button className="text-xs sm:text-sm" onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.categoryId && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "No category"}
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
              name="categoryId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        options={options}
                        onChange={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center gap-x-2">
              <Button
                className="w-20"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CategoryForm;
