import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import SerialNumberTable from '../../components/admin/SerialNumberTable';
import SerialNumberForm from '../../components/admin/SerialNumberForm';
import { getSerialNumbers, deleteSerialNumber, generateSerialNumbers, updateSerialNumber } from '../../services/adminService';
import { SerialNumberType } from '../../types';
import Modal from '../../components/shared/Modal';

const SerialNumbersPage = () => {
  const [serialNumbers, setSerialNumbers] = useState<SerialNumberType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSerialNumber, setEditingSerialNumber] = useState<SerialNumberType | null>(null);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [generateCount, setGenerateCount] = useState(10);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSerialNumbers();
  }, []);

  const fetchSerialNumbers = async () => {
    setIsLoading(true);
    try {
      const data = await getSerialNumbers();
      setSerialNumbers(data);
      setError('');
    } catch (err) {
      setError('Failed to load serial numbers');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    const serialNumber = serialNumbers.find(s => s.id === id);
    if (serialNumber) {
      setEditingSerialNumber(serialNumber);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this serial number?')) {
      try {
        await deleteSerialNumber(id);
        setSerialNumbers(serialNumbers.filter(s => s.id !== id));
      } catch (err) {
        setError('Failed to delete serial number');
        console.error(err);
      }
    }
  };

  const handleUpdateSerialNumber = async (data: Partial<SerialNumberType>) => {
    if (!editingSerialNumber) return;
    
    try {
      const updatedSerialNumber = await updateSerialNumber(editingSerialNumber.id, data);
      setSerialNumbers(serialNumbers.map(s => 
        s.id === editingSerialNumber.id ? updatedSerialNumber : s
      ));
      setIsModalOpen(false);
      setEditingSerialNumber(null);
    } catch (err) {
      setError('Failed to update serial number');
      console.error(err);
    }
  };

  const handleGenerateSerialNumbers = async () => {
    try {
      const newSerialNumbers = await generateSerialNumbers(generateCount);
      setSerialNumbers([...serialNumbers, ...newSerialNumbers]);
      setIsGenerateModalOpen(false);
      setGenerateCount(10);
    } catch (err) {
      setError('Failed to generate serial numbers');
      console.error(err);
    }
  };

  return (
    <AdminLayout title="Serial Numbers">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-gray-600">
            Manage all serial numbers in the system
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsGenerateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle size={16} className="mr-2" />
            Generate Serial Numbers
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <SerialNumberTable
          serialNumbers={serialNumbers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Edit Serial Number Modal */}
      <Modal
        isOpen={isModalOpen}
        title={editingSerialNumber ? "Edit Serial Number" : "Add Serial Number"}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSerialNumber(null);
        }}
      >
        <SerialNumberForm
          serialNumber={editingSerialNumber}
          onSubmit={handleUpdateSerialNumber}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingSerialNumber(null);
          }}
        />
      </Modal>

      {/* Generate Serial Numbers Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        title="Generate Serial Numbers"
        onClose={() => setIsGenerateModalOpen(false)}
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="count" className="block text-sm font-medium text-gray-700">
              Number of Serial Numbers to Generate
            </label>
            <input
              type="number"
              id="count"
              min="1"
              max="100"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={generateCount}
              onChange={(e) => setGenerateCount(parseInt(e.target.value) || 10)}
            />
            <p className="mt-2 text-sm text-gray-500">
              You can generate up to 100 serial numbers at once.
            </p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsGenerateModalOpen(false)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleGenerateSerialNumbers}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Generate
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
};

export default SerialNumbersPage;