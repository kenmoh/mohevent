import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FiAlignJustify } from "react-icons/fi";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="">
      <Sheet>
        <SheetTrigger className="align-middle md:hidden">
          <FiAlignJustify className="h-6 w-6 cursor-pointer text-gray-700" />
        </SheetTrigger>
        <SheetContent className="flex flex-col bg-white gap-6">
          <SheetHeader>
            <h1>MohEvent</h1>
          </SheetHeader>
          <Separator className="border border-gray-50" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
