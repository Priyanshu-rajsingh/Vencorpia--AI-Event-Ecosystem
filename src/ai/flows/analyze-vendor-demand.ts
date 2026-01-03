'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing vendor demand and providing pricing guidance.
 *
 * - analyzeVendorDemand - A function that analyzes vendor demand.
 * - AnalyzeVendorDemandInput - The input type for the analyzeVendorDemand function.
 * - AnalyzeVendorDemandOutput - The return type for the analyzeVendorDemand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeVendorDemandInputSchema = z.object({
  vendorServices: z
    .string()
    .describe('A description of the services offered by the vendor.'),
  vendorLocation: z.string().describe('The location where the vendor operates.'),
  historicalBookingData: z
    .string()
    .describe('Historical booking data for the vendor, including dates, times, and prices.'),
  marketTrends: z.string().describe('Current market trends in the event industry.'),
});
export type AnalyzeVendorDemandInput = z.infer<typeof AnalyzeVendorDemandInputSchema>;

const AnalyzeVendorDemandOutputSchema = z.object({
  demandAnalysis: z
    .string()
    .describe('An analysis of the demand for the vendor services, including peak seasons and popular services.'),
  pricingGuidance: z
    .string()
    .describe('Pricing guidance for the vendor, including recommended prices for different services and times of the year.'),
  suggestedOptimizations: z
    .string()
    .describe('Suggestions for optimizing the vendor offerings, such as adding new services or targeting specific customer segments.'),
});
export type AnalyzeVendorDemandOutput = z.infer<typeof AnalyzeVendorDemandOutputSchema>;

export async function analyzeVendorDemand(input: AnalyzeVendorDemandInput): Promise<AnalyzeVendorDemandOutput> {
  return analyzeVendorDemandFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeVendorDemandPrompt',
  input: {schema: AnalyzeVendorDemandInputSchema},
  output: {schema: AnalyzeVendorDemandOutputSchema},
  prompt: `You are an AI assistant designed to analyze vendor demand and provide pricing guidance.

  Analyze the following information to provide insights to the vendor.

  Vendor Services: {{{vendorServices}}}
  Vendor Location: {{{vendorLocation}}}
  Historical Booking Data: {{{historicalBookingData}}}
  Market Trends: {{{marketTrends}}}

  Provide a detailed analysis of the demand for the vendor services, pricing guidance, and suggestions for optimizing the vendor offerings.  Your suggestions should take into account the vendor's location, services, historical booking data, and current market trends.
  Demand Analysis:
  Pricing Guidance:
  Suggested Optimizations:`,
});

const analyzeVendorDemandFlow = ai.defineFlow(
  {
    name: 'analyzeVendorDemandFlow',
    inputSchema: AnalyzeVendorDemandInputSchema,
    outputSchema: AnalyzeVendorDemandOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
