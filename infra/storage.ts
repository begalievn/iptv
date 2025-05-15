// Create an S3 bucket
export const bucket = new sst.aws.Bucket("Uploads");

// Create the DynamoDB table
export const table = new sst.aws.Dynamo("Notes", {
  fields: {
    userId: "string",
    noteId: "string",
  },
  primaryIndex: { hashKey: "userId", rangeKey: "noteId" },
});

export const contentTable = new sst.aws.Dynamo("Playlists", {
  fields: {
    id: "string",
    userId: 'string',
    mac_address: 'string',
  },
  primaryIndex: { hashKey: 'userId', rangeKey: 'id' },
  globalIndexes: {
    macAddressIndex: { hashKey: "mac_address", rangeKey: "userId" },
  },
});

export const sessionTable = new sst.aws.Dynamo("Session", {
  fields: {
    id: "string",
    userId: 'string',
    code: 'string',
  },
  primaryIndex: { hashKey: 'userId', rangeKey: 'id' },
  globalIndexes: {
    codeIndex: { hashKey: "code", rangeKey: "userId" },
  },
  ttl: "expiresAt",
});
