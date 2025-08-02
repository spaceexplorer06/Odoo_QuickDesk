import { notFound } from 'next/navigation';
import AppLayout from '@/components/layout/app-layout';
import TicketDetails from '@/components/tickets/ticket-details';
import { tickets } from '@/lib/data';
import { generateResponseSnippet } from '@/ai/flows/generate-response-snippet';

const getTicketById = (id: string) => {
  return tickets.find(ticket => ticket.id === id);
}

// Server action for AI response snippet
async function handleGenerateResponse(ticketContent: string) {
  'use server';
  return generateResponseSnippet({ ticketContent });
}


export default function TicketPage({ params }: { params: { id: string } }) {
  const ticket = getTicketById(params.id);

  if (!ticket) {
    notFound();
  }

  return (
    <AppLayout>
      <TicketDetails ticket={ticket} generateResponseAction={handleGenerateResponse} />
    </AppLayout>
  );
}
