import { auth, UserButton } from "@clerk/nextjs";
import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import Logo from "./logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
    <TooltipProvider>
      <div className="h-full flex flex-col items-center p-4 gap-8 border-r">
        <Logo iconOnly />
        <MainNav />
        <div className="mt-auto flex flex-col justify-center items-center gap-6">
          <StoreSwitcher items={stores} />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </TooltipProvider>
  );
};
export default Navbar;
