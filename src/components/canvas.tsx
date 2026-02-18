import { ReactNode } from "react";

export default function Canvas({ children }: { children: ReactNode }) {
  return (
    <div className="relative border-[#c1c2c4 h-100 w-150 border-2 border-solid bg-white overflow-hidden">
      {children}
    </div>
  );
}
