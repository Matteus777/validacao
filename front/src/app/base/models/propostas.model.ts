import { Client } from './clients.model';

export interface Propostas {
  id?: number;
  description: string;

  status: string;

  cliente?: Client;
}
