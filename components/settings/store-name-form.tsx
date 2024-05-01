import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/use-toast";
import { useParams, useRouter } from "next/navigation";

const formValidation = z.object({
  name: z.string().min(1, "Store Name cannot be empty"),
});

type StoreNameFormValues = z.infer<typeof formValidation>;

interface StoreNameFormProps {
  initialData: Store;
}

const StoreNameForm = ({ initialData }: StoreNameFormProps) => {
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const form = useForm<StoreNameFormValues>({
    resolver: zodResolver(formValidation),
    defaultValues: initialData,
  });

  const onSubmit = async (data: StoreNameFormValues) => {
    try {
      setLoading(true);
      const updatedStore = await axios.patch(
        `/api/stores/${params.storeId}`,
        data
      );
      toast({
        title: "Store name updated successfully",
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl leading-tight">Store Name</CardTitle>
        <CardDescription>
          Used to identify your store in the marketplace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default StoreNameForm;
