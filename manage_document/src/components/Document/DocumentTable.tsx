import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Document } from '../../types/document';
import axios from 'axios';
import CreateDocumentForm from './CreateDocumentForm';
import EditDocumentForm from './EditDocumentForm';
import ConfirmModal from '../ConfirmModal';
import { API_ENDPOINTS } from '../../config/api';

const DocumentTable = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  const fetchDocuments = async () => {
    try {
      const url = debouncedSearchText
        ? `${API_ENDPOINTS.DOCUMENTS}?SearchText=${encodeURIComponent(debouncedSearchText)}`
        : API_ENDPOINTS.DOCUMENTS;
      const response = await axios.get(url);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  useEffect(() => {
    fetchDocuments();
  }, [debouncedSearchText]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return dateString.split('T')[0];
  };

  const handleDetailClick = (documentNumber: string) => {
    navigate(`/documents/${documentNumber}`);
  };

  const handleEditClick = (document: Document) => {
    setEditingDocument(document);
  };

  const handleEditCancel = () => {
    setEditingDocument(null);
  };

  const handleDocumentUpdated = () => {
    setEditingDocument(null);
    fetchDocuments();
  };

  const handleDeleteClick = (documentNumber: string) => {
    setDocumentToDelete(documentNumber);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (documentToDelete) {
      try {
        await axios.delete(`${API_ENDPOINTS.DOCUMENTS}/${documentToDelete}`);
        fetchDocuments();
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
    setDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Documents</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search documents..."
              value={searchText}
              onChange={handleSearchChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <CreateDocumentForm onDocumentCreated={fetchDocuments} />
      {editingDocument && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Document</h2>
          </div>
          <EditDocumentForm
            document={editingDocument}
            onDocumentUpdated={handleDocumentUpdated}
            onCancel={handleEditCancel}
          />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Document Number</th>
              <th className="px-6 py-3 border-b text-left">Document Date</th>
              <th className="px-6 py-3 border-b text-left">Document Type</th>
              <th className="px-6 py-3 border-b text-left">Description</th>
              <th className="px-6 py-3 border-b text-right">Total Amount</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.documentNumber} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{doc.documentNumber}</td>
                <td className="px-6 py-4 border-b">{formatDate(doc.documentDate)}</td>
                <td className="px-6 py-4 border-b">{doc.documentType}</td>
                <td className="px-6 py-4 border-b">{doc.description}</td>
                <td className="px-6 py-4 border-b text-right">{formatCurrency(doc.totalAmount || 0)}</td>
                <td className="px-6 py-4 border-b text-center space-x-2">
                  <button
                    onClick={() => handleDetailClick(doc.documentNumber)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleEditClick(doc)}
                    className={`${
                      editingDocument?.documentNumber === doc.documentNumber
                        ? 'bg-gray-500'
                        : 'bg-yellow-500 hover:bg-yellow-600'
                    } text-white px-4 py-2 rounded-md transition-colors`}
                  >
                    {editingDocument?.documentNumber === doc.documentNumber ? 'Editing...' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDeleteClick(doc.documentNumber)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Document"
        message="Are you sure you want to delete this document? All document details will be deleted."
      />
    </div>
  );
};

export default DocumentTable; 