/**
 * Production SEO and Meta Tags Service
 * Manages dynamic meta tags, OpenGraph, and Twitter Cards
 */

interface MetaData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  siteName?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  keywords?: string[];
}

class SEOService {
  private defaultMeta: Required<MetaData> = {
    title: 'ZoraX - The Future of Web3 Creator Economy',
    description: 'Launch NFT campaigns, build onchain reputation, and connect with supporters on the most elegant Web3 creator platform.',
    image: 'https://zorax.app/og-image.jpg',
    url: 'https://zorax.app',
    type: 'website',
    siteName: 'ZoraX',
    twitterCard: 'summary_large_image',
    keywords: ['NFT', 'Web3', 'Creator Economy', 'Blockchain', 'Zora', 'Optimism']
  };

  /**
   * Update page meta tags
   */
  updateMeta(meta: MetaData) {
    const finalMeta = { ...this.defaultMeta, ...meta };

    // Update title
    document.title = finalMeta.title;

    // Update or create meta tags
    this.updateMetaTag('description', finalMeta.description);
    this.updateMetaTag('keywords', finalMeta.keywords.join(', '));

    // OpenGraph tags
    this.updateMetaTag('og:title', finalMeta.title, 'property');
    this.updateMetaTag('og:description', finalMeta.description, 'property');
    this.updateMetaTag('og:image', finalMeta.image, 'property');
    this.updateMetaTag('og:url', finalMeta.url, 'property');
    this.updateMetaTag('og:type', finalMeta.type, 'property');
    this.updateMetaTag('og:site_name', finalMeta.siteName, 'property');

    // Twitter Card tags
    this.updateMetaTag('twitter:card', finalMeta.twitterCard, 'name');
    this.updateMetaTag('twitter:title', finalMeta.title, 'name');
    this.updateMetaTag('twitter:description', finalMeta.description, 'name');
    this.updateMetaTag('twitter:image', finalMeta.image, 'name');
    this.updateMetaTag('twitter:site', '@ZoraXApp', 'name');
    this.updateMetaTag('twitter:creator', '@ZoraXApp', 'name');

    // Additional SEO tags
    this.updateMetaTag('robots', 'index, follow');
    this.updateMetaTag('author', 'ZoraX Team');
    this.updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Canonical URL
    this.updateLinkTag('canonical', finalMeta.url);
  }

  /**
   * Set meta for campaign page
   */
  setCampaignMeta(campaign: {
    title: string;
    description: string;
    image?: string;
    creator: string;
    price: string;
    id: string | number;
  }) {
    this.updateMeta({
      title: `${campaign.title} by ${campaign.creator} | ZoraX`,
      description: `${campaign.description} Support this NFT campaign starting at ${campaign.price} on ZoraX.`,
      image: campaign.image || this.defaultMeta.image,
      url: `${this.defaultMeta.url}/campaign/${campaign.id}`,
      type: 'product',
      keywords: ['NFT Campaign', campaign.creator, 'Web3', 'Support Creator', 'Digital Art']
    });
  }

  /**
   * Set meta for profile page
   */
  setProfileMeta(profile: {
    displayName: string;
    bio?: string;
    avatar?: string;
    address: string;
    campaignCount?: number;
  }) {
    this.updateMeta({
      title: `${profile.displayName} | Creator Profile | ZoraX`,
      description: profile.bio || `Explore ${profile.displayName}'s creator profile and NFT campaigns on ZoraX. ${profile.campaignCount || 0} campaigns launched.`,
      image: profile.avatar || this.defaultMeta.image,
      url: `${this.defaultMeta.url}/profile/${profile.address}`,
      type: 'website',
      keywords: ['Creator Profile', profile.displayName, 'NFT Artist', 'Web3 Creator']
    });
  }

  /**
   * Generate structured data for SEO
   */
  addStructuredData(data: any) {
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /**
   * Add campaign structured data
   */
  addCampaignStructuredData(campaign: {
    title: string;
    description: string;
    image?: string;
    creator: string;
    price: string;
    currency: string;
    id: string | number;
  }) {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": campaign.title,
      "description": campaign.description,
      "image": campaign.image,
      "brand": {
        "@type": "Brand",
        "name": "ZoraX"
      },
      "creator": {
        "@type": "Person",
        "name": campaign.creator
      },
      "offers": {
        "@type": "Offer",
        "price": campaign.price,
        "priceCurrency": campaign.currency,
        "availability": "https://schema.org/InStock",
        "url": `${this.defaultMeta.url}/campaign/${campaign.id}`
      },
      "category": "Digital Art",
      "additionalType": "NFT"
    };

    this.addStructuredData(structuredData);
  }

  private updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
    let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }
    
    tag.content = content;
  }

  private updateLinkTag(rel: string, href: string) {
    let tag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
    
    if (!tag) {
      tag = document.createElement('link');
      tag.rel = rel;
      document.head.appendChild(tag);
    }
    
    tag.href = href;
  }
}

export const seoService = new SEOService();
