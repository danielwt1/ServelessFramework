import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { SNSClient,PublishCommand } from "@aws-sdk/client-sns";

const REGION = "us-east-2";
const snsClient = new SNSClient({ region: REGION });
const ddbClient = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
const params = { Name: "" }; //TOPIC_NAME

export const handler = async (event,context) => {
  
  const params = {
    Message: JSON.stringify(event), // MESSAGE_TEXT
    TopicArn: "arn:aws:sns:us-east-2:545770966230:UsuariosCreadoTopic", //TOPIC_ARN
    };
    try{
      console.log(event)

      const newUser = {
        ...event
      };
      await ddbDocClient.send(new PutCommand({
        TableName:"usuarios2",
        Item:newUser
      }));
      const data = await snsClient.send(new PublishCommand(params));
      console.log("Succes: ",data);
      return {
        statuscode:201,
        body:JSON.stringify(newUser),
      };
    }catch(error ){
      console.error(error);
      return{
        statuscode:500,
        body:JSON.stringify({message:error.message})
      }
    }
};
