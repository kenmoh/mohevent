import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex flex-center wrapper flex-between flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">MohEvent</Link>
        <p>2024 MohEvent. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
