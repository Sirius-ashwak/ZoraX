import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Tag } from '../components/Tag';
import { Modal } from '../components/Modal';
import { useAccount } from 'wagmi';
import { uploadToIPFS } from '../services/ipfsService';
import { mintEdition } from '../services/zoraContractService';

const initialForm = {
  title: '',
  description: '',
  perks: '',
  media: undefined as File | undefined,
  editionType: 'open' as 'open' | 'fixed',
  supply: 0,
  price: '',
};

export const CreateCampaign: React.FC = () => {
  const { isConnected } = useUser();
  const { address } = useAccount();
  const [form, setForm] = useState(initialForm);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mintLink, setMintLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isConnected) {
    return (
      <Card className="max-w-lg mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Connect your wallet to create a campaign</h2>
        <p className="text-gray-400 mb-4">Creator features are gated to connected wallets.</p>
        <Button variant="primary" onClick={() => window.scrollTo(0, 0)}>Connect Wallet</Button>
      </Card>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'number' ? Number(value) : value }));
  };

  const handleMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setForm((f) => ({ ...f, media: file }));
    if (file) setPreviewUrl(URL.createObjectURL(file));
  };

  const handleEditionType = (type: 'open' | 'fixed') => setForm((f) => ({ ...f, editionType: type }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // 1. Upload media to IPFS
      let mediaUrl = '';
      if (form.media) {
        mediaUrl = await uploadToIPFS(form.media);
      }
      // 2. Upload metadata to IPFS
      const metadata = {
        name: form.title,
        description: form.description,
        image: mediaUrl,
        perks: form.perks,
        creator: address,
        editionType: form.editionType,
        supply: form.supply,
        price: form.price,
      };
      const metadataUrl = await uploadToIPFS(new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      // 3. Mint edition via Zora
      const tx = await mintEdition({
        metadataUrl,
        supply: form.editionType === 'fixed' ? form.supply : undefined,
        price: form.price,
      });
      setMintLink(`https://zora.co/collect/${tx.contractAddress}/${tx.tokenId}`);
      setModalOpen(true);
    } catch (err: any) {
      setError(err.message || 'Failed to create campaign.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Card>
        <h1 className="text-3xl font-bold mb-6">Create a Campaign</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} required className="w-full bg-bg-secondary border border-accent rounded px-3 py-2 text-text-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="w-full bg-bg-secondary border border-accent rounded px-3 py-2 text-text-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Media Upload</label>
            <input type="file" accept="image/*,video/*" onChange={handleMedia} className="w-full" />
            {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 rounded-lg max-h-48 mx-auto" />}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Perks (comma separated)</label>
            <input name="perks" value={form.perks} onChange={handleChange} className="w-full bg-bg-secondary border border-accent rounded px-3 py-2 text-text-primary" />
            <div className="flex flex-wrap gap-2 mt-2">
              {form.perks.split(',').filter(Boolean).map((perk, i) => <Badge key={i}>{perk.trim()}</Badge>)}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Tag className={form.editionType === 'open' ? 'bg-accent text-white' : ''} onClick={() => handleEditionType('open')}>Open Edition</Tag>
            <Tag className={form.editionType === 'fixed' ? 'bg-accent text-white' : ''} onClick={() => handleEditionType('fixed')}>Fixed Supply</Tag>
            {form.editionType === 'fixed' && (
              <input name="supply" type="number" min={1} value={form.supply} onChange={handleChange} className="ml-2 w-24 bg-bg-secondary border border-accent rounded px-2 py-1 text-text-primary" placeholder="Supply" />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price (ETH)</label>
            <input name="price" value={form.price} onChange={handleChange} required className="w-full bg-bg-secondary border border-accent rounded px-3 py-2 text-text-primary" />
          </div>
          <Button type="submit" variant="primary" loading={loading} className="w-full">Create Campaign</Button>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
      </Card>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Campaign Created!</h2>
          {mintLink && <a href={mintLink} target="_blank" rel="noopener noreferrer" className="text-accent underline">View on Zora</a>}
          <Button className="mt-4 w-full" onClick={() => setModalOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  );
}; 