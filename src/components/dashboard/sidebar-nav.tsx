'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { PharmaTrustLogo } from '@/components/icons';
import {
  LayoutDashboard,
  Truck,
  FileText,
  Settings,
  CircleHelp,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/shipments', label: 'Shipments', icon: Truck },
  { href: '/dashboard/fda-workflow', label: 'FDA Workflow', icon: ShieldCheck },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <>
      <SidebarHeader>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 overflow-hidden"
        >
          <PharmaTrustLogo className="h-8 w-8 text-primary" />
          <span
            className={`font-bold text-lg text-sidebar-foreground transition-opacity duration-200 ${
              state === 'collapsed' ? 'opacity-0' : 'opacity-100'
            }`}
          >
            PharmaTrust
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href) && (item.href === '/dashboard' ? pathname === item.href : true) }
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'Help' }} isActive={pathname.startsWith('/dashboard/help')}>
              <Link href="/dashboard/help">
                <CircleHelp />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={{ children: 'Logout' }}>
              <Link href="/login">
                <LogOut />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
