import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { Header } from '@/components/dashboard/header';
import { SidebarNav } from '@/components/dashboard/sidebar-nav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none">
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
