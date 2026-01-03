'use server';

/**
 * @fileOverview Provides decor theme suggestions tailored to the user's budget, venue size, event type, and occasion tone.
 *
 * - provideDecorRecommendations - A function that provides decor theme suggestions.
 * - ProvideDecorRecommendationsInput - The input type for the provideDecorRecommendations function.
 * - ProvideDecorRecommendationsOutput - The return type for the provideDecorRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideDecorRecommendationsInputSchema = z.object({
  budget: z.number().describe('The budget for the decor in USD.'),
  venueSize: z.string().describe('The size of the venue (e.g., small, medium, large).'),
  eventType: z.string().describe('The type of event (e.g., wedding, corporate, birthday).'),
  occasionTone: z.string().describe('The tone of the occasion (e.g., elegant, minimal, traditional, royal, modern).'),
});
export type ProvideDecorRecommendationsInput = z.infer<typeof ProvideDecorRecommendationsInputSchema>;

const ProvideDecorRecommendationsOutputSchema = z.object({
  themeSuggestions: z.array(
    z.string().describe('A suggested decor theme.')
  ).describe('A list of decor theme suggestions.'),
  budgetAllocation: z.string().describe('Suggested budget allocation for different decor elements.'),
  visualAids: z.array(
    z.string().describe('Data URI of a generated image for each theme suggestion.')
  ).optional().describe('Optional visual aids to visualize decor themes.'),
});
export type ProvideDecorRecommendationsOutput = z.infer<typeof ProvideDecorRecommendationsOutputSchema>;

export async function provideDecorRecommendations(input: ProvideDecorRecommendationsInput): Promise<ProvideDecorRecommendationsOutput> {
  return provideDecorRecommendationsFlow(input);
}

const decorRecommendationsPrompt = ai.definePrompt({
  name: 'decorRecommendationsPrompt',
  input: {schema: ProvideDecorRecommendationsInputSchema},
  output: {schema: ProvideDecorRecommendationsOutputSchema},
  prompt: `You are an AI event decorator assistant. Based on the user's input, suggest decor themes, budget allocation and generate visual aids to help the user visualize and plan the event's ambiance effectively.

Budget: {{{budget}}}
Venue Size: {{{venueSize}}}
Event Type: {{{eventType}}}
Occasion Tone: {{{occasionTone}}}

Provide theme suggestions tailored to the budget, venue size, event type, and occasion tone.
Suggest budget allocation for different decor elements.
Generate visual aids to visualize decor themes.

Format your response as a JSON object matching the schema. Make sure to generate at least 3 theme suggestions. For each theme suggestion, consider generating visual aid.`,
});

const provideDecorRecommendationsFlow = ai.defineFlow(
  {
    name: 'provideDecorRecommendationsFlow',
    inputSchema: ProvideDecorRecommendationsInputSchema,
    outputSchema: ProvideDecorRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await decorRecommendationsPrompt(input);

    // Optional: Generate visual aids (images) for each theme suggestion
    if (output?.themeSuggestions) {
      const visualAids = [];
      for (const theme of output.themeSuggestions) {
        try {
          const { media } = await ai.generate({
            model: 'googleai/imagen-4.0-fast-generate-001',
            prompt: `Generate an image of ${theme} decor theme for ${input.eventType} event with ${input.occasionTone} tone.`, // refine prompt based on other input parameters
          });
          visualAids.push(media.url);
        } catch (error) {
          console.error(`Failed to generate image for ${theme}: ${error}`);
          visualAids.push("No image available"); // Placeholder if image generation fails
        }
      }
      output.visualAids = visualAids; // Assign the generated images
    }

    return output!;
  }
);
