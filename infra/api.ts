import { firebaseApiKey, firebaseAuthProviderCertUrl, firebaseAuthUri, firebaseClientCertUrl, firebaseClientEmail, firebaseClientId, firebasePrivateKey, firebasePrivateKeyId, firebaseProjectId, firebaseTokenUri, firebaseType, firebaseUniverseDomain } from "./secrets";
import { table, contentTable, bucket } from "./storage";

// Create the API
export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table, contentTable, bucket],
        environment: {
          FIREBASE_API_KEY: firebaseApiKey.value,
          FIREBASE_PROJECT_ID: firebaseProjectId.value,
          FIREBASE_TYPE: firebaseType.value,
          FIREBASE_PRIVATE_KEY: firebasePrivateKey.value,
          FIREBASE_PRIVATE_KEY_ID: firebasePrivateKeyId.value,
          FIREBASE_CLIENT_EMAIL: firebaseClientEmail.value,
          FIREBASE_CLIENT_ID: firebaseClientId.value,
          FIREBASE_AUTH_URI: firebaseAuthUri.value,
          FIREBASE_TOKEN_URI: firebaseTokenUri.value,
          FIREBASE_AUTH_PROVIDER_CERT_URL: firebaseAuthProviderCertUrl.value,
          FIREBASE_CLIENT_CERT_URL: firebaseClientCertUrl.value,
          FIREBASE_UNIVERSE_DOMAIN: firebaseUniverseDomain.value,
        }
      },
    }
  },
});

// Notes
api.route("POST /notes", "packages/functions/src/create.main");

// Content
api.route("POST /content", "packages/functions/src/content/create.main");
api.route("GET /content/{id}", "packages/functions/src/content/get.main");
api.route("GET /content", "packages/functions/src/content/list.main");
api.route("PUT /content/{id}", "packages/functions/src/content/update.main");
api.route("DELETE /content/{id}", "packages/functions/src/content/delete.main");

// Uploads
api.route("POST /upload", "packages/functions/src/upload/create.main");
