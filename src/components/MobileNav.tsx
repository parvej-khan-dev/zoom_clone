"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[]264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="./icons/hamburger.svg"
            alt="nav mobile"
            height={36}
            width={36}
            className="cursor-pointer sm:hidden"
          />{" "}
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1 ">
          <Link href="/" className="flex items-center gap-1 ">
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={32}
              height={32}
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white ">Yoom</p>
          </Link>
          <div className="flex h-[calc(100vh -72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks?.map(
                  (link: { label: string; route: string; imgUrl: string }) => {
                    console.log("link router", link.route, pathname);
                    const isActive = pathname === link.route;
                    return (
                      <SheetClose asChild key={link.route}>
                        <Link
                          href={link.route}
                          key={link.label}
                          className={cn(
                            "flex gap-4 items-center p-5 rounded-lg w-full max-w-60",
                            {
                              "bg-blue-1": isActive,
                            }
                          )}
                        >
                          <Image
                            src={link.imgUrl}
                            alt={link.label}
                            width={20}
                            height={20}
                          />
                          <p className="font-semibold">{link.label}</p>
                        </Link>
                      </SheetClose>
                    );
                  }
                )}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
