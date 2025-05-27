import React, { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

interface CreateDocumentFormProps {
  onDocumentCreated: () => void;
}

const CreateDocumentForm: React.FC<CreateDocumentFormProps> = ({ onDocumentCreated }) => {
  const [formData, setFormData] = useState({
    documentNumber: '',
    documentDate: new Date().toISOString().split('T')[0],
    description: '',
    totalAmount: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        documentNumber: parseInt(formData.documentNumber),
        documentDate: formData.documentDate,
        description: formData.description,
        totalAmount: parseFloat(formData.totalAmount)
      };
      await axios.post(API_ENDPOINTS.DOCUMENTS, data);
      onDocumentCreated();
      setFormData({
        documentNumber: '',
        documentDate: new Date().toISOString().split('T')[0],
        description: '',
        totalAmount: ''
      });
    } catch (error) {
      console.error('Error creating document:', error);
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
      <h2 className="text-xl font-semibold mb-4">Create New Document</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document Number
          </label>
          <input
            type="number"
            name="documentNumber"
            value={formData.documentNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter document number"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Document Date
          </label>
          <input
            type="date"
            name="documentDate"
            value={formData.documentDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
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
            Total Amount
          </label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter total amount"
            step="0.01"
            required
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Create Document
        </button>
      </div>
    </form>
  );
};

export default CreateDocumentForm; 