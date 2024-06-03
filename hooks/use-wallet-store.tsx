import { ethers, Signer } from "ethers";
import { create } from "zustand";

interface OrderContractStoreState {
  account: string | null;
  signer: Signer | null;
  provider: ethers.BrowserProvider | null;
  contract: ethers.Contract | null;
  abi: Array<{
    anonymous?: boolean;
    inputs: Array<{
      indexed?: boolean;
      internalType: string;
      name: string;
      type: string;
    }>;
    name?: string;
    type: string;
    stateMutability?: string;
    outputs?: Array<{
      internalType: string;
      name: string;
      type: string;
      components?: any[];
    }>;
  }>;
  contractAddress: string;
  connectWallet: () => Promise<void>;
  connectContract: (contractAddress: string, contractABI: any) => Promise<void>;
  disconnect: () => Promise<void>;
}

export const useContractStore = create<OrderContractStoreState>((set) => ({
  account: null,
  signer: null,
  provider: null,
  contract: null,
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "productName",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "purchaseDate",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "expirationDate",
          type: "uint256",
        },
      ],
      name: "WarrantyMinted",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getWarranty",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "id",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "string",
              name: "productName",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "purchaseDate",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "expirationDate",
              type: "uint256",
            },
          ],
          internalType: "struct ProductWarranty.Warranty",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_productName",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_purchaseDate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_expirationDate",
          type: "uint256",
        },
      ],
      name: "mintWarranty",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "nextWarrantyId",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "warranties",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "string",
          name: "productName",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "purchaseDate",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "expirationDate",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  contractAddress: "0xa7973e508162cae8a24d5b6aa12a1a95b7700811",

  connectWallet: async () => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed!");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      console.log("connected to MetaMask with address:", address);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      set({
        account: address,
        provider,
        signer,
      });
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  },

  connectContract: async (contractAddress: string, contractABI: any) => {
    try {
      const state = useContractStore.getState();
      const { signer } = state;

      if (!signer) {
        throw new Error("No signer available");
      }

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      set({ contract });
    } catch (error) {
      console.error("Error connecting to contract:", error);
    }
  },

  disconnect: async () => {
    try {
      await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [{ eth_accounts: {} }],
      });

      set({
        account: null,
        signer: null,
        provider: null,
        contract: null,
      });
    } catch (error) {
      console.error("Error disconnecting from MetaMask:", error);
    }
  },
}));

export const setAccount = (account: string | null) =>
  useContractStore.setState({ account });
export const setSigner = (signer: Signer | null) =>
  useContractStore.setState({ signer });
export const setProvider = (provider: ethers.BrowserProvider | null) =>
  useContractStore.setState({ provider });
export const setContract = (contract: ethers.Contract | null) =>
  useContractStore.setState({ contract });
