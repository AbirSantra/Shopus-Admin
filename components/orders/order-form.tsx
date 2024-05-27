"use client";

import * as z from "zod";
import {
  Category,
  Customer,
  Image,
  Order,
  OrderItem,
  Product,
} from "@prisma/client";
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
  FormDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import OrderItems from "./order-items";

const formValidation = z.object({
  customerId: z.string().min(1),
  orderItems: z
    .object({
      productId: z.string().min(1),
      includeWarranty: z.boolean().default(true),
    })
    .array(),
  isPaid: z.boolean().default(false).optional(),
});

type OrderFormValues = z.infer<typeof formValidation>;

interface OrderFormProps {
  initialData:
    | (Order & {
        orderItems: OrderItem[];
      })
    | null;
  customers: Customer[];
  products: Product[];
}

const OrderForm = ({ initialData, customers, products }: OrderFormProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const toastTitle = initialData
    ? "Order updated successfully!"
    : "Order created successfully";
  const toastDesc = initialData
    ? "Your Order has been updated."
    : "Your Order has been created.";
  const actionLabel = initialData ? "Save Changes" : "Create Order";

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formValidation),
    defaultValues: initialData || {
      orderItems: [],
      customerId: "",
      isPaid: false,
    },
  });

  const onSubmit = async (data: OrderFormValues) => {
    try {
      setLoading(true);
      console.log(data);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/orders/${params.orderId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/orders`, data);
      }
      router.push(`/${params.storeId}/orders`);
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
      await axios.delete(`/api/${params.storeId}/orders/${params.orderId}`);
      router.push(`/${params.storeId}/orders`);
      router.refresh();
      toast({
        title: "Order deleted successfully!",
        description: "Your order has been deleted.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to delete product!",
        description: "Something went wrong",
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
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a customer"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderItems"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Items</FormLabel>
                  <FormControl>
                    <OrderItems
                      products={products}
                      value={field.value.map((item) => ({
                        productId: item.productId,
                        includeWarranty: item.includeWarranty,
                      }))}
                      disabled={loading}
                      onChange={({ productId, includeWarranty }) =>
                        field.onChange([
                          ...field.value,
                          { productId, includeWarranty },
                        ])
                      }
                      onRemove={({ productId }) =>
                        field.onChange([
                          ...field.value.filter(
                            (current) => current.productId !== productId
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPaid"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Already Paid?</FormLabel>
                    <FormDescription>
                      Check this if the order has already been paid for
                    </FormDescription>
                  </div>
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
export default OrderForm;
