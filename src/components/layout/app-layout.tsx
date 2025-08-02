'use client';

import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import MainSidebar from '@/components/layout/main-sidebar';
import { TicketProvider } from '@/context/ticket-context';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <TicketProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <MainSidebar />
          <SidebarInset>
            <div className="min-h-screen w-full">
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TicketProvider>
  );
}
