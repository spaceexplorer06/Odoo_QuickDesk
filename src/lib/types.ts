export type User = {
  id: string;
  name: string;
  avatar: string; // URL to avatar image
  role: 'user' | 'agent';
};

export type Comment = {
  id: string;
  author: User;
  content: string;
  createdAt: string;
};

export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketCategory =
  | 'Technical Support'
  | 'Billing Inquiry'
  | 'Account Management'
  | 'Feature Request'
  | 'Bug Report'
  | 'Other';

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  category: TicketCategory;
  user: User;
  agent?: User;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  attachments?: string[];
};
