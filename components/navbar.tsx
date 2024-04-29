import { auth, UserButton } from "@clerk/nextjs";
import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import Logo from "./logo";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <div className="h-full flex flex-col items-center p-4 gap-8 border-r">
      <Logo iconOnly logoHeight={32} logoWidth={32} />
      <MainNav className="" />
      <div className="mt-auto flex flex-col justify-center items-center gap-8">
        <StoreSwitcher items={stores} />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
export default Navbar;
