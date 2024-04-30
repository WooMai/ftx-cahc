import { Shell } from "./_components/shell";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <Shell>{children}</Shell>;
}
