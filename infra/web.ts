import { api } from "./api";
import { bucket } from "./storage";
import { userPool, identityPool, userPoolClient } from "./auth";
import {
  firebaseApiKey,
  firebaseAppId,
  firebaseAuthDomain,
  firebaseMessagingSenderId,
  firebaseProjectId,
  firebaseStorageBucket,
} from "./secrets";

const region = aws.getRegionOutput().name;

export const frontend = new sst.aws.StaticSite("Frontend", {
  path: "packages/frontend",
  build: {
    output: "dist",
    command: "npm run build",
  },
  environment: {
    VITE_REGION: region,
    VITE_API_URL: api.url,
    VITE_BUCKET: bucket.name,
    VITE_USER_POOL_ID: userPool.id,
    VITE_IDENTITY_POOL_ID: identityPool.id,
    VITE_USER_POOL_CLIENT_ID: userPoolClient.id,
    // Firebase
    VITE_FIREBASE_API_KEY: firebaseApiKey.value,
    VITE_FIREBASE_AUTH_DOMAIN: firebaseAuthDomain.value,
    VITE_FIREBASE_PROJECT_ID: firebaseProjectId.value,
    VITE_FIREBASE_STORAGE_BUCKET: firebaseStorageBucket.value,
    VITE_FIREBASE_MESSAGING_SENDER_ID: firebaseMessagingSenderId.value,
    VITE_FIREBASE_APP_ID: firebaseAppId.value,
  },
});
