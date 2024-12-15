const firebaseApiKey = new sst.Secret('FirebaseApiKey');
const firebaseAuthDomain = new sst.Secret('FirebaseAuthDomain');
const firebaseProjectId = new sst.Secret('FirebaseProjectId');
const firebaseStorageBucket = new sst.Secret('FirebaseStorageBucket');
const firebaseMessagingSenderId = new sst.Secret('FirebaseMessagingSenderId');
const firebaseAppId = new sst.Secret('FirebaseAppId');

// Firebase Service account secrets
const firebaseType = new sst.Secret('FirebaseType');
const firebasePrivateKey = new sst.Secret('FirebasePrivateKey');
const firebasePrivateKeyId = new sst.Secret('FirebasePrivateKeyId');
const firebaseClientEmail = new sst.Secret('FirebaseClientEmail');
const firebaseClientId = new sst.Secret('FirebaseClientId');
const firebaseAuthUri = new sst.Secret('FirebaseAuthUri');
const firebaseTokenUri = new sst.Secret('FirebaseTokenUri');
const firebaseAuthProviderCertUrl = new sst.Secret('FirebaseAuthProviderCertUrl');
const firebaseClientCertUrl = new sst.Secret('FirebaseClientCertUrl');
const firebaseUniverseDomain = new sst.Secret('FirebaseUniverseDomain');

export {
  firebaseApiKey,
  firebaseAppId,
  firebaseAuthDomain,
  firebaseMessagingSenderId,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseAuthProviderCertUrl,
  firebaseAuthUri,
  firebaseClientCertUrl,
  firebaseClientEmail,
  firebaseClientId,
  firebasePrivateKey,
  firebasePrivateKeyId,
  firebaseTokenUri,
  firebaseType,
  firebaseUniverseDomain,
}
