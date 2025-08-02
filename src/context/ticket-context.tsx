'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Ticket } from '@/lib/types';
import { tickets as initialTickets } from '@/lib/data';

type TicketContextType = {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
  getTicketById: (id: string) => Ticket | undefined;
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  const addTicket = (ticket: Ticket) => {
    setTickets(prevTickets => [ticket, ...prevTickets]);
  };

  const getTicketById = (id: string) => {
    return tickets.find(ticket => ticket.id === id);
  }

  return (
    <TicketContext.Provider value={{ tickets, addTicket, getTicketById }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
