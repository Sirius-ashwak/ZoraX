export async function fetchCreatorReputation(address: string) {
  // Replace with your actual API endpoint
  const res = await fetch(`https://api.zora.co/creator/${address}/reputation`);
  if (!res.ok) throw new Error('Failed to fetch reputation');
  return await res.json();
} 