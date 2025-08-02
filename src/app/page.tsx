import AppLayout from '@/components/layout/app-layout';
import { tickets } from '@/lib/data';
import TicketList from '@/components/tickets/ticket-list';

export default function DashboardPage() {
  // In a real app, you'd fetch this data from a database
  const ticketData = tickets;

  return (
    <AppLayout>
      <TicketList tickets={ticketData} />
    </AppLayout>
  );
}
