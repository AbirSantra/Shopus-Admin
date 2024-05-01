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
    <div className="space-y-12">
      <StoreNameForm initialData={initialData} />
      {/* <Separator /> */}
      <div className="space-y-6">
        <Subheading title="Danger Zone" description="Tread carefully" />
        <StoreDeleteForm initialData={initialData} />
      </div>
    </div>
  );
};
export default SettingsForm;
