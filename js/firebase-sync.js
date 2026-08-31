// ============================================================================
// MoKa Cafe — Firebase Firestore Realtime Cloud Synchronization
// Project: moka-menu-2d575
// ============================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgC0zjozHiRoCQBzCSzyTN5hMuKJBL2Jo",
  authDomain: "moka-menu-2d575.firebaseapp.com",
  projectId: "moka-menu-2d575",
  storageBucket: "moka-menu-2d575.firebasestorage.app",
  messagingSenderId: "596826764261",
  appId: "1:596826764261:web:31cea4f5b8f8f36c43b50c",
  measurementId: "G-PHGHH5CX1D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const docRef = doc(db, "moka_menu", "data");

/**
 * Ensure user is authenticated before performing write operations
 */
async function ensureAuthenticated() {
  try {
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }
    return true;
  } catch (error) {
    console.warn("Firebase Anonymous Auth warning:", error);
    return false;
  }
}

/**
 * Filter and sanitize settings data before sending to Firestore
 * Excludes private administrative credentials (like adminPin) from public customer data.
 */
function sanitizePublicSettings(settings = {}) {
  const {
    whatsappNumber = "201000000000",
    phoneNumber = "+201000000000",
    whatsappUrl = "https://wa.me/201000000000",
    instagramUrl = "https://instagram.com",
    menuBaseUrl = "",
    cloudinaryCloudName = "qrif7qmf",
    cloudinaryUploadPreset = "moka menu"
  } = settings;

  return {
    whatsappNumber,
    phoneNumber,
    whatsappUrl,
    instagramUrl,
    menuBaseUrl,
    cloudinaryCloudName,
    cloudinaryUploadPreset
  };
}

/**
 * Save menu, offers, and public settings data to Firebase Cloud Firestore.
 */
export async function saveToCloud(menuData, offerData, settingsData) {
  try {
    await ensureAuthenticated();
    const payload = {
      menu: menuData,
      offer: offerData,
      settings: sanitizePublicSettings(settingsData),
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, payload);
    return { success: true };
  } catch (error) {
    console.error("Firebase Cloud Save Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch latest data from Firebase Cloud Firestore once.
 */
export async function fetchFromCloud() {
  try {
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.warn("Firebase Cloud Fetch Error:", error);
    return null;
  }
}

/**
 * Listen for real-time changes on Firebase Cloud Firestore.
 * Callback is invoked whenever the owner edits a price or item.
 */
export function subscribeToCloud(onUpdate) {
  try {
    return onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        onUpdate(data);
      }
    }, (error) => {
      console.warn("Firebase Realtime Listener Warning:", error);
    });
  } catch (error) {
    console.warn("Could not subscribe to Firebase realtime updates:", error);
    return null;
  }
}
