"use client";

import * as z from "zod";
import { Billboard } from "@prisma/client";
import { Heading } from "../ui/heading";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "../modals/alert-modal";
import ImageUpload from "../ui/image-upload";

const formValidation = z.object({
  label: z.string().min(1, "Bilboard Label cannot be empty"),
  imageUrl: z.string().min(1, "Bilboard ImageURL cannot be empty"),
});

type BillboardFormValues = z.infer<typeof formValidation>;

interface BillboardFormProps {
  initialData: Billboard | null;
}

const BillboardForm = ({ initialData }: BillboardFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData
    ? "Edit Billboard settings"
    : "Create new Billboard";
  const toastTitle = initialData
    ? "Billboard updated successfully!"
    : "Billboard created successfully";
  const toastDesc = initialData
    ? "Your Billboard has been updated."
    : "Your billboard has been created.";
  const actionLabel = initialData ? "Save Changes" : "Create Billboard";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formValidation),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
      router.push(`/${params.storeId}/billboards`);
      router.refresh();
      toast({
        title: toastTitle,
        description: toastDesc,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast({
          title: "Something went wrong!",
          description: `${error.response?.data}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.push(`/${params.storeId}/billboards`);
      router.refresh();
      toast({
        title: "Billboard deleted successfully!",
        description: "Your billboard has been deleted.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to delete billboard!",
        description:
          "Make sure to remove all categories using this billboard first",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-8">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard Label"
                      label="Billboard Label"
                      description="This is used to announce offers and discounts on your store"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              disabled={loading}
              type="button"
              onClick={() => {
                setOpen(true);
              }}
            >
              Delete
            </Button>
            <Button variant={"default"} disabled={loading} type="submit">
              {actionLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default BillboardForm;
