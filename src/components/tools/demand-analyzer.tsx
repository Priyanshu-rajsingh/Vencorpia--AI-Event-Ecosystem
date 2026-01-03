'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  analyzeVendorDemand,
  type AnalyzeVendorDemandInput,
  type AnalyzeVendorDemandOutput,
} from '@/ai/flows/analyze-vendor-demand';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, LineChart } from 'lucide-react';

const formSchema = z.object({
  vendorServices: z.string().min(1, 'Services description is required.'),
  vendorLocation: z.string().min(1, 'Location is required.'),
  historicalBookingData: z.string().min(1, 'Historical data is required.'),
  marketTrends: z.string().min(1, 'Market trends are required.'),
});

type FormValues = z.infer<typeof formSchema>;

export function DemandAnalyzer() {
  const [result, setResult] = useState<AnalyzeVendorDemandOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendorServices: 'High-end wedding photography and videography.',
      vendorLocation: 'San Francisco, CA',
      historicalBookingData: 'Bookings peak in June and September. Higher demand for weekend packages. Average price per booking: $4000.',
      marketTrends: 'Growing interest in cinematic wedding videos and drone photography. Micro-weddings are becoming more popular.',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await analyzeVendorDemand(data);
      setResult(output);
    } catch (error) {
      console.error('Failed to analyze vendor demand:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Demand & Pricing Analyzer</CardTitle>
          <CardDescription>
            (For Vendors) - Get AI-driven insights to optimize your services and pricing strategy.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="vendorServices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Services</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the services you offer..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vendorLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="historicalBookingData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historical Booking Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Peak seasons, popular packages, average prices..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketTrends"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observed Market Trends</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Rise of micro-weddings, new tech..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Analyze My Business
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Business Optimization Report</CardTitle>
          <CardDescription>
            Actionable insights to help you grow your event business.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
           {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}
          {result ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Demand Analysis</h3>
                <p className="text-muted-foreground">{result.demandAnalysis}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Pricing Guidance</h3>
                <p className="text-muted-foreground">{result.pricingGuidance}</p>
              </div>
               <div>
                <h3 className="font-semibold text-lg mb-2">Suggested Optimizations</h3>
                <p className="text-muted-foreground">{result.suggestedOptimizations}</p>
              </div>
            </div>
          ) : (
             !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                <Sparkles className="h-12 w-12 mb-4" />
                <p>Your AI-generated business analysis will appear here.</p>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
