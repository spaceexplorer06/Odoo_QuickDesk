import AppLayout from '@/components/layout/app-layout';
import TicketList from '@/components/tickets/ticket-list';

export default function DashboardPage() {
  return (
    <AppLayout>
      <TicketList />
    </AppLayout>
  );
}
