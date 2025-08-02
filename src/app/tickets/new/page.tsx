import AppLayout from '@/components/layout/app-layout';
import NewTicketForm from '@/components/tickets/new-ticket-form';
import { suggestTicketCategory } from '@/ai/flows/suggest-ticket-category';

// Server action that wraps the Genkit flow
async function handleSuggestCategory(ticketContent: string) {
  'use server';
  return suggestTicketCategory({ ticketContent });
}

export default function NewTicketPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <NewTicketForm suggestCategoryAction={handleSuggestCategory} />
        </div>
      </div>
    </AppLayout>
  );
}
