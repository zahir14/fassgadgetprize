import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import PrizeForm from '../../components/admin/PrizeForm';
import Modal from '../../components/shared/Modal';
import { getPrizes, createPrize, updatePrize, deletePrize } from '../../services/adminService';
import { PrizeType } from '../../types';

const PrizeManagementPage = () => {
  const [prizes, setPrizes] = useState<PrizeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPrize, setCurrentPrize] = useState<PrizeType | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPrizes();
  }, []);

  const fetchPrizes = async () => {
    setIsLoading(true);
    try {
      const data = await getPrizes();
      setPrizes(data);
      setError('');
    } catch (err) {
      setError('Failed to load prizes');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPrize = () => {
    setCurrentPrize(null);
    setIsModalOpen(true);
  };

  const handleEditPrize = (prize: PrizeType) => {
    setCurrentPrize(prize);
    setIsModalOpen(true);
  };

  const handleDeletePrize = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this prize?')) {
      try {
        await deletePrize(id);
        setPrizes(prizes.filter(p => p.id !== id));
      } catch (err) {
        setError('Failed to delete prize');
        console.error(err);
      }
    }
  };

  const handleSubmitPrize = async (prizeData: Omit<PrizeType, 'id'>) => {
    try {
      if (currentPrize) {
        // Update existing prize
        const updatedPrize = await updatePrize(currentPrize.id, prizeData);
        setPrizes(prizes.map(p => p.id === currentPrize.id ? updatedPrize : p));
      } else {
        // Create new prize
        const newPrize = await createPrize(prizeData);
        setPrizes([...prizes, newPrize]);
      }
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to save prize');
      console.error(err);
    }
  };

  return (
    <AdminLayout title="Prize Management">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-gray-600">
            Manage all available prizes in the system
          </p>
        </div>
        <button
          onClick={handleAddPrize}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus size={16} className="mr-2" />
          Add Prize
        </button>
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
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prize Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tier
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prizes.length > 0 ? (
                prizes.map((prize) => (
                  <tr key={prize.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{prize.name}</div>
                          <div className="text-sm text-gray-500">{prize.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        prize.tier === 'big' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : prize.tier === 'medium'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {prize.tier.charAt(0).toUpperCase() + prize.tier.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prize.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prize.remainingQuantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditPrize(prize)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeletePrize(prize.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No prizes found. Click "Add Prize" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        title={currentPrize ? "Edit Prize" : "Add Prize"}
        onClose={() => setIsModalOpen(false)}
      >
        <PrizeForm
          prize={currentPrize}
          onSubmit={handleSubmitPrize}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </AdminLayout>
  );
};

export default PrizeManagementPage;