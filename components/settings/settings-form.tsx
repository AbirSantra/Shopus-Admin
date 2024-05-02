"use client";

import { Store } from "@prisma/client";
import StoreNameForm from "./store-name-form";
import StoreDeleteForm from "./store-delete-form";
import { Subheading } from "../ui/subheading";
import { Separator } from "../ui/separator";

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm = ({ initialData }: SettingsFormProps) => {
  return (
    <div className="space-y-6 max-w-screen-lg mx-auto p-8">
      <StoreNameForm initialData={initialData} />
      {/* <Separator /> */}
      <StoreDeleteForm initialData={initialData} />
    </div>
  );
};
export default SettingsForm;
