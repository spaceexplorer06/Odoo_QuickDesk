// Implemented the AI-powered ticket category suggestion flow using Genkit.

'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting ticket categories based on the ticket content.
 *
 * - suggestTicketCategory - A function that suggests categories for a given ticket.
 * - SuggestTicketCategoryInput - The input type for the suggestTicketCategory function.
 * - SuggestTicketCategoryOutput - The output type for the suggestTicketCategory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTicketCategoryInputSchema = z.object({
  ticketContent: z.string().describe('The content of the ticket.'),
});
export type SuggestTicketCategoryInput = z.infer<typeof SuggestTicketCategoryInputSchema>;

const SuggestTicketCategoryOutputSchema = z.object({
  suggestedCategories: z
    .array(z.string())
    .describe('An array of suggested categories for the ticket.'),
  reasoning: z
    .string()
    .optional()
    .describe('The AI reasoning behind the suggested categories.'),
});
export type SuggestTicketCategoryOutput = z.infer<typeof SuggestTicketCategoryOutputSchema>;

export async function suggestTicketCategory(input: SuggestTicketCategoryInput): Promise<SuggestTicketCategoryOutput> {
  return suggestTicketCategoryFlow(input);
}

const suggestTicketCategoryPrompt = ai.definePrompt({
  name: 'suggestTicketCategoryPrompt',
  input: {schema: SuggestTicketCategoryInputSchema},
  output: {schema: SuggestTicketCategoryOutputSchema},
  prompt: `You are an AI assistant helping to categorize support tickets.

  Given the content of a support ticket, suggest relevant categories from the following list:

  - Technical Support
  - Billing Inquiry
  - Account Management
  - Feature Request
  - Bug Report
  - Other

  Ticket Content: {{{ticketContent}}}

  Please provide an array of suggested categories that best fit the ticket content. 
  Also include a brief reasoning for your suggestions.

  Ensure that the output is a valid JSON object that conforms to the SuggestTicketCategoryOutputSchema schema.`, // Ensure valid JSON output
});

const suggestTicketCategoryFlow = ai.defineFlow(
  {
    name: 'suggestTicketCategoryFlow',
    inputSchema: SuggestTicketCategoryInputSchema,
    outputSchema: SuggestTicketCategoryOutputSchema,
  },
  async input => {
    const {output} = await suggestTicketCategoryPrompt(input);
    return output!;
  }
);
