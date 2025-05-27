import React, { useState, useEffect } from 'react';
import { DocumentDetail } from '../types/documentDetail';
import { mockDocumentDetails } from '../mock/documentDetails';
import axios from 'axios';

const DocumentDetailTable = () => {
  const [details, setDetails] = useState<DocumentDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchDetails = async () => {
      try {
        // const response = await axios.get('/api/document-details');
        // setDetails(response.data);
        setDetails(mockDocumentDetails);
      } catch (error) {
        console.error('Error fetching document details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
            <th className="px-6 py-3 border-b text-left">Account Code</th>
            <th className="px-6 py-3 border-b text-left">Description</th>
            <th className="px-6 py-3 border-b text-right">Amount</th>
            <th className="px-6 py-3 border-b text-left">Transaction Type</th>
          </tr>
        </thead>
        <tbody>
          {details.map((detail) => (
            <tr key={detail.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 border-b">{detail.accountCode}</td>
              <td className="px-6 py-4 border-b">{detail.description}</td>
              <td className="px-6 py-4 border-b text-right">{formatCurrency(detail.amount)}</td>
              <td className="px-6 py-4 border-b">{detail.transactionType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentDetailTable; 