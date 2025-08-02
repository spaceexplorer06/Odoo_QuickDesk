'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Home,
  PlusCircle,
  LogIn,
  LogOut,
  UserPlus,
  LifeBuoy,
  Settings,
} from 'lucide-react';
import type { User } from '@/lib/types';

// In a real app this would come from an auth context
const currentUser: User | null = {
  id: 'usr_1',
  name: 'John Doe',
  avatar: 'https://placehold.co/100x100.png',
  role: 'agent',
};

export default function MainSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <LifeBuoy className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold group-data-[collapsible=icon]:hidden">HelpHub</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard" passHref legacyBehavior>
              <SidebarMenuButton
                isActive={isActive('/dashboard')}
                tooltip="Dashboard"
              >
                <Home />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/tickets/new" passHref legacyBehavior>
              <SidebarMenuButton
                isActive={isActive('/tickets/new')}
                tooltip="New Ticket"
              >
                <PlusCircle />
                <span>New Ticket</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        {currentUser ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} data-ai-hint="person" />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-semibold">{currentUser.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{currentUser.role}</span>
              </div>
            </div>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/settings" passHref legacyBehavior>
                        <SidebarMenuButton isActive={isActive('/settings')} tooltip="Settings">
                            <Settings />
                            <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link href="/login" passHref legacyBehavior>
                      <SidebarMenuButton tooltip="Logout">
                        <LogOut />
                        <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                      </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
          </div>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/login" passHref legacyBehavior>
                <SidebarMenuButton tooltip="Login">
                  <LogIn />
                  <span className="group-data-[collapsible=icon]:hidden">Login</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/signup" passHref legacyBehavior>
                <SidebarMenuButton tooltip="Sign Up">
                  <UserPlus />
                  <span className="group-data-[collapsible=icon]:hidden">Sign Up</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
