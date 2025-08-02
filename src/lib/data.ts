import type { User, Ticket } from './types';

// This will be the initial user, you can expand this to a full user management system
export const users: User[] = [
    {
        id: 'usr_1',
        name: 'John Doe',
        avatar: 'https://placehold.co/100x100.png',
        role: 'agent',
    }
];

export const tickets: Ticket[] = [];
