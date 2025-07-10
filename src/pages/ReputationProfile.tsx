import React, { useEffect, useState } from 'react';
import { fetchCreatorReputation } from '../services/reputationService';
import { useUser } from '../context/UserContext';

export const ReputationProfile: React.FC = () => {
  const { address, ensName } = useUser();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    fetchCreatorReputation(address)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [address]);

  if (!address) return <div className="p-8 text-center">Please connect your wallet.</div>;
  if (loading) return <div className="p-8 text-center">Loading reputation...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!data) return <div className="p-8 text-center">No reputation data found.</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="bg-bg-secondary rounded-xl shadow-cosmic p-6">
        <h2 className="text-2xl font-bold mb-4">Reputation Profile</h2>
        <div className="mb-2">Address/ENS: <span className="font-mono">{ensName || address}</span></div>
        <div className="mb-2">Total Mints: <span className="font-mono">{data.totalMints}</span></div>
        <div className="mb-2">Earnings: <span className="font-mono">{data.earnings} ETH</span></div>
        <div className="mb-2">Remix History: <span className="font-mono">{data.remixCount}</span></div>
        <div className="mb-2">Badges: {data.badges?.map((badge: string) => (
          <span key={badge} className="inline-block bg-accent text-white px-2 py-1 rounded-full text-xs font-semibold mr-2">{badge}</span>
        ))}</div>
        {/* Placeholder for charts/analytics */}
        <div className="mt-6">
          <div className="text-accent font-semibold mb-2">Mint Trends (Coming Soon)</div>
          <div className="bg-bg-primary rounded-lg h-32 flex items-center justify-center text-gray-500">[Chart Placeholder]</div>
        </div>
      </div>
    </div>
  );
}; 