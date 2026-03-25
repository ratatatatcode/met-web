import { ReactNode } from 'react';

export default function Canvas({ children }: { children: ReactNode }) {
  return (
    <div className="moving-sky relative h-100 w-150 overflow-hidden border-2 border-solid border-[#2e2f31]">
      {children}
    </div>
  );
}
