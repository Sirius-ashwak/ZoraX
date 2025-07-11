import React, { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

// Placeholder for fetching campaigns
async function fetchCampaigns() {
  // Replace with your API/service call
  return [
    { id: '1', title: 'Creator A', description: 'Support my new album!', image: 'https://placehold.co/400x200', trending: true, new: true, endingSoon: false, featured: true },
    { id: '2', title: 'Creator B', description: 'Mint a supporter pass for my art drop.', image: 'https://placehold.co/400x200', trending: false, new: true, endingSoon: true, featured: false },
    { id: '3', title: 'Creator C', description: 'Join my onchain community.', image: 'https://placehold.co/400x200', trending: true, new: false, endingSoon: false, featured: true },
  ];
}

const filters = [
  { key: 'trending', label: 'Trending' },
  { key: 'new', label: 'New' },
  { key: 'endingSoon', label: 'Ending Soon' },
];

export const Discover: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCampaigns()
      .then(setCampaigns)
      .finally(() => setLoading(false));
  }, []);

  const filtered = campaigns.filter((c) => {
    if (activeFilter && !c[activeFilter]) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const featured = campaigns.filter((c) => c.featured);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Discover Campaigns</h1>
      {/* Featured Carousel */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Featured Creators</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {featured.map((c) => (
            <Card key={c.id} className="min-w-[300px] flex-shrink-0">
              <img src={c.image} alt={c.title} className="rounded-lg mb-2 w-full h-32 object-cover" />
              <div className="font-bold mb-1">{c.title}</div>
              <div className="text-gray-400 mb-2">{c.description}</div>
              <Button variant="primary" className="w-full">View Campaign</Button>
            </Card>
          ))}
        </div>
      </div>
      {/* Filters & Search */}
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        {filters.map((f) => (
          <Button key={f.key} variant={activeFilter === f.key ? 'primary' : 'outline'} onClick={() => setActiveFilter(f.key === activeFilter ? '' : f.key)}>{f.label}</Button>
        ))}
        <input
          type="text"
          placeholder="Search by name, creator, or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto px-3 py-2 rounded border border-accent bg-bg-primary text-text-primary min-w-[200px]"
        />
      </div>
      {/* Campaign Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center">Loading campaigns...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center">No campaigns found.</div>
        ) : filtered.map((c) => (
          <Card key={c.id} className="flex flex-col items-center">
            <img src={c.image} alt={c.title} className="rounded-lg mb-2 w-full h-32 object-cover" />
            <div className="font-bold mb-1">{c.title}</div>
            <div className="text-gray-400 mb-2">{c.description}</div>
            <Button variant="primary" className="w-full">View Campaign</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}; 