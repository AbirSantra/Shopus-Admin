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
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/use-toast";
import { useParams, useRouter } from "next/navigation";

const formValidation = z.object({
  name: z.string().min(1, "Store Name cannot be empty"),
});

type StoreDeleteFormValues = z.infer<typeof formValidation>;

interface StoreDeleteFormProps {
  initialData: Store;
}

const StoreDeleteForm = ({ initialData }: StoreDeleteFormProps) => {
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const form = useForm<StoreDeleteFormValues>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      name: "",
    },
  });

  const confirmPhrase = `Delete store ${initialData.name}`;

  const deletePhrase = form.watch("name");

  const isPhraseCorrect = deletePhrase === confirmPhrase;

  const onSubmit = async (data: StoreDeleteFormValues) => {
    try {
      setLoading(true);
      const deleteStore = await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast({
        title: "Store deleted successfully",
        description: `Your store has been deleted.`,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast({
          title: "Failed to delete store!",
          description: `${error.response?.data}`,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl leading-tight text-red-500">
              Delete your Store
            </CardTitle>
            <CardDescription>
              Please be certain. This will delete all information regarding your
              store from our servers including categories, products, customers,
              orders, etc.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store Name"
                      description={`Type "${confirmPhrase}" to confirm`}
                      className="focus-within:border-red-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button
              type="submit"
              disabled={loading || !isPhraseCorrect}
              variant={"destructive"}
            >
              {loading ? "Deleting..." : "Delete Store"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
export default StoreDeleteForm;
