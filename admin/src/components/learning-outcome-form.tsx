import * as z from "zod";
import type { LearningOutcomesFormProps } from "@/types";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUpdateCourseMutation } from "@/services/courseApi";
import toast from "react-hot-toast";

const formSchema = z.object({
  outcome: z.string().min(1, "Outcome is required"),
});

const LearningOutcomesForm = ({ initialData }: LearningOutcomesFormProps) => {
  const { id } = useParams<{ id: string }>();
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  // Outcomes array state
  const [outcomes, setOutcomes] = useState<string[]>(
    initialData.outcomes || []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      outcome: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newOutcomes = [...outcomes, values.outcome];
    try {
      await updateCourse({
        id: id!,
        updates: {
          outcomes: newOutcomes,
        },
      });

      setOutcomes(newOutcomes);
      form.reset();
      setIsEditing(false);
      toast.success(`learning outcomes updated successfully`);
    } catch (error) {
      console.error("Failed to update outcomes:", error);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course outcomes
        <Button
          className="text-xs sm:text-sm"
          onClick={toggleEdit}
          variant="ghost"
        >
          {isEditing && <>Cancel</>}

          {!isEditing && outcomes.length === 0 && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add outcomes
            </>
          )}

          {!isEditing && outcomes.length > 0 && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit outcomes
            </>
          )}
        </Button>
      </div>

      {/* Show existing outcomes */}
      {!isEditing &&
        (outcomes.length ? (
          <div className="flex flex-col gap-2 items-center justify-center mt-5 rounded-md w-full">
            {outcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="dark:bg-white/[0.03] w-full pl-2 pr-2 flex items-center gap-3 rounded-lg border min-h-16"
              >
                <div className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full border text-sm font-semibold text-gray-600 dark:text-white">
                  {idx + 1}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-200 leading-snug">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative text-slate-500 aspect-video mt-2 h-6 w-full">
            No learning outcomes yet.
          </div>
        ))}

      {/* Edit form */}
      {isEditing && (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="outcome"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="dark:bg-white/[0.03]"
                        disabled={isSubmitting}
                        placeholder="e.g. 'Master state management using Redux Toolkit'"
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
          {outcomes.length ? (
            <div className="flex flex-col gap-2 mt-5 w-full">
              {outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="dark:bg-white/[0.03] w-full pl-2 pr-2 flex items-center justify-between rounded-lg border h-16"
                >
                  <div className="flex h-full items-center gap-3">
                    <div className="flex items-center shrink-0 justify-center w-8 h-8 rounded-full border text-sm font-semibold text-gray-600 dark:text-white">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-snug">
                      {outcome}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      // onClick={() => handleEdit(outcome)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      // onClick={() => handleDelete(idx)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-slate-500 mt-3">
              No learning outcomes yet.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LearningOutcomesForm;
