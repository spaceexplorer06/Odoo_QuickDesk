import type { User, Ticket } from './types';

export const users: User[] = [
  { id: 'user-1', name: 'Alice Johnson', avatar: 'https://placehold.co/100x100.png', role: 'user' },
  { id: 'user-2', name: 'Bob Williams', avatar: 'https://placehold.co/100x100.png', role: 'user' },
  { id: 'agent-1', name: 'Catherine Smith', avatar: 'https://placehold.co/100x100.png', role: 'agent' },
  { id: 'agent-2', name: 'David Brown', avatar: 'https://placehold.co/100x100.png', role: 'agent' },
];

export const tickets: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Cannot login to my account',
    description: 'I am unable to login to my account. Every time I try, it says "Invalid credentials". I have tried resetting my password but have not received a reset email. Please help, this is urgent as I need to access my files.',
    status: 'Open',
    category: 'Account Management',
    user: users[0],
    agent: users[2],
    createdAt: '2024-07-28T10:00:00Z',
    updatedAt: '2024-07-28T12:30:00Z',
    comments: [
      { id: 'comment-1', author: users[2], content: 'Hi Alice, I am looking into this issue for you. I will update you shortly.', createdAt: '2024-07-28T11:00:00Z' },
    ],
  },
  {
    id: 'TKT-002',
    subject: 'Billing question about last invoice',
    description: 'I have a question regarding my last invoice (INV-12345). There is a charge for "Service Fee" that I do not understand. Can you please provide more details on what this is for? I did not see this on previous invoices.',
    status: 'In Progress',
    category: 'Billing Inquiry',
    user: users[1],
    agent: users[3],
    createdAt: '2024-07-27T15:20:00Z',
    updatedAt: '2024-07-28T09:45:00Z',
    comments: [
        { id: 'comment-2', author: users[3], content: 'Hello Bob, thanks for reaching out. I am reviewing your invoice and will get back to you with an explanation for the service fee. Thanks for your patience.', createdAt: '2024-07-28T09:45:00Z' },
    ],
  },
  {
    id: 'TKT-003',
    subject: 'Feature Request: Dark Mode',
    description: 'The app is great, but it would be even better with a dark mode option. It would be much easier on the eyes, especially when working late at night. Please consider adding this feature in a future update.',
    status: 'Resolved',
    category: 'Feature Request',
    user: users[0],
    agent: users[2],
    createdAt: '2024-07-26T08:00:00Z',
    updatedAt: '2024-07-27T17:00:00Z',
    comments: [
        { id: 'comment-3', author: users[2], content: 'Thanks for the suggestion, Alice! Dark mode is a popular request, and it is on our roadmap. We have added your vote to it. I am marking this as resolved for now.', createdAt: '2024-07-27T17:00:00Z' },
    ],
  },
  {
    id: 'TKT-004',
    subject: 'Website is not loading on Chrome',
    description: 'The main dashboard page seems to be broken on Google Chrome (Version 125). It works fine on Firefox. The page is just a blank and the console shows a JavaScript error. I have attached a screenshot of the error.',
    status: 'Closed',
    category: 'Technical Support',
    user: users[1],
    agent: users[3],
    createdAt: '2024-07-25T11:30:00Z',
    updatedAt: '2024-07-26T14:00:00Z',
    comments: [
        { id: 'comment-4', author: users[3], content: 'Hi Bob, we have identified and fixed the issue with Chrome. Please clear your cache and try again. Let us know if the problem persists.', createdAt: '2024-07-26T14:00:00Z' },
    ],
    attachments: ['screenshot.png'],
  },
];
