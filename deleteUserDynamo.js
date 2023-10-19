import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
const ddbClient = new DynamoDBClient({ region: "us-east-2" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async (event) => {
  const {id} = event;
  console.log(id);
  const command = new DeleteCommand({
    TableName: "usuarios2",
    Key: {
      id: id,
    },
  });

  const response = await ddbDocClient.send(command);
  console.log(response);
  return response;
};

