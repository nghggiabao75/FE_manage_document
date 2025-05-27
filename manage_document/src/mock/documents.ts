import { Document } from '../types/document';

export const mockDocuments: Document[] = [
  {
    id: '1',
    documentNumber: 'DOC001',
    documentDate: '2024-03-20',
    documentType: 'Receipt',
    description: 'Received payment from customer A',
    totalAmount: 5000
  },
  {
    id: '2',
    documentNumber: 'DOC002',
    documentDate: '2024-03-21',
    documentType: 'Payment',
    description: 'Paid for goods',
    totalAmount: 3000
  },
  {
    id: '3',
    documentNumber: 'DOC003',
    documentDate: '2024-03-22',
    documentType: 'Invoice',
    description: 'Sold goods to customer B',
    totalAmount: 8000
  }
]; 