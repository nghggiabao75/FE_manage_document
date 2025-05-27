import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DocumentDetail } from '../../types/documentDetail';
import axios from 'axios';
import CreateDocumentDetailForm from './CreateDocumentDetailForm';
import EditDocumentDetailForm from './EditDocumentDetailForm';
import ConfirmModal from '../ConfirmModal';
import { API_ENDPOINTS } from '../../config/api';

const DocumentDetailTable = () => {
  const { documentNumber } = useParams<{ documentNumber: string }>();
  const navigate = useNavigate();
  const [documentDetails, setDocumentDetails] = useState<DocumentDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDetail, setEditingDetail] = useState<DocumentDetail | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailToDelete, setDetailToDelete] = useState<number | null>(null);

  const fetchDocumentDetails = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.DOCUMENT_DETAILS}?documentNumber=${documentNumber}`);
      setDocumentDetails(response.data);
    } catch (error) {
      console.error('Error fetching document details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentDetails();
  }, [documentNumber]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleEditClick = (detail: DocumentDetail) => {
    setEditingDetail(detail);
  };

  const handleEditCancel = () => {
    setEditingDetail(null);
  };

  const handleDetailUpdated = () => {
    setEditingDetail(null);
    fetchDocumentDetails();
  };

  const handleDeleteClick = (accountCode: number) => {
    setDetailToDelete(accountCode);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (detailToDelete) {
      try {
        await axios.delete(`${API_ENDPOINTS.DOCUMENT_DETAILS}/${detailToDelete}`);
        fetchDocumentDetails();
      } catch (error) {
        console.error('Error deleting document detail:', error);
      }
    }
    setDeleteModalOpen(false);
    setDetailToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setDetailToDelete(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Document Details</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            Back to Documents
          </button>
        </div>
      </div>

      <CreateDocumentDetailForm
        documentNumber={documentNumber || ''}
        onDocumentDetailCreated={fetchDocumentDetails}
      />
      {editingDetail && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Document Detail</h2>
          </div>
          <EditDocumentDetailForm
            documentDetail={editingDetail}
            onDocumentDetailUpdated={handleDetailUpdated}
            onCancel={handleEditCancel}
          />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Description</th>
              <th className="px-6 py-3 border-b text-right">Amount</th>
              <th className="px-6 py-3 border-b text-left">Transaction Type</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documentDetails.map((detail) => (
              <tr key={detail.accountCode} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{detail.description}</td>
                <td className="px-6 py-4 border-b text-right">{formatCurrency(detail.amount)}</td>
                <td className="px-6 py-4 border-b">{detail.transactionType}</td>
                <td className="px-6 py-4 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEditClick(detail)}
                    className={`${
                      editingDetail?.accountCode === detail.accountCode
                        ? 'bg-gray-500'
                        : 'bg-yellow-500 hover:bg-yellow-600'
                    } text-white px-4 py-2 rounded-md transition-colors`}
                  >
                    {editingDetail?.accountCode === detail.accountCode ? 'Editing...' : 'Edit'}
                  </button>
                  <button
                    onClick={() => handleDeleteClick(detail.accountCode)}
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
        title="Delete Document Detail"
        message="Are you sure you want to delete this document detail?"
      />
    </div>
  );
};

export default DocumentDetailTable; 