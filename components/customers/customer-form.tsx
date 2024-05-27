"use client";

import * as z from "zod";
import { Billboard, Category, Customer } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formValidation = z.object({
  name: z.string().min(1, "Customer Name cannot be empty"),
  phone: z.string().min(10, "Customer phone must be atleast 10 digits"),
  email: z.string().email(),
  address: z.string(),
});

type CustomerFormValues = z.infer<typeof formValidation>;

interface CustomerFormProps {
  initialData: Customer | null;
}

const CustomerForm = ({ initialData }: CustomerFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit Customer" : "Create Customer";
  const description = initialData
    ? "Edit Customer settings"
    : "Create new Customer";
  const toastTitle = initialData
    ? "Customer updated successfully!"
    : "Customer created successfully";
  const toastDesc = initialData
    ? "Your Customer has been updated."
    : "Your Customer has been created.";
  const actionLabel = initialData ? "Save Changes" : "Create Customer";

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(formValidation),
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (data: CustomerFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/customers/${params.customerId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/customers`, data);
      }
      router.push(`/${params.storeId}/customers`);
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
        `/api/${params.storeId}/customers/${params.customerId}`
      );
      router.push(`/${params.storeId}/customers`);
      router.refresh();
      toast({
        title: "Customer deleted successfully!",
        description: "Your Customer has been deleted.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to delete customer!",
        description: "Make sure to remove all orders of this customer first",
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
          <div className="grid gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Customer Name"
                      label="Customer Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Customer Email"
                      label="Customer Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Customer Phone"
                      label="Customer Phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Customer Address"
                      label="Customer Address"
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
export default CustomerForm;
