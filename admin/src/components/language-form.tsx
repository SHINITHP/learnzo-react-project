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
import enLocale from '@cospired/i18n-iso-languages/langs/en.json';
import * as languages from '@cospired/i18n-iso-languages';
import { useUpdateCourseMutation } from "@/services/courseApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { cn } from "@/utils/cn";
import MultipleSelector, { type Option } from "@/components/ui/multiselect";

languages.registerLocale(enLocale);

const allLanguages = languages.getNames('en');
const options = Object.entries(allLanguages).map(([code, label]) => ({
  value: code,
  label,
}));

interface LanguagesFormProps {
  initialData: {
    languages?: string[];
  };
}

const formSchema = z.object({
  languages: z
    .array(z.string().min(1, "Each language must be a valid string"))
    .min(1, "At least one language is required"),
});

const LanguagesForm = ({ initialData }: LanguagesFormProps) => {
  const { id } = useParams<{ id: string }>();
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      languages: initialData.languages || [],
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCourse({
        id: id!,
        updates: { languages: values.languages },
      }).unwrap();
      toast.success("Languages updated successfully");
      toggleEdit();
    } catch (error: any) {
      toast.error(`Languages update error: ${error.message || error}`);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-lg pt-2 pb-4 pl-3 pr-2">
      <div className="font-medium flex items-center justify-between dark:text-white">
        Course languages
        <Button
          className="text-xs sm:text-sm"
          onClick={toggleEdit}
          variant="ghost"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit languages
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData.languages?.length && "text-slate-500 italic"
          )}
        >
          {initialData.languages?.length
            ? initialData.languages
                .map((code) => allLanguages[code] || code)
                .join(", ")
            : "No languages selected"}
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
              name="languages"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultipleSelector
                      value={options.filter((option) =>
                        field.value.includes(option.value)
                      )}
                      onChange={(selectedOptions) => {
                        form.setValue(
                          "languages",
                          selectedOptions.map((option) => option.value),
                          { shouldValidate: true }
                        );
                      }}
                      defaultOptions={options}
                      placeholder="Select languages"
                      hideClearAllButton
                      className="dark:bg-slate-900"
                      hidePlaceholderWhenSelected
                      emptyIndicator={
                        <p className="text-center text-sm">No results found</p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                className="dark:bg-white w-20 border"
                disabled={!isValid || isSubmitting || isLoading}
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

export default LanguagesForm;