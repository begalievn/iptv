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

// Content
api.route("POST /playlist", "packages/functions/src/playlist/create.main");
api.route("GET /playlist/{id}", "packages/functions/src/playlist/get.main");
api.route("GET /playlist", "packages/functions/src/playlist/list.main");
api.route("PUT /playlist/{id}", "packages/functions/src/playlist/update.main");
api.route("DELETE /playlist/{id}", "packages/functions/src/playlist/delete.main");
api.route("GET /playlist/mac/{macAddress}", "packages/functions/src/playlist/get-by-mac-address.main");

// Uploads
api.route("POST /upload", "packages/functions/src/upload/create.main");

// Users
api.route("DELETE /user", "packages/functions/src/user/delete.main");
