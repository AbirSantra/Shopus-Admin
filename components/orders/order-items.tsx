"use client";

import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";

interface OrderItemsProps {
  disabled?: boolean;
  onChange: (value: { productId: string; includeWarranty: boolean }) => void;
  onRemove: (value: { productId: string }) => void;
  products: Product[];
  value: {
    productId: string;
    includeWarranty: boolean;
  }[];
}

const OrderItems = ({
  disabled,
  onChange,
  onRemove,
  value,
  products,
}: OrderItemsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [includeWarranty, setIncludeWarranty] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAdd = () => {
    if (selectedProduct) {
      onChange({
        productId: selectedProduct,
        includeWarranty: includeWarranty,
      });
    }
  };

  const selectedProducts = products.filter((product) =>
    value.some((pid) => pid.productId === product.id)
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4">
        {selectedProducts.map((product) => {
          const orderItemInfo = value.find(
            (pid) => pid.productId === product.id
          );

          return (
            <div
              key={product.id}
              className="w-full border rounded-md p-4 text-sm flex justify-between items-center"
            >
              <div className="flex flex-col gap-2">
                <p>{product.name}</p>
                {orderItemInfo?.includeWarranty && (
                  <Badge className="bg-slate-500 w-fit">
                    Warranty Included
                  </Badge>
                )}
              </div>
              <Button
                type="button"
                onClick={() => onRemove({ productId: product.id })}
                variant={"default"}
                size={"icon"}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"} className="w-full">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a Product</DialogTitle>
            <DialogDescription>
              Add a product to this order by selecting it below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select onValueChange={(value) => setSelectedProduct(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>
              <SelectContent>
                {products?.map((product) => (
                  <SelectItem value={product.id} key={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox
                id="include-warranty"
                checked={includeWarranty}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setIncludeWarranty(true);
                  } else {
                    setIncludeWarranty(false);
                  }
                }}
              />
              <label
                htmlFor="include-warranty"
                className="space-y-1 leading-none cursor-pointer"
              >
                <p className="text-sm font-medium">Include Warranty</p>
                <p className="text-xs text-slate-400">
                  Get an NFT based warranty and ownership certificate
                </p>
              </label>
            </div>
            <Button onClick={handleAdd} disabled={false}>
              Add to Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default OrderItems;
