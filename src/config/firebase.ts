import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, getDocs, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Auth functions
export const signInWithGoogle = () => signInWithRedirect(auth, googleProvider);

export const signInWithEmail = (email: string, password: string) => 
  signInWithEmailAndPassword(auth, email, password);

export const createUserWithEmail = (email: string, password: string) => 
  createUserWithEmailAndPassword(auth, email, password);

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback: (user: any) => void) => 
  onAuthStateChanged(auth, callback);

// Firestore helper functions
export const createUserProfile = async (userAuth: any, additionalData = {}) => {
  if (!userAuth) return;
  
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = serverTimestamp();
    
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }
  
  return userDocRef;
};

export const getUserProfile = async (uid: string) => {
  const userDocRef = doc(db, 'users', uid);
  const userSnapshot = await getDoc(userDocRef);
  return userSnapshot.exists() ? userSnapshot.data() : null;
};

export const updateUserProfile = async (uid: string, updates: any) => {
  const userDocRef = doc(db, 'users', uid);
  await updateDoc(userDocRef, updates);
};

// Campaign functions
export const createCampaign = async (campaignData: any) => {
  const campaignsRef = collection(db, 'campaigns');
  const docRef = await addDoc(campaignsRef, {
    ...campaignData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const getCampaigns = async () => {
  const campaignsRef = collection(db, 'campaigns');
  const querySnapshot = await getDocs(campaignsRef);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getCampaignsByCreator = async (creatorId: string) => {
  const campaignsRef = collection(db, 'campaigns');
  const q = query(campaignsRef, where('creatorId', '==', creatorId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getCampaignById = async (id: string) => {
  const campaignDocRef = doc(db, 'campaigns', id);
  const campaignSnapshot = await getDoc(campaignDocRef);
  return campaignSnapshot.exists() ? { id, ...campaignSnapshot.data() } : null;
};

export const updateCampaign = async (id: string, updates: any) => {
  const campaignDocRef = doc(db, 'campaigns', id);
  await updateDoc(campaignDocRef, updates);
};

export const deleteCampaign = async (id: string) => {
  const campaignDocRef = doc(db, 'campaigns', id);
  await deleteDoc(campaignDocRef);
};

// Mint functions
export const createMint = async (mintData: any) => {
  const mintsRef = collection(db, 'mints');
  const docRef = await addDoc(mintsRef, {
    ...mintData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const getMintsByCampaign = async (campaignId: string) => {
  const mintsRef = collection(db, 'mints');
  const q = query(mintsRef, where('campaignId', '==', campaignId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getMintsBySupporter = async (supporterId: string) => {
  const mintsRef = collection(db, 'mints');
  const q = query(mintsRef, where('supporterId', '==', supporterId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

// Reputation functions
export const createReputation = async (reputationData: any) => {
  const reputationsRef = collection(db, 'reputations');
  const docRef = await addDoc(reputationsRef, {
    ...reputationData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const getReputationByUser = async (userId: string) => {
  const reputationsRef = collection(db, 'reputations');
  const q = query(reputationsRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0 ? {
    id: querySnapshot.docs[0].id,
    ...querySnapshot.docs[0].data()
  } : null;
};

export const updateReputation = async (id: string, updates: any) => {
  const reputationDocRef = doc(db, 'reputations', id);
  await updateDoc(reputationDocRef, updates);
};

// Frame functions
export const createFrame = async (frameData: any) => {
  const framesRef = collection(db, 'frames');
  const docRef = await addDoc(framesRef, {
    ...frameData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};

export const getFrameByCampaign = async (campaignId: string) => {
  const framesRef = collection(db, 'frames');
  const q = query(framesRef, where('campaignId', '==', campaignId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0 ? {
    id: querySnapshot.docs[0].id,
    ...querySnapshot.docs[0].data()
  } : null;
};

export const updateFrameInteractions = async (id: string) => {
  const frameDocRef = doc(db, 'frames', id);
  const frameSnapshot = await getDoc(frameDocRef);
  
  if (frameSnapshot.exists()) {
    const currentData = frameSnapshot.data();
    await updateDoc(frameDocRef, {
      interactions: (currentData.interactions || 0) + 1
    });
  }
};

export default app;