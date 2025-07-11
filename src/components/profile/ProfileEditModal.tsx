import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Save, Camera, Globe, MessageCircle, Github } from 'lucide-react';

interface ProfileData {
  displayName: string;
  bio: string;
  avatar?: string;
  coverImage?: string;
  socialLinks: {
    farcaster?: string;
    lens?: string;
    github?: string;
    mirror?: string;
    website?: string;
  };
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: ProfileData;
  onSave: (data: ProfileData) => void;
}

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSave
}) => {
  const [formData, setFormData] = useState<ProfileData>(initialData);
  const [avatarPreview, setAvatarPreview] = useState<string>(initialData.avatar || '');
  const [coverPreview, setCoverPreview] = useState<string>(initialData.coverImage || '');
  const [isLoading, setSaving] = useState(false);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (platform: keyof ProfileData['socialLinks'], value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleImageUpload = (file: File, type: 'avatar' | 'cover') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'avatar') {
        setAvatarPreview(result);
        setFormData(prev => ({ ...prev, avatar: result }));
      } else {
        setCoverPreview(result);
        setFormData(prev => ({ ...prev, coverImage: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave(formData);
    setSaving(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-background border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Cover Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Cover Image</label>
                <div className="relative h-32 bg-secondary/30 rounded-lg overflow-hidden">
                  {coverPreview ? (
                    <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <Camera className="w-8 h-8" />
                    </div>
                  )}
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <Upload className="w-6 h-6 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, 'cover');
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium mb-2">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 bg-secondary/30 rounded-full overflow-hidden">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <Camera className="w-6 h-6" />
                      </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, 'avatar');
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Display Name</label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => handleInputChange('displayName', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Your display name"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell the world about yourself..."
                />
              </div>

              {/* Social Links */}
              <div>
                <label className="block text-sm font-medium mb-3">Social Links</label>
                <div className="space-y-3">
                  {/* Website */}
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <input
                      type="url"
                      value={formData.socialLinks.website || ''}
                      onChange={(e) => handleSocialLinkChange('website', e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  {/* Farcaster */}
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={formData.socialLinks.farcaster || ''}
                      onChange={(e) => handleSocialLinkChange('farcaster', e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="@username"
                    />
                  </div>

                  {/* GitHub */}
                  <div className="flex items-center gap-3">
                    <Github className="w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={formData.socialLinks.github || ''}
                      onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
              <button
                onClick={onClose}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
