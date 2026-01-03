'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  generateMenuSuggestions,
  type MenuSuggestionsInput,
  type MenuSuggestionsOutput,
} from '@/ai/flows/generate-menu-suggestions';
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
import { Loader2, Sparkles, UtensilsCrossed } from 'lucide-react';

const formSchema = z.object({
  budget: z.coerce.number().min(1, 'Budget is required.'),
  eventType: z.string().min(1, 'Event type is required.'),
  numberOfGuests: z.coerce.number().min(1, 'Number of guests is required.'),
  culturalPreferences: z.string().min(1, 'Cultural preferences are required.'),
});

type FormValues = z.infer<typeof formSchema>;

export function MenuSuggester() {
  const [result, setResult] = useState<MenuSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      budget: 1000,
      eventType: 'Wedding',
      numberOfGuests: 50,
      culturalPreferences: 'Italian',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await generateMenuSuggestions(data);
      setResult(output);
    } catch (error) {
      console.error('Failed to generate menu suggestions:', error);
      // You can add toast notifications here for errors
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Menu Planner</CardTitle>
          <CardDescription>
            Describe your event, and our AI will craft the perfect menu for you.
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
                      <Input placeholder="e.g., Wedding, Corporate Gala" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfGuests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50" {...field} />
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
                    <FormLabel>Total Budget (USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 2000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="culturalPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cultural / Dietary Preferences</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Italian, Vegan options, Gluten-free" {...field} />
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
                Generate Menu
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Suggested Menu</CardTitle>
          <CardDescription>
            Here is what our AI chef recommends for your event.
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
                <h3 className="font-semibold text-lg mb-2">Menu Items</h3>
                <ul className="space-y-2">
                  {result.menuSuggestions.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <UtensilsCrossed className="h-4 w-4 mr-3 mt-1 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Rationale</h3>
                <p className="text-muted-foreground">{result.rationale}</p>
              </div>
            </div>
          ) : (
            !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                <Sparkles className="h-12 w-12 mb-4" />
                <p>Your AI-generated menu suggestions will appear here.</p>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
