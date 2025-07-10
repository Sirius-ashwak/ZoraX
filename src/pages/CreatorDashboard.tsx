import React, { useEffect, useState } from 'react';
import { MintTrendsChart } from '../components/MintTrendsChart';
import { Card } from '../components/Card';

// Placeholder for fetching mint trend data and activity
async function fetchMintTrends(address: string) {
  // Replace with your API/service call
  return [
    { date: '2024-06-01', mints: 5 },
    { date: '2024-06-02', mints: 8 },
    { date: '2024-06-03', mints: 3 },
    { date: '2024-06-04', mints: 10 },
    { date: '2024-06-05', mints: 7 },
  ];
}
async function fetchActivity(address: string) {
  // Replace with your API/service call
  return [
    { id: 'a1', type: 'mint', detail: 'User 0x123...abc minted Supporter Pass #1', date: '2024-06-05' },
    { id: 'a2', type: 'comment', detail: 'User 0x456...def commented: "Great campaign!"', date: '2024-06-04' },
    { id: 'a3', type: 'remix', detail: 'Your campaign was remixed by 0x789...ghi', date: '2024-06-03' },
  ];
}

export const CreatorDashboard: React.FC = () => {
  const address = '0xYourAddress'; // Replace with useUser() or props
  const [mintTrends, setMintTrends] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchMintTrends(address),
      fetchActivity(address),
    ]).then(([trends, act]) => {
      setMintTrends(trends);
      setActivity(act);
    }).finally(() => setLoading(false));
  }, [address]);

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Creator Dashboard</h2>
      <MintTrendsChart data={mintTrends} />
      <Card className="mb-8">
        <h3 className="font-bold mb-2 text-accent">Recent Activity</h3>
        <ul>
          {activity.map((a: any) => (
            <li key={a.id} className="mb-2 flex items-center">
              <span className="text-xs text-gray-400 mr-2">{a.date}</span>
              <span>{a.detail}</span>
            </li>
          ))}
        </ul>
      </Card>
      {/* ...other dashboard widgets... */}
    </div>
  );
}; 