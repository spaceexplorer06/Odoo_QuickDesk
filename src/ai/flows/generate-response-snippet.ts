'use server';

/**
 * @fileOverview An AI agent that generates response snippets based on the ticket content.
 *
 * - generateResponseSnippet - A function that generates a response snippet for a given ticket content.
 * - GenerateResponseSnippetInput - The input type for the generateResponseSnippet function.
 * - GenerateResponseSnippetOutput - The return type for the generateResponseSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResponseSnippetInputSchema = z.object({
  ticketContent: z.string().describe('The content of the ticket.'),
});
export type GenerateResponseSnippetInput = z.infer<typeof GenerateResponseSnippetInputSchema>;

const GenerateResponseSnippetOutputSchema = z.object({
  responseSnippet: z.string().describe('The generated response snippet.'),
});
export type GenerateResponseSnippetOutput = z.infer<typeof GenerateResponseSnippetOutputSchema>;

export async function generateResponseSnippet(input: GenerateResponseSnippetInput): Promise<GenerateResponseSnippetOutput> {
  return generateResponseSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResponseSnippetPrompt',
  input: {schema: GenerateResponseSnippetInputSchema},
  output: {schema: GenerateResponseSnippetOutputSchema},
  prompt: `You are a helpful AI assistant that generates response snippets for support agents based on the ticket content.

  Given the following ticket content, generate a concise and helpful response snippet that the agent can use as a starting point.

  Ticket Content:
  {{ticketContent}}

  Response Snippet:`,
});

const generateResponseSnippetFlow = ai.defineFlow(
  {
    name: 'generateResponseSnippetFlow',
    inputSchema: GenerateResponseSnippetInputSchema,
    outputSchema: GenerateResponseSnippetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
