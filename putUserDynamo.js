import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: "us-east-2" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async (event, context) => {
    try{
        console.log(event)

        const { id, nombre, cedula } = event;
        const command = new UpdateCommand({
            TableName: "usuarios2",
            Key:{id:id,nombre:nombre},
            UpdateExpression: "set cedula = :c",
            ExpressionAttributeValues: {
                ":c": cedula
            },
            ReturnValues: "ALL_NEW"
        });

        console.log(id);
        console.log(command)

        const response = await ddbDocClient.send(command); 
        console.log("response ",response)
        return {
            statuscode: 200,
            body: JSON.stringify(response),
        };
    } catch(error) {
        console.error(error);
        return {
            statuscode: 500,
            body: JSON.stringify({message: error.message})
        }
    }
};
