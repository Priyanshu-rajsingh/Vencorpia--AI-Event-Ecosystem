'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating catering menu suggestions based on user preferences.
 *
 * It exports:
 * - `generateMenuSuggestions`: An async function that takes user preferences as input and returns menu suggestions.
 * - `MenuSuggestionsInput`: The TypeScript type for the input schema.
 * - `MenuSuggestionsOutput`: The TypeScript type for the output schema.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MenuSuggestionsInputSchema = z.object({
  budget: z.number().describe('The budget for the catering menu.'),
  eventType: z.string().describe('The type of event (e.g., wedding, corporate).'),
  numberOfGuests: z.number().describe('The number of guests attending the event.'),
  culturalPreferences: z.string().describe('The cultural preferences for the menu (e.g., Italian, Indian).'),
});
export type MenuSuggestionsInput = z.infer<typeof MenuSuggestionsInputSchema>;

const MenuSuggestionsOutputSchema = z.object({
  menuSuggestions: z.array(z.string()).describe('An array of suggested menu items.'),
  rationale: z.string().describe('Explanation of why the suggestions are appropriate for the given criteria.'),
});
export type MenuSuggestionsOutput = z.infer<typeof MenuSuggestionsOutputSchema>;

export async function generateMenuSuggestions(input: MenuSuggestionsInput): Promise<MenuSuggestionsOutput> {
  return generateMenuSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'menuSuggestionsPrompt',
  input: {schema: MenuSuggestionsInputSchema},
  output: {schema: MenuSuggestionsOutputSchema},
  prompt: `You are an AI assistant specializing in generating catering menu suggestions for events.

  Based on the following criteria, suggest a list of menu items suitable for the event.

  Budget: {{{budget}}}
  Event Type: {{{eventType}}}
  Number of Guests: {{{numberOfGuests}}}
  Cultural Preferences: {{{culturalPreferences}}}

  Provide specific menu item suggestions, and explain why these suggestions align well with the provided criteria, considering both cost-effectiveness and guest satisfaction.`,
});

const generateMenuSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateMenuSuggestionsFlow',
    inputSchema: MenuSuggestionsInputSchema,
    outputSchema: MenuSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
