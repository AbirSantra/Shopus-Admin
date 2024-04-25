"use client";

import * as z from "zod";
import { Store } from "@prisma/client";
import { Heading } from "./ui/heading";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import axios, { AxiosError } from "axios";
import { toast } from "./ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "./modals/alert-modal";
import { ApiAlert } from "./ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
  initialData: Store;
}

const formValidation = z.object({
  name: z.string().min(1, "Store Name cannot be empty"),
});

type SettingsFormValues = z.infer<typeof formValidation>;

const SettingsForm = ({ initialData }: SettingsFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formValidation),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      console.log(data);
      const updatedStore = await axios.patch(
        `/api/stores/${params.storeId}`,
        data
      );
      toast({
        title: "Store Name Updated",
        description: `Your store has been renamed to ${data.name}`,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast({
          title: "Failed to update store!",
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
      const deletedStore = await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast({
        title: "Store deleted successfully!",
        description: "Your store has been deleted.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to delete store!",
        description: "Make sure to remove all products and categories first.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage your store settings" />
        <Button
          variant={"default"}
          size={"sm"}
          onClick={() => {
            setOpen(true);
          }}
          disabled={loading}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store Name"
                      label="Store Name"
                      description="This is used to identify your store in the market place"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button variant={"default"} disabled={loading} type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="admin"
      />
    </>
  );
};
export default SettingsForm;
