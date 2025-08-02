'use client';

import type { Comment } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

export default function TicketComments({ comments }: { comments: Comment[] }) {
    if (comments.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-4">No comments yet.</p>;
    }
    
    return (
        <div className="space-y-6">
            {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                    <Avatar>
                        <AvatarImage src={comment.author.avatar} data-ai-hint="person" />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex justify-between items-baseline">
                            <p className="font-semibold">{comment.author.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                            </p>
                        </div>
                        <div className="mt-1 p-3 rounded-lg bg-secondary/50">
                            <p className="text-sm text-foreground/90 whitespace-pre-wrap">{comment.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
