import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { getTotalSupply } from '../services/zoraContractService';

// Placeholder for campaign fetching logic
async function fetchCampaign(campaignId: string) {
  // Replace with real API/service call
  return {
    id: campaignId,
    title: 'Sample Campaign',
    description: 'This is a sample campaign for Farcaster Frame.',
    image: 'https://placehold.co/600x400',
    creator: '0x123...abc',
  };
}

export const Frame: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [campaign, setCampaign] = useState<any>(null);
  const [supply, setSupply] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!campaignId) return;
    setLoading(true);
    fetchCampaign(campaignId)
      .then(setCampaign)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    getTotalSupply().then((s) => setSupply(Number(s)));
  }, [campaignId]);

  const handleMint = async () => {
    setMinting(true);
    // TODO: Integrate with mintEdition and Farcaster flow
    setTimeout(() => setMinting(false), 1500);
  };

  if (loading) return <div className="p-8 text-center">Loading frame...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!campaign) return <div className="p-8 text-center">Campaign not found.</div>;

  // OpenGraph meta tags (for SSR or meta injection)
  // <meta property="og:title" content={campaign.title} />
  // <meta property="og:description" content={campaign.description} />
  // <meta property="og:image" content={campaign.image} />

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <Card className="max-w-lg w-full text-center">
        <img src={campaign.image} alt={campaign.title} className="rounded-lg mb-4 w-full h-48 object-cover" />
        <h1 className="text-2xl font-bold mb-2">{campaign.title}</h1>
        <p className="text-gray-400 mb-4">{campaign.description}</p>
        <div className="mb-4 text-accent font-semibold">Supporters: {supply !== null ? supply : '...'}</div>
        <Button variant="primary" loading={minting} onClick={handleMint} className="w-full mb-2">Mint Supporter Pass</Button>
        <Button variant="outline" className="w-full" onClick={() => window.open(`https://warpcast.com/~/compose?text=Check%20out%20this%20campaign%20on%20Zorax!%20${window.location.href}`, '_blank')}>Share on Farcaster</Button>
      </Card>
    </div>
  );
}; 