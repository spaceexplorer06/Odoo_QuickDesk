'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2, Upload } from 'lucide-react';
import type { SuggestTicketCategoryOutput } from '@/ai/flows/suggest-ticket-category';
import { Badge } from '../ui/badge';

const formSchema = z.object({
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters long.' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters long.' }),
  category: z.string({ required_error: 'Please select a category.' }),
});

type NewTicketFormProps = {
  suggestCategoryAction: (ticketContent: string) => Promise<SuggestTicketCategoryOutput>;
};

export default function NewTicketForm({ suggestCategoryAction }: NewTicketFormProps) {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      description: '',
    },
  });

  const handleSuggestCategory = async () => {
    const description = form.getValues('description');
    if (description.length < 20) {
      toast({
        title: 'Description too short',
        description: 'Please enter at least 20 characters in the description to get suggestions.',
        variant: 'destructive',
      });
      return;
    }
    setIsSuggesting(true);
    setSuggestedCategories([]);
    try {
      const result = await suggestCategoryAction(description);
      if (result.suggestedCategories && result.suggestedCategories.length > 0) {
        setSuggestedCategories(result.suggestedCategories);
        toast({
            title: 'Categories Suggested!',
            description: result.reasoning,
        });
      } else {
        toast({
            title: 'No suggestions found',
            description: 'We couldn\'t find a specific category. Please select one manually.',
            variant: 'default',
        })
      }
    } catch (error) {
      toast({
        title: 'Error suggesting category',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Ticket Created (Simulated)',
      description: 'Your ticket has been successfully submitted.',
    });
    form.reset();
    setSuggestedCategories([]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Ticket</CardTitle>
        <CardDescription>
          Fill out the form below and our support team will get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cannot reset my password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your issue in detail..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <div className="flex items-start gap-2">
                    <div className="flex-grow">
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Technical Support">Technical Support</SelectItem>
                            <SelectItem value="Billing Inquiry">Billing Inquiry</SelectItem>
                            <SelectItem value="Account Management">Account Management</SelectItem>
                            <SelectItem value="Feature Request">Feature Request</SelectItem>
                            <SelectItem value="Bug Report">Bug Report</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {suggestedCategories.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                <span className="text-sm text-muted-foreground">Suggestions:</span>
                                {suggestedCategories.map(cat => (
                                    <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => form.setValue('category', cat)}>
                                        {cat}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                    <Button type="button" variant="outline" onClick={handleSuggestCategory} disabled={isSuggesting}>
                      {isSuggesting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                      )}
                      Suggest
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
                <FormLabel>Attachments (Optional)</FormLabel>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">SVG, PNG, JPG (MAX. 5MB)</p>
                        </div>
                        <Input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div> 
            </FormItem>

            <Button type="submit" className="w-full">Submit Ticket</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
