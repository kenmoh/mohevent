import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center min-h-screen w-full bg-gray-200 bg-cover bg-fixed bg-center">
      {children}
    </div>
  );
};

export default Layout;
