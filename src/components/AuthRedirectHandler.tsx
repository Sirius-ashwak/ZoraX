import React, { useEffect } from 'react';
import { getAuth, getRedirectResult, GoogleAuthProvider } from 'firebase/auth';
import { createUserProfile } from '../config/firebase';

export const AuthRedirectHandler: React.FC = () => {
  useEffect(() => {
    const handleRedirect = async () => {
      const auth = getAuth();
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // User signed in successfully
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
          
          // Create user profile in Firestore
          await createUserProfile(user, {
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0],
            photoURL: user.photoURL,
            provider: 'google'
          });
          
          console.log('User signed in with Google:', user);
        }
      } catch (error: any) {
        console.error('Google sign-in error:', error);
        // Handle specific error codes
        if (error.code === 'auth/account-exists-with-different-credential') {
          console.error('Account exists with different credential');
        } else if (error.code === 'auth/auth-domain-config-required') {
          console.error('Auth domain config required');
        } else if (error.code === 'auth/cancelled-popup-request') {
          console.error('Cancelled popup request');
        } else if (error.code === 'auth/operation-not-allowed') {
          console.error('Operation not allowed');
        } else if (error.code === 'auth/operation-not-supported-in-this-environment') {
          console.error('Operation not supported in this environment');
        } else if (error.code === 'auth/popup-blocked') {
          console.error('Popup blocked');
        } else if (error.code === 'auth/popup-closed-by-user') {
          console.error('Popup closed by user');
        } else if (error.code === 'auth/unauthorized-domain') {
          console.error('Unauthorized domain');
        }
      }
    };

    handleRedirect();
  }, []);

  return null; // This component doesn't render anything
};