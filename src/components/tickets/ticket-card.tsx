import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MessageSquare } from 'lucide-react';
import type { Ticket, TicketStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const statusColors: { [key in TicketStatus]: string } = {
  'Open': 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
  'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-700',
  'Resolved': 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700',
  'Closed': 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600',
};

export default function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Link href={`/tickets/${ticket.id}`} className="block">
      <Card className="hover:shadow-lg transition-shadow duration-200 h-full flex flex-col border">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-lg font-semibold leading-tight pr-4">{ticket.subject}</CardTitle>
            <Badge variant="outline" className={cn("whitespace-nowrap", statusColors[ticket.status])}>
              {ticket.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{ticket.id}</p>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">{ticket.description}</p>
          <div className="mt-4">
            <Badge variant="secondary">{ticket.category}</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            <span>{ticket.comments.length}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={ticket.user.avatar} alt={ticket.user.name} data-ai-hint="person" />
                    <AvatarFallback>{ticket.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className='hidden sm:inline'>{ticket.user.name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Created by {ticket.user.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span>{formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
