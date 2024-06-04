"use client";

import {
  CopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "../ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "../modals/alert-modal";
import { WarrantyColumn } from "./warranty-columns";
import { ethers } from "ethers";
import { useContractStore } from "@/hooks/use-wallet-store";

interface WarrantyCellActionProps {
  data: WarrantyColumn;
}

export const WarrantyCellAction = ({ data }: WarrantyCellActionProps) => {
  const router = useRouter();
  const params = useParams();
  const {
    connectWallet,
    account,
    contract,
    connectContract,
    contractAddress,
    abi,
    disconnect,
    provider,
    signer,
  } = useContractStore();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Copied to Clipboard!",
      description: "Order ID has been copied to your clipboard",
    });
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${data.id}`);
      router.refresh();
      toast({
        title: "Product deleted successfully!",
        description: "Your product has been deleted.",
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

  /* 
  orderId: string;
  storeId: string;
  customerId: string;
  customerName: string;
  orderedAt: string;
  productId: string;
  productName: string;
  price: string;
  */

  const handleMintWarranty = async () => {
    const tx = await contract.mintWarranty(
      data.orderId,
      params.storeId,
      "0003",
      "Customer A",
      "27th May 2024",
      "0004",
      data.productName,
      "1600"
    );

    // Wait for the transaction to be mined
    await tx.wait();
    toast({
      title: "Product Warranty Minted successfully!",
      description: "Your product warranty has been minted.",
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.orderId)}>
            <CopyIcon className="mr-2 h-4 w-4" /> Copy ID
          </DropdownMenuItem>
          {data.warrantyStatus === "Pending" && (
            <DropdownMenuItem onClick={() => handleMintWarranty()}>
              <EditIcon className="mr-2 h-4 w-4" /> Mint Warranty
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
