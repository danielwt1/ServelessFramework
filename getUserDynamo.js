import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: "us-east-2" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async () => {
    const params = {
        TableName: 'usuarios2', // Reemplaza por el nombre de tu tabla
    };
    
    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        console.log("Datos leídos exitosamente:", JSON.stringify(data, null, 2));
        return data;
    } catch (err) {
        console.error("No se pudo leer los datos de la tabla. Error JSON:", JSON.stringify(err, null, 2));
        throw err;
    }
};
