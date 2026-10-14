import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace these values or ensure process.env has them configured
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const rawData = fs.readFileSync(path.join(__dirname, "psychologists.json"));
const psychologists = JSON.parse(rawData);

async function seed() {
  try {
    const colRef = collection(db, "psychologists");
    for (const psych of psychologists) {
      const docRef = await addDoc(colRef, psych);
      console.log(`Added: ${psych.name} with ID: ${docRef.id}`);
    }
    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

seed();
