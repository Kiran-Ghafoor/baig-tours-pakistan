import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";
import { AuthGuard } from "@/components/admin/auth-guard";

export const metadata: Metadata = {
  title: { default: "Admin Dashboard", template: "%s | Baig Tours Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-cream-200">
        <AdminSidebar />
        <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
          <AdminTopbar />
          <main id="main-content" className="flex-1 p-5 md:p-8">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
