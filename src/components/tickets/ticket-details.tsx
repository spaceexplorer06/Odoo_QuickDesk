'use client';

import { useState } from 'react';
import type { Ticket, TicketStatus } from '@/lib/types';
import type { GenerateResponseSnippetOutput } from '@/ai/flows/generate-response-snippet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Wand2, Loader2, Send, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';
import { users } from '@/lib/data';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import TicketComments from './ticket-comments';

const statusColors: { [key in TicketStatus]: string } = {
  'Open': 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
  'Resolved': 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
  'Closed': 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
};

type TicketDetailsProps = {
    ticket: Ticket;
    generateResponseAction: (ticketContent: string) => Promise<GenerateResponseSnippetOutput>;
}

export default function TicketDetails({ ticket, generateResponseAction }: TicketDetailsProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();

  const handleGenerateResponse = async () => {
    setIsGenerating(true);
    try {
        const result = await generateResponseAction(ticket.description);
        if (result.responseSnippet) {
            setNewComment(result.responseSnippet);
            toast({
                title: 'Response Generated',
                description: 'A response snippet has been added to your comment box.',
            });
        }
    } catch (error) {
        toast({
            title: 'Error Generating Response',
            description: 'Could not generate a response snippet. Please try again.',
            variant: 'destructive',
        });
    } finally {
        setIsGenerating(false);
    }
  }

  const agents = users.filter(u => u.role === 'agent');

  return (
    <div className="container mx-auto p-4 md:p-6">
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                           <div>
                            <Badge variant="secondary" className="mb-2">{ticket.category}</Badge>
                            <CardTitle className="text-2xl font-bold">{ticket.subject}</CardTitle>
                            <CardDescription className="text-md text-muted-foreground">{ticket.id}</CardDescription>
                           </div>
                           <Badge variant="outline" className={cn("whitespace-nowrap h-fit", statusColors[ticket.status])}>{ticket.status}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-foreground/90 whitespace-pre-wrap">{ticket.description}</p>
                        {ticket.attachments && ticket.attachments.length > 0 && (
                            <div className="mt-4">
                                <h3 className="font-semibold text-sm mb-2">Attachments</h3>
                                <div className="flex gap-2">
                                    {ticket.attachments.map((file, index) => (
                                        <Button key={index} variant="outline" size="sm">
                                            <Paperclip className="w-4 h-4 mr-2" />
                                            {file}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Conversation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TicketComments comments={ticket.comments} />
                        <Separator className="my-6" />
                        <div className="space-y-4">
                            <Textarea 
                                placeholder="Add a comment..." 
                                className="min-h-[120px]"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <div className="flex justify-between items-center">
                                <Button variant="outline" onClick={handleGenerateResponse} disabled={isGenerating}>
                                     {isGenerating ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Wand2 className="mr-2 h-4 w-4" />
                                    )}
                                    Generate Response
                                </Button>
                                <Button>
                                    <Send className="mr-2 h-4 w-4" />
                                    Post Comment
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Ticket Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                         <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Status</span>
                            <Select defaultValue={ticket.status}>
                                <SelectTrigger className="w-[180px] h-8">
                                    <SelectValue/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Open">Open</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Resolved">Resolved</SelectItem>
                                    <SelectItem value="Closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Assignee</span>
                             <Select defaultValue={ticket.agent?.id}>
                                <SelectTrigger className="w-[180px] h-8">
                                    <SelectValue placeholder="Unassigned"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="unassigned">Unassigned</SelectItem>
                                    {agents.map(agent => (
                                        <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator/>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Requester</span>
                             <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src={ticket.user.avatar} data-ai-hint="person" />
                                    <AvatarFallback>{ticket.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{ticket.user.name}</span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Created</span>
                            <span>{format(new Date(ticket.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Updated</span>
                            <span>{format(new Date(ticket.updatedAt), 'MMM d, yyyy')}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
