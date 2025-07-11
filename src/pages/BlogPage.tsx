import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  featured: boolean;
}

export const BlogPage: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Creator Economies: Building Sustainable Relationships',
      excerpt: 'How blockchain technology is revolutionizing the way creators connect with their supporters and build sustainable income streams.',
      content: 'Full article content...',
      author: 'ZoraX Team',
      date: '2024-07-10',
      readTime: '5 min read',
      category: 'Industry',
      imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: '2',
      title: 'Introducing ZoraCred: Transparent Reputation for Web3 Creators',
      excerpt: 'Learn about our new reputation system that helps creators build trust and supporters make informed decisions.',
      content: 'Full article content...',
      author: 'Product Team',
      date: '2024-07-08',
      readTime: '3 min read',
      category: 'Product',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      featured: true
    },
    {
      id: '3',
      title: 'Best Practices for NFT Campaign Success',
      excerpt: 'Tips and strategies for creators to maximize their campaign reach and build meaningful supporter relationships.',
      content: 'Full article content...',
      author: 'Creator Success Team',
      date: '2024-07-05',
      readTime: '7 min read',
      category: 'Guide',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: '4',
      title: 'Community Spotlight: How Cosmic Creator Built Their Following',
      excerpt: 'An in-depth look at how one of our top creators grew from 0 to 10,000 supporters using ZoraX tools.',
      content: 'Full article content...',
      author: 'Community Team',
      date: '2024-07-03',
      readTime: '4 min read',
      category: 'Community',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      featured: false
    },
    {
      id: '5',
      title: 'Technical Deep Dive: How ZoraX Ensures NFT Authenticity',
      excerpt: 'Understanding the blockchain mechanisms that guarantee the authenticity and provenance of NFTs on our platform.',
      content: 'Full article content...',
      author: 'Engineering Team',
      date: '2024-07-01',
      readTime: '6 min read',
      category: 'Technical',
      imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80',
      featured: false
    }
  ];

  const categories = ['All', 'Product', 'Industry', 'Guide', 'Community', 'Technical'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ZoraX Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, updates, and stories from the future of creator economies
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Posts */}
        {selectedCategory === 'All' && featuredPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Regular Posts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {selectedCategory === 'All' ? 'Recent Posts' : `${selectedCategory} Posts`}
          </h2>
          <div className="space-y-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="grid md:grid-cols-3 gap-6 p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 md:h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 text-xs font-medium bg-accent/90 text-accent-foreground rounded">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Newsletter CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 rounded-xl bg-accent/5 border border-accent/20 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Stay Updated
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get the latest updates, tutorials, and insights 
            delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:border-accent focus:outline-none"
            />
            <button className="pica-button whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};
