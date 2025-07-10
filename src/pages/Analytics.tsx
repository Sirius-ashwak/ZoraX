import React, { useEffect, useState } from 'react';
import { MintTrendsChart } from '../components/MintTrendsChart';
import { Card } from '../components/Card';

// Placeholder for fetching analytics data
async function fetchMintTrends() {
  return [
    { date: '2024-06-01', mints: 5 },
    { date: '2024-06-02', mints: 8 },
    { date: '2024-06-03', mints: 3 },
    { date: '2024-06-04', mints: 10 },
    { date: '2024-06-05', mints: 7 },
  ];
}
async function fetchLeaderboard() {
  return [
    { address: '0x123...abc', mints: 12 },
    { address: '0x456...def', mints: 9 },
    { address: '0x789...ghi', mints: 7 },
  ];
}

export const Analytics: React.FC = () => {
  const [mintTrends, setMintTrends] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchMintTrends(),
      fetchLeaderboard(),
    ]).then(([trends, lb]) => {
      setMintTrends(trends);
      setLeaderboard(lb);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading analytics...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Analytics & Insights</h2>
      <MintTrendsChart data={mintTrends} />
      <Card className="mb-8">
        <h3 className="font-bold mb-2 text-accent">Supporter Leaderboard</h3>
        <ol className="list-decimal pl-6">
          {leaderboard.map((s: any, i: number) => (
            <li key={s.address} className="mb-1">
              <span className="font-mono">{s.address}</span> — <span className="font-bold text-accent">{s.mints} mints</span>
            </li>
          ))}
        </ol>
      </Card>
      <Card>
        <h3 className="font-bold mb-2 text-accent">Mint Activity Heatmap</h3>
        <div className="bg-bg-primary rounded-lg h-32 flex items-center justify-center text-gray-500">[Heatmap Placeholder]</div>
      </Card>
    </div>
  );
}; 