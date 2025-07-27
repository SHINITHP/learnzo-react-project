import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Pencil } from "lucide-react";
import { useUpdateCourseMutation } from "@/services/courseApi";
import { formatPrice } from "@/lib/format";
import { cn } from "@/utils/cn";
import type { PriceFormProps } from "@/types";

const formSchema = z.object({
  priceType: z.enum(["free", "paid"]),
  price: z.coerce.number().optional(),
});

const PriceForm = ({ initialData }: PriceFormProps) => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priceType: initialData.price && initialData.price > 0 ? "paid" : "free",
      price: initialData.price || 0,
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const priceType = form.watch("priceType");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const finalPrice = values.priceType === "paid" ? values.price : 0;
    try {
      await updateCourse({
        id: id!,
        updates: { price: finalPrice },
      }).unwrap();
      toast.success("Price updated successfully");
      toggleEdit();
    } catch (error: any) {
      toast.error(`Price update error! : ${error}`);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-900 rounded-lg pt-2 pb-4 pl-3 pr-2">
      <div className="font-medium flex items-center justify-between">
        Course price
        <Button onClick={toggleEdit} variant={"ghost"}>
          {isEditing ? "Cancel" : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit price
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <p className={cn("text-sm mt-2", !initialData.price && "text-slate-500 italic")}>
          {initialData.price ? formatPrice(initialData.price) : "Free"}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">

            {/* Free or Paid Select */}
            <FormField
              control={form.control}
              name="priceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select course type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="dark:bg-white/[0.03]">
                        <SelectValue placeholder="Select pricing" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price Input */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      disabled={isSubmitting || priceType === "free"}
                      value={priceType === "free" ? 0 : field.value}
                      className="dark:bg-white/[0.03]"
                      placeholder="Enter price"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
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
