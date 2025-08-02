'use client'

import { notFound } from 'next/navigation';
import AppLayout from '@/components/layout/app-layout';
import TicketDetails from '@/components/tickets/ticket-details';
import { generateResponseSnippet } from '@/ai/flows/generate-response-snippet';
import { useTickets } from '@/context/ticket-context';

// Server action for AI response snippet
async function handleGenerateResponse(ticketContent: string) {
  'use server';
  return generateResponseSnippet({ ticketContent });
}

export default function TicketPage({ params }: { params: { id: string } }) {
  const { getTicketById } = useTickets();
  const ticket = getTicketById(params.id);

  if (!ticket) {
    // We need to render something while waiting for the ticket data
    // or if the ticket is not found after checking.
    // A simple loading or not found message.
    // notFound() can be used if the context is guaranteed to be up-to-date on initial render
    // but with client-side context, we should handle the 'not found' case gracefully.
    return (
        <AppLayout>
            <div className="container mx-auto p-4 md:p-6">
                <p>Ticket not found or is loading...</p>
            </div>
        </AppLayout>
    )
  }

  return (
    <AppLayout>
      <TicketDetails ticket={ticket} generateResponseAction={handleGenerateResponse} />
    </AppLayout>
  );
}
