import React from "react";
import Logo from "@/components/logo";
import Image from "next/image";
import authImage from "@/public/auth-banner.jpeg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full text-slate-900">
      <section className="flex flex-[2] w-full h-full flex-col justify-between p-8">
        <Logo logoClassName="w-8 h-8" className="self-start" />
        <div className="w-full flex justify-center items-center">
          {children}
        </div>
        <p className="text-xs text-slate-400">
          Shopus &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </section>
      <section className="hidden h-full w-full flex-[3] lg:flex p-4">
        <Image
          src={authImage}
          alt="Picture of newpaper headlines"
          style={{ objectFit: "cover" }}
          className="w-full grayscale rounded-xl"
        />
      </section>
    </div>
  );
};

export default AuthLayout;
