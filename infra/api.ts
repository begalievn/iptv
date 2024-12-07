import { table, contentTable } from "./storage";

// Create the API
export const api = new sst.aws.ApiGatewayV2("Api", {
  transform: {
    route: {
      handler: {
        link: [table, contentTable],
      },
      args: {
        auth: { iam: true }
      }
    }
  }
});

api.route("POST /notes", "packages/functions/src/create.main");

// Content
api.route("POST /content", "packages/functions/src/content/create.main");
api.route("GET /content/{id}", "packages/functions/src/content/get.main");
api.route("GET /content", "packages/functions/src/content/list.main");
api.route("PUT /content/{id}", "packages/functions/src/content/update.main");
api.route("DELETE /content/{id}", "packages/functions/src/content/delete.main");
