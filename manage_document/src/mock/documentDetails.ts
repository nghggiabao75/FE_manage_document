import { DocumentDetail } from '../types/documentDetail';

export const mockDocumentDetails: DocumentDetail[] = [
  {
    id: '1',
    accountCode: '1111',
    description: 'Cash received from customer',
    amount: 2000,
    transactionType: 'Credit',
  },
  {
    id: '2',
    accountCode: '2222',
    description: 'Payment for office supplies',
    amount: 500,
    transactionType: 'Debit',
  },
  {
    id: '3',
    accountCode: '3333',
    description: 'Service income',
    amount: 1500,
    transactionType: 'Credit',
  },
]; 