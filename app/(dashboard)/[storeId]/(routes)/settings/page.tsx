import SettingsForm from "@/components/settings/settings-form";
import { Heading } from "@/components/ui/heading";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface SettingPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage = async ({ params }: SettingPageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="max-w-screen-xl space-y-6 p-8">
      <Heading title="Settings" description="Manage your store settings here" />
      <SettingsForm initialData={store} />
    </div>
  );
};
export default SettingsPage;
