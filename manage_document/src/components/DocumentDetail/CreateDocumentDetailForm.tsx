import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

interface CreateDocumentDetailFormProps {
  documentNumber: string;
  onDocumentDetailCreated: () => void;
}

const CreateDocumentDetailForm: React.FC<CreateDocumentDetailFormProps> = ({
  documentNumber,
  onDocumentDetailCreated
}) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    transactionType: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        documentNumber: parseInt(documentNumber),
        description: formData.description,
        amount: parseFloat(formData.amount),
        transactionType: formData.transactionType
      };
      await axios.post(API_ENDPOINTS.DOCUMENT_DETAILS, data);
      onDocumentDetailCreated();
      setFormData({
        description: '',
        amount: '',
        transactionType: ''
      });
    } catch (error) {
      console.error('Error creating document detail:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Document Detail</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter description"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Type
          </label>
          <input
            type="text"
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter transaction type"
            required
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Document Detail
        </button>
      </div>
    </form>
  );
};

export default CreateDocumentDetailForm; 