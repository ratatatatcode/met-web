import React from "react";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#34424f] flex min-h-screen w-full items-center justify-center antialiased">
      {children}
    </div>
  );
}
