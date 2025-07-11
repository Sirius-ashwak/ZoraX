import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

// Placeholder for fetching supporter NFTs and perks
async function fetchSupporterData(address: string) {
  // Replace with your API/service call
  return {
    nfts: [
      { id: '1', name: 'Supporter Pass #1', image: 'https://placehold.co/200x200', perks: ['Early Access', 'Exclusive Content'] },
      { id: '2', name: 'Supporter Pass #2', image: 'https://placehold.co/200x200', perks: ['VIP Chat'] },
    ],
    updates: [
      { id: 'u1', title: 'Campaign Launch', date: '2024-06-01', content: 'The campaign is live!' },
    ],
    comments: [
      { id: 'c1', user: '0x123...abc', text: 'Excited to support!' },
    ],
  };
}

export const SupporterDashboard: React.FC = () => {
  const { address } = useUser();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (!address) return;
    setLoading(true);
    fetchSupporterData(address)
      .then((d) => {
        setData(d);
        setComments(d.comments);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [address]);

  const handleComment = () => {
    if (!comment.trim()) return;
    setComments((prev) => [
      ...prev,
      { id: `c${prev.length + 1}`, user: address, text: comment }
    ]);
    setComment('');
  };

  if (!address) return <div className="p-8 text-center">Please connect your wallet.</div>;
  if (loading) return <div className="p-8 text-center">Loading supporter dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!data) return <div className="p-8 text-center">No supporter data found.</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Your Supporter Dashboard</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">NFTs Minted</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.nfts.map((nft: any) => (
            <Card key={nft.id} className="flex flex-col items-center">
              <img src={nft.image} alt={nft.name} className="rounded-lg mb-2 w-32 h-32 object-cover" />
              <div className="font-bold mb-1">{nft.name}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {nft.perks.map((perk: string, i: number) => (
                  <span key={i} className="bg-accent text-white px-2 py-1 rounded-full text-xs font-semibold">{perk}</span>
                ))}
              </div>
              <Button variant="primary" className="w-full">Mint More</Button>
            </Card>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Campaign Updates</h3>
        <ul className="border-l-2 border-accent pl-4">
          {data.updates.map((update: any) => (
            <li key={update.id} className="mb-4 relative">
              <div className="absolute -left-4 top-1 w-3 h-3 bg-accent rounded-full"></div>
              <div className="font-bold text-accent">{update.title}</div>
              <div className="text-xs text-gray-400 mb-1">{update.date}</div>
              <div>{update.content}</div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Comments & Feedback</h3>
        <ul>
          {comments.map((comment: any) => (
            <li key={comment.id} className="mb-2 p-2 bg-bg-secondary rounded-lg">
              <span className="font-mono text-xs text-gray-400">{comment.user}:</span> {comment.text}
            </li>
          ))}
        </ul>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 px-3 py-2 rounded border border-accent bg-bg-primary text-text-primary"
          />
          <Button variant="primary" onClick={handleComment}>Send</Button>
        </div>
      </div>
    </div>
  );
}; 