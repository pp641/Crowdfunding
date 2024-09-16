import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from './Context/userContext';

interface InvestmentProps {
  projectId: string;
  fundedAmount: number;
  onInvestmentSuccess: (newFundedAmount: number) => void; 
}

const Investment: React.FC<InvestmentProps> = ({ projectId, fundedAmount, onInvestmentSuccess }) => {
  const { token } = useUser();
  const userId = localStorage.getItem('userId');
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInvestment = async () => {
    if (investmentAmount <= 0) {
      setError('Investment amount must be greater than 0');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `http://localhost:5001/investment`,
        { amount: investmentAmount , projectId : projectId , userId : userId }
      );

      const newFundedAmount = response.data.newFundedAmount;
      onInvestmentSuccess(newFundedAmount);
      setSuccess('Investment successful!');
      setInvestmentAmount(0);
    } catch (err) {
      console.error(err);
      setError('Failed to invest in the project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6 p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Invest in this Project</h3>
      <div className="mb-4">
        <label htmlFor="investmentAmount" className="block text-gray-700">Investment Amount:</label>
        <input
          type="number"
          id="investmentAmount"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(Number(e.target.value))}
          className="w-full mt-2 p-2 border rounded"
          placeholder="Enter amount to invest"
        />
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <button
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleInvestment}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Invest'}
      </button>
    </div>
  );
};

export default Investment;
