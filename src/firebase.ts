import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "REDACTED_FIREBASE_API_KEY",
  authDomain: "bodaeleyjavi.firebaseapp.com",
  projectId: "bodaeleyjavi",
  storageBucket: "bodaeleyjavi.firebasestorage.app",
  messagingSenderId: "548761114778",
  appId: "1:548761114778:web:27c5b56d7d37dcb1bc6723",
  measurementId: "G-PSBRPSBTCV",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
