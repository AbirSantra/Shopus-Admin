"use client";

import { Store } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  PlusCircleIcon,
  StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);

  const onStoreChange = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
    toast({
      title: "Switched Store!",
      description: `Successfully switched to ${store.label}`,
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        role="combobox"
        aria-expanded={open}
        aria-label="Select a store"
        className={cn("text-muted-foreground", className)}
      >
        <StoreIcon />
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Store" />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Your Stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreChange(store)}
                  className={cn(
                    currentStore?.value === store.value && "font-semibold",
                    "text-sm"
                  )}
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4 text-orange-500",
                      currentStore?.value === store.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="text-sm cursor-pointer"
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircleIcon className="mr-2 h-5 w-5" />
                Create new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default StoreSwitcher;
