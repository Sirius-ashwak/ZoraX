import { 
  createCampaign as createCampaignFirebase,
  getCampaigns,
  getCampaignsByCreator as getCampaignsByCreatorFirebase,
  getCampaignById as getCampaignByIdFirebase,
  updateCampaign as updateCampaignFirebase,
  deleteCampaign as deleteCampaignFirebase,
  createMint as createMintFirebase,
  getMintsByCampaign as getMintsByCampaignFirebase,
  getMintsBySupporter as getMintsBySupporterFirebase,
  createReputation as createReputationFirebase,
  getReputationByUser as getReputationByUserFirebase,
  updateReputation as updateReputationFirebase,
  createFrame as createFrameFirebase,
  getFrameByCampaign as getFrameByCampaignFirebase,
  updateFrameInteractions as updateFrameInteractionsFirebase,
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  db
} from '../src/config/firebase';
import { collection, getDocs, doc, getDoc, query, where, addDoc, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore';
import { User, Campaign, Mint, Reputation, Frame, NewUser, NewCampaign, NewMint, NewReputation, NewFrame } from '../shared/schema';
import { IStorage } from './storage';

export class FirebaseStorage implements IStorage {
  
  // User operations
  async createUser(user: NewUser): Promise<User> {
    const userRef = await addDoc(collection(db, 'users'), {
      ...user,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    const userDoc = await getDoc(userRef);
    return {
      id: parseInt(userRef.id),
      ...userDoc.data(),
      createdAt: userDoc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: userDoc.data()?.updatedAt?.toDate() || new Date(),
    } as User;
  }

  async getUserById(id: number): Promise<User | null> {
    const userDoc = await getDoc(doc(db, 'users', id.toString()));
    if (!userDoc.exists()) return null;
    
    return {
      id: parseInt(userDoc.id),
      ...userDoc.data(),
      createdAt: userDoc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: userDoc.data()?.updatedAt?.toDate() || new Date(),
    } as User;
  }

  async getUserByAddress(address: string): Promise<User | null> {
    const q = query(collection(db, 'users'), where('address', '==', address));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return null;
    
    const userDoc = querySnapshot.docs[0];
    return {
      id: parseInt(userDoc.id),
      ...userDoc.data(),
      createdAt: userDoc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: userDoc.data()?.updatedAt?.toDate() || new Date(),
    } as User;
  }

  async updateUser(id: number, updates: Partial<NewUser>): Promise<User | null> {
    const userDocRef = doc(db, 'users', id.toString());
    await updateDoc(userDocRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    
    return this.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    } as User));
  }

  // Campaign operations
  async createCampaign(campaign: NewCampaign): Promise<Campaign> {
    const campaignRef = await addDoc(collection(db, 'campaigns'), {
      ...campaign,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    const campaignDoc = await getDoc(campaignRef);
    return {
      id: parseInt(campaignRef.id),
      ...campaignDoc.data(),
      createdAt: campaignDoc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: campaignDoc.data()?.updatedAt?.toDate() || new Date(),
    } as Campaign;
  }

  async getCampaignById(id: number): Promise<Campaign | null> {
    const campaignDoc = await getDoc(doc(db, 'campaigns', id.toString()));
    if (!campaignDoc.exists()) return null;
    
    return {
      id: parseInt(campaignDoc.id),
      ...campaignDoc.data(),
      createdAt: campaignDoc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: campaignDoc.data()?.updatedAt?.toDate() || new Date(),
    } as Campaign;
  }

  async getCampaignsByCreator(creatorId: number): Promise<Campaign[]> {
    const q = query(collection(db, 'campaigns'), where('creatorId', '==', creatorId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    } as Campaign));
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    const querySnapshot = await getDocs(collection(db, 'campaigns'));
    return querySnapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    } as Campaign));
  }

  async updateCampaign(id: number, updates: Partial<NewCampaign>): Promise<Campaign | null> {
    const campaignDocRef = doc(db, 'campaigns', id.toString());
    await updateDoc(campaignDocRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    
    return this.getCampaignById(id);
  }

  async deleteCampaign(id: number): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'campaigns', id.toString()));
      return true;
    } catch (error) {
      console.error('Error deleting campaign:', error);
      return false;
    }
  }

  // Mint operations
  async createMint(mint: NewMint): Promise<Mint> {
    const mintRef = await addDoc(collection(db, 'mints'), {
      ...mint,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    const mintDoc = await getDoc(mintRef);
    return {
      id: parseInt(mintRef.id),
      ...mintDoc.data(),
      createdAt: mintDoc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: mintDoc.data()?.updatedAt?.toDate() || new Date(),
    } as Mint;
  }

  async getMintsByCampaign(campaignId: number): Promise<Mint[]> {
    const q = query(collection(db, 'mints'), where('campaignId', '==', campaignId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    } as Mint));
  }

  async getMintsBySupporter(supporterId: number): Promise<Mint[]> {
    const q = query(collection(db, 'mints'), where('supporterId', '==', supporterId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    } as Mint));
  }

  async getAllMints(): Promise<Mint[]> {
    const querySnapshot = await getDocs(collection(db, 'mints'));
    return querySnapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    } as Mint));
  }

  // Reputation operations
  async createReputation(reputation: NewReputation): Promise<Reputation> {
    const reputationRef = await addDoc(collection(db, 'reputations'), {
      ...reputation,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    const reputationDoc = await getDoc(reputationRef);
    return {
      id: parseInt(reputationRef.id),
      ...reputationDoc.data(),
      createdAt: reputationDoc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: reputationDoc.data()?.updatedAt?.toDate() || new Date(),
    } as Reputation;
  }

  async getReputationByUser(userId: number): Promise<Reputation | null> {
    const q = query(collection(db, 'reputations'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return null;
    
    const reputationDoc = querySnapshot.docs[0];
    return {
      id: parseInt(reputationDoc.id),
      ...reputationDoc.data(),
      createdAt: reputationDoc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: reputationDoc.data()?.updatedAt?.toDate() || new Date(),
    } as Reputation;
  }

  async updateReputation(userId: number, updates: Partial<NewReputation>): Promise<Reputation | null> {
    const q = query(collection(db, 'reputations'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return null;
    
    const reputationDoc = querySnapshot.docs[0];
    await updateDoc(reputationDoc.ref, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    
    return this.getReputationByUser(userId);
  }

  async getAllReputations(): Promise<Reputation[]> {
    const querySnapshot = await getDocs(collection(db, 'reputations'));
    return querySnapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    } as Reputation));
  }

  // Frame operations
  async createFrame(frame: NewFrame): Promise<Frame> {
    const frameRef = await addDoc(collection(db, 'frames'), {
      ...frame,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    const frameDoc = await getDoc(frameRef);
    return {
      id: parseInt(frameRef.id),
      ...frameDoc.data(),
      createdAt: frameDoc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: frameDoc.data()?.updatedAt?.toDate() || new Date(),
    } as Frame;
  }

  async getFrameByCampaign(campaignId: number): Promise<Frame | null> {
    const q = query(collection(db, 'frames'), where('campaignId', '==', campaignId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return null;
    
    const frameDoc = querySnapshot.docs[0];
    return {
      id: parseInt(frameDoc.id),
      ...frameDoc.data(),
      createdAt: frameDoc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: frameDoc.data()?.updatedAt?.toDate() || new Date(),
    } as Frame;
  }

  async getAllFrames(): Promise<Frame[]> {
    const querySnapshot = await getDocs(collection(db, 'frames'));
    return querySnapshot.docs.map(doc => ({
      id: parseInt(doc.id),
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate() || new Date(),
      updatedAt: doc.data()?.updatedAt?.toDate() || new Date(),
    } as Frame));
  }

  async updateFrameInteractions(campaignId: number): Promise<Frame | null> {
    const q = query(collection(db, 'frames'), where('campaignId', '==', campaignId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return null;
    
    const frameDoc = querySnapshot.docs[0];
    const currentData = frameDoc.data();
    
    await updateDoc(frameDoc.ref, {
      interactions: (currentData.interactions || 0) + 1,
      updatedAt: serverTimestamp(),
    });
    
    return this.getFrameByCampaign(campaignId);
  }
}