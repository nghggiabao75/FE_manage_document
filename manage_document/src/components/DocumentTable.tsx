import React, { useState, useEffect } from 'react';
import { Document } from '../types/document';
import { mockDocuments } from '../mock/documents';
import axios from 'axios';

const DocumentTable = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchDocuments = async () => {
      try {
        // In the future, replace this with actual API call
        // const response = await axios.get('/api/documents');
        // setDocuments(response.data);
        
        // Using mock data for now
        setDocuments(mockDocuments);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 border-b text-left">Document Number</th>
            <th className="px-6 py-3 border-b text-left">Document Date</th>
            <th className="px-6 py-3 border-b text-left">Document Type</th>
            <th className="px-6 py-3 border-b text-left">Description</th>
            <th className="px-6 py-3 border-b text-right">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b">{doc.documentNumber}</td>
              <td className="px-6 py-4 border-b">{doc.documentDate}</td>
              <td className="px-6 py-4 border-b">{doc.documentType}</td>
              <td className="px-6 py-4 border-b">{doc.description}</td>
              <td className="px-6 py-4 border-b text-right">{formatCurrency(doc.totalAmount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable; 