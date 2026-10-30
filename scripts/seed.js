import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const databaseUrl = process.env.VITE_FIREBASE_DATABASE_URL;
const databaseToken = process.env.FIREBASE_DATABASE_TOKEN;

const slugify = (value) => value
  .normalize("NFKD")
  .replace(/[̀-ͯ]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const readPsychologists = () => {
  const filePath = path.join(__dirname, "psychologists.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const buildRecords = (psychologists) => Object.fromEntries(
  psychologists.map((psychologist) => {
    const id = slugify(psychologist.name);
    return [id, { id, ...psychologist }];
  }),
);

const seed = async () => {
  if (!databaseUrl) {
    throw new Error("VITE_FIREBASE_DATABASE_URL is required to seed Realtime Database.");
  }

  if (!databaseToken) {
    throw new Error("FIREBASE_DATABASE_TOKEN is required for the server-only seed command.");
  }

  const records = buildRecords(readPsychologists());
  const endpoint = `${databaseUrl.replace(/\/$/, "")}/psychologists.json?auth=${encodeURIComponent(databaseToken)}`;
  const response = await fetch(endpoint, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(records),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Realtime Database seed failed (${response.status}): ${errorText}`);
  }

  console.log(`Seeded ${Object.keys(records).length} psychologists.`);
};

seed().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
