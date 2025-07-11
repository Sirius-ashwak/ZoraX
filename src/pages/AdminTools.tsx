import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

// Placeholder for campaigns and tickets
const initialCampaigns = [
  { id: '1', title: 'Creator A', flagged: false, verified: false },
  { id: '2', title: 'Creator B', flagged: false, verified: true },
  { id: '3', title: 'Creator C', flagged: true, verified: false },
];
const initialTickets = [
  { id: 't1', subject: 'Appeal: Campaign flagged', status: 'open', creator: '0x123...abc' },
  { id: 't2', subject: 'Support: Mint failed', status: 'closed', creator: '0x456...def' },
];

export const AdminTools: React.FC = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [tickets, setTickets] = useState(initialTickets);

  const toggleFlag = (id: string) => {
    setCampaigns((prev) => prev.map((c) => c.id === id ? { ...c, flagged: !c.flagged } : c));
  };
  const toggleVerify = (id: string) => {
    setCampaigns((prev) => prev.map((c) => c.id === id ? { ...c, verified: !c.verified } : c));
  };
  const closeTicket = (id: string) => {
    setTickets((prev) => prev.map((t) => t.id === id ? { ...t, status: 'closed' } : t));
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Admin Tools</h2>
      <Card className="mb-8">
        <h3 className="font-bold mb-2 text-accent">Campaign Moderation</h3>
        <table className="w-full text-left mb-4">
          <thead>
            <tr>
              <th className="py-2">Title</th>
              <th className="py-2">Flagged</th>
              <th className="py-2">Verified</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-t border-gray-700">
                <td className="py-2">{c.title}</td>
                <td className="py-2">{c.flagged ? <span className="text-red-500 font-bold">Yes</span> : 'No'}</td>
                <td className="py-2">{c.verified ? <span className="text-green-500 font-bold">Yes</span> : 'No'}</td>
                <td className="py-2 flex gap-2">
                  <Button variant={c.flagged ? 'outline' : 'primary'} onClick={() => toggleFlag(c.id)}>{c.flagged ? 'Unflag' : 'Flag'}</Button>
                  <Button variant={c.verified ? 'outline' : 'primary'} onClick={() => toggleVerify(c.id)}>{c.verified ? 'Unverify' : 'Verify'}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Card>
        <h3 className="font-bold mb-2 text-accent">Support Tickets & Appeals</h3>
        <ul>
          {tickets.map((t) => (
            <li key={t.id} className="mb-3 p-3 bg-bg-primary rounded-lg flex justify-between items-center">
              <div>
                <div className="font-bold">{t.subject}</div>
                <div className="text-xs text-gray-400">{t.creator} — Status: <span className={t.status === 'open' ? 'text-yellow-500' : 'text-green-500'}>{t.status}</span></div>
              </div>
              {t.status === 'open' && <Button variant="primary" onClick={() => closeTicket(t.id)}>Close</Button>}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}; 