// Firebase Service for Voting Data
// Handles real-time voting data synchronization across all users

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

class FirebaseService {
  constructor() {
    this.votingCollection = "votingData";
    this.videosDocId = "videos";
    this.usersCollection = "users";
    this.userVotesCollection = "userVotes";
  }

  // Initialize voting data in Firebase
  async initializeVotingData(initialVideos) {
    try {
      const docRef = doc(db, this.votingCollection, this.videosDocId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Create initial voting data
        await setDoc(docRef, {
          videos: initialVideos,
          lastUpdated: serverTimestamp(),
          totalVotes: 0,
        });
        console.log("Initial voting data created in Firebase");
      }

      return true;
    } catch (error) {
      console.error("Error initializing voting data:", error);
      return false;
    }
  }

  // Get current voting data
  async getVotingData() {
    try {
      const docRef = doc(db, this.votingCollection, this.videosDocId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      }

      return null;
    } catch (error) {
      console.error("Error getting voting data:", error);
      return null;
    }
  }

  // Update voting data
  async updateVotingData(videos) {
    try {
      const docRef = doc(db, this.votingCollection, this.videosDocId);

      // Calculate total votes
      const totalVotes = videos.reduce((sum, video) => sum + video.votes, 0);

      await updateDoc(docRef, {
        videos: videos,
        lastUpdated: serverTimestamp(),
        totalVotes: totalVotes,
      });

      return true;
    } catch (error) {
      console.error("Error updating voting data:", error);
      return false;
    }
  }

  // Listen to real-time updates
  onVotingDataUpdate(callback) {
    const docRef = doc(db, this.votingCollection, this.videosDocId);

    return onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          callback(data);
        }
      },
      (error) => {
        console.error("Error listening to voting data updates:", error);
      }
    );
  }

  // Save user data
  async saveUserData(userId, userData) {
    try {
      const docRef = doc(db, this.usersCollection, userId);
      await setDoc(docRef, {
        ...userData,
        lastSeen: serverTimestamp(),
      });

      return true;
    } catch (error) {
      console.error("Error saving user data:", error);
      return false;
    }
  }

  // Get user data
  async getUserData(userId) {
    try {
      const docRef = doc(db, this.usersCollection, userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      }

      return null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  }

  // Save individual user vote
  async saveUserVote(userId, userName, videoId) {
    try {
      const voteId = `${userId}_${videoId}`;
      const docRef = doc(db, this.userVotesCollection, voteId);
      await setDoc(docRef, {
        userId: userId,
        userName: userName,
        videoId: videoId,
        votedAt: serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.error("Error saving user vote:", error);
      return false;
    }
  }

  // Get all votes for a specific user
  async getUserVotes(userId) {
    try {
      const { getDocs, collection, query, where } = await import(
        "firebase/firestore"
      );
      const q = query(
        collection(db, this.userVotesCollection),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const votes = [];

      querySnapshot.forEach((doc) => {
        votes.push(doc.data());
      });

      return votes;
    } catch (error) {
      console.error("Error getting user votes:", error);
      return [];
    }
  }

  // Get all users and their votes
  async getAllUsersVotes() {
    try {
      const { getDocs, collection } = await import("firebase/firestore");
      const usersSnapshot = await getDocs(collection(db, this.usersCollection));
      const userVotesSnapshot = await getDocs(
        collection(db, this.userVotesCollection)
      );

      // Create a map of user votes
      const votesMap = {};
      userVotesSnapshot.forEach((doc) => {
        const voteData = doc.data();
        if (!votesMap[voteData.userId]) {
          votesMap[voteData.userId] = [];
        }
        votesMap[voteData.userId].push(voteData.videoId);
      });

      // Combine user data with their votes
      const usersVotes = [];
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        usersVotes.push({
          id: doc.id,
          name: userData.name,
          votesRemaining: userData.votesRemaining || 0,
          votedVideos: votesMap[doc.id] || [],
          lastSeen: userData.lastSeen,
        });
      });
      return usersVotes;
    } catch (error) {
      console.error("Error getting all users votes:", error);
      return [];
    }
  }

  // Generate unique user ID (simple approach)
  generateUserId() {
    return "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  }

  // Check if Firebase is available
  isFirebaseAvailable() {
    try {
      return db !== null;
    } catch (error) {
      return false;
    }
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;
