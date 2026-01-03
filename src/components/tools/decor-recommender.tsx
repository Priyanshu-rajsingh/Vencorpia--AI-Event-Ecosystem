'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  provideDecorRecommendations,
  type ProvideDecorRecommendationsInput,
  type ProvideDecorRecommendationsOutput,
} from '@/ai/flows/provide-decor-recommendations';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Sparkles, Paintbrush } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const formSchema = z.object({
  budget: z.coerce.number().min(1, 'Budget is required.'),
  venueSize: z.string().min(1, 'Venue size is required.'),
  eventType: z.string().min(1, 'Event type is required.'),
  occasionTone: z.string().min(1, 'Occasion tone is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export function DecorRecommender() {
  const [result, setResult] = useState<ProvideDecorRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 5000,
      venueSize: 'Medium',
      eventType: 'Wedding',
      occasionTone: 'Elegant',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await provideDecorRecommendations(data);
      setResult(output);
    } catch (error) {
      console.error('Failed to provide decor recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Décor Recommender</CardTitle>
          <CardDescription>
            Let our AI designer envision the perfect look for your event.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Wedding" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Décor Budget (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="venueSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a venue size" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Small">Small (e.g., room, small hall)</SelectItem>
                        <SelectItem value="Medium">Medium (e.g., banquet hall)</SelectItem>
                        <SelectItem value="Large">Large (e.g., convention center)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="occasionTone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Tone / Style</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a tone" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Elegant">Elegant</SelectItem>
                        <SelectItem value="Minimal">Minimal</SelectItem>
                        <SelectItem value="Traditional">Traditional</SelectItem>
                        <SelectItem value="Royal">Royal</SelectItem>
                        <SelectItem value="Modern">Modern</SelectItem>
                      </SelectContent>
                    </Select>
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
                Generate Décor Ideas
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Décor Recommendations</CardTitle>
          <CardDescription>
            Visual concepts and themes generated by our AI.
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
                <h3 className="font-semibold text-lg mb-2">Theme Suggestions</h3>
                <ul className="space-y-2 text-muted-foreground">
                   {result.themeSuggestions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Paintbrush className="h-4 w-4 mr-3 mt-1 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Budget Allocation</h3>
                <p className="text-muted-foreground">{result.budgetAllocation}</p>
              </div>
               <div>
                <h3 className="font-semibold text-lg mb-2">Visual Aids</h3>
                 <ScrollArea className="w-full">
                  <div className="flex space-x-4 pb-4">
                  {result.visualAids?.map((src, index) => (
                    src && src !== "No image available" ? (
                      <div key={index} className="w-64 h-64 relative rounded-md overflow-hidden shrink-0">
                        <Image src={src} alt={result.themeSuggestions[index] || 'Decor visual'} fill className="object-cover" />
                        <div className="absolute inset-x-0 bottom-0 p-2 bg-black/50 text-white text-xs text-center">
                          {result.themeSuggestions[index]}
                        </div>
                      </div>
                    ) : null
                  ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          ) : (
             !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                <Sparkles className="h-12 w-12 mb-4" />
                <p>Your AI-generated décor ideas will appear here.</p>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
