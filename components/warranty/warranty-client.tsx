"use client";

import { ReceiptTextIcon, TerminalIcon, WalletIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { DataTable } from "../ui/data-table";
import { columns, WarrantyColumn } from "./warranty-columns";
import { useContractStore } from "@/hooks/use-wallet-store";
import { toast } from "../ui/use-toast";

interface WarrantyClientProps {
  data: WarrantyColumn[];
}

const WarrantyClient = ({ data }: WarrantyClientProps) => {
  const {
    account,
    connectWallet,
    contract,
    contractAddress,
    connectContract,
    abi,
  } = useContractStore();
  console.log(account);

  const handleWalletConnect = async () => {
    try {
      const walletConnect = await connectWallet();
      toast({
        title: "Wallet Connected Successfully",
        description: "Your Metamask wallet has been connected successfully!",
      });
    } catch (error) {
      toast({
        title: "Could not connect wallet!",
        description:
          "Something went wrong while connecting your Metamask Wallet",
      });
    }
  };

  const handleContractConnect = async () => {
    try {
      const contractConnect = await connectContract(contractAddress, abi);
      toast({
        title: "Contract Connected Successfully",
        description: "Your warranty contract has been connected successfully!",
      });
    } catch (error) {
      toast({
        title: "Could not connect to contract!",
        description:
          "Something went wrong while connecting your Warranty Contract",
      });
    }
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="w-full flex justify-center items-center gap-4">
        <Alert variant={account ? "default" : "destructive"}>
          <WalletIcon className="h-4 w-4" />
          <AlertTitle>
            {account ? "Wallet Connected!" : "Wallet not connected!"}
          </AlertTitle>
          <AlertDescription>
            {account ? (
              <div>Wallet address: {account}</div>
            ) : (
              <div>
                You cannot mint warranties without connecting wallet.{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={handleWalletConnect}
                >
                  Connect Wallet.
                </span>
              </div>
            )}
          </AlertDescription>
        </Alert>
        <Alert variant={contract ? "default" : "destructive"}>
          <ReceiptTextIcon className="h-4 w-4" />
          <AlertTitle>
            {contract ? "Contract Connected!" : "Contract not connected!"}
          </AlertTitle>
          <AlertDescription>
            {contract ? (
              <div>Contract address: {contractAddress}</div>
            ) : (
              <div>
                You cannot mint warranties without connecting contract.{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={handleContractConnect}
                >
                  Connect Contract.
                </span>
              </div>
            )}
          </AlertDescription>
        </Alert>
      </div>

      <DataTable columns={columns} data={data} searchKey="orderId" />
    </div>
  );
};
export default WarrantyClient;
