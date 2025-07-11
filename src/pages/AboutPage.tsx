import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Zap, Globe, Heart, Star } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              About ZoraX
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're building the future of creator economies, empowering artists, musicians, and creators 
              to build sustainable relationships with their supporters through transparent reputation and 
              direct support mechanisms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                ZoraX exists to democratize the creator economy by providing transparent, 
                blockchain-based tools that help creators build genuine relationships with 
                their supporters while maintaining full ownership of their content and audience.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that creators should be rewarded fairly for their work and have 
                direct access to their supporters without intermediaries taking excessive cuts 
                or controlling the relationship.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-card p-6 rounded-xl border border-border">
                <Target className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Creator First</h3>
                <p className="text-sm text-muted-foreground">
                  Everything we build puts creators in control of their destiny
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-xl border border-border">
                <Globe className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Web3 Native</h3>
                <p className="text-sm text-muted-foreground">
                  Built on blockchain for transparency and true ownership
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-xl border border-border">
                <Heart className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Community Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Fostering genuine connections between creators and supporters
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-xl border border-border">
                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Constantly pushing the boundaries of what's possible
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
              Our Values
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Transparency</h3>
                <p className="text-muted-foreground">
                  Open source, on-chain reputation, and clear communication in everything we do.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Quality</h3>
                <p className="text-muted-foreground">
                  We're committed to building tools that creators love to use and supporters trust.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Accessibility</h3>
                <p className="text-muted-foreground">
                  Making Web3 tools accessible to creators regardless of their technical background.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Built by Creators, for Creators
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Our team consists of creators, developers, and Web3 enthusiasts who understand 
              the challenges of building sustainable creative careers. We're not just building 
              tools—we're creating the infrastructure for a new creative economy.
            </p>
            
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Join Our Mission
              </h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented individuals who share our vision of empowering creators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/careers" 
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  View Open Positions
                </a>
                <a 
                  href="/contact" 
                  className="border border-border text-foreground px-6 py-3 rounded-lg hover:bg-card transition-colors font-medium"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
