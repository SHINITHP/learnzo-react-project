import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useParams } from "react-router-dom";
import type { PriceFormProps } from "@/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import { useUpdateCourseMutation } from "@/services/courseApi";
import toast from "react-hot-toast";

const formSchema = z.object({
  price: z.coerce.number(),
});

const PriceForm = ({ initialData }: PriceFormProps) => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCourse({
        id: id!,
        updates: { price: values.price },
      }).unwrap();
      toast.success(`Title updated successfull`);
      toggleEdit();
    } catch (error: any) {
      toast.error(`Title update error! : ${error}`);
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-lg pt-2 pb-4 pl-3 pr-2">
      <div className="font-medium flex items-center justify-between">
        Course price
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil />
              Edit price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.price && "text-slate-500 italic"
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "No price set"}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="dark:bg-white/[0.03]"
                      disabled={isSubmitting}
                      type="number"
                      step={"0.01"}
                      placeholder="Enter your price for your course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PriceForm;
