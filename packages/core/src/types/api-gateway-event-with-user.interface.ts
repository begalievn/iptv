import { APIGatewayProxyEvent } from "aws-lambda";

export interface APIGatewayProxyEventWithUser extends APIGatewayProxyEvent {
  user: {
    email?: string;
    id: string;
  };
}