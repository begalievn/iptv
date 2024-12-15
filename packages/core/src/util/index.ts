import { Context, APIGatewayProxyEvent } from "aws-lambda";
import { admin } from "../firebase-config";
import { APIGatewayProxyEventWithUser } from "../types/api-gateway-event-with-user.interface";

export module Util {
  export function handler(
    lambda: (evt: APIGatewayProxyEvent, context: Context) => Promise<string>
  ) {
    return async function (event: APIGatewayProxyEvent, context: Context) {
      let body: string, statusCode: number;

      try {
        body = await lambda(event, context);
        statusCode = 200;
      } catch (error) {
        statusCode = 500;
        body = JSON.stringify({
          error: error instanceof Error ? error.message : String(error),
        });
      }

      return getHttpResponse(body, statusCode);
    };
  }

  export function authHandler(
    lambda: (evt: APIGatewayProxyEventWithUser, context: Context) => Promise<string>
  ) {
    return async function (event: APIGatewayProxyEventWithUser, context: Context) {
      let body: string, statusCode: number;

      try {
        const token = event?.headers?.authorization;
        body = JSON.stringify({
          message: "No token provided",
        });
        if (!token) {
          return getHttpResponse(body, 401);
        }

        const idToken = token?.split(' ')[1] || '';
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const user = {
          email: decodedToken?.email,
          id: decodedToken.uid,
        };
        event.user = user;

        body = await lambda(event, context);
        statusCode = 200;
      } catch (error) {
        statusCode = 500;
        body = JSON.stringify({
          error: error instanceof Error ? error.message : String(error),
        });
      }

      return getHttpResponse(body, statusCode);
    };
  }

  function getHttpResponse(body: string, statusCode: number) {
    return {
      body,
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  }
}
