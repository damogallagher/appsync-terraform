import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const dynamoDb = DynamoDBDocument.from(new DynamoDB());


const tableName = "example-table";


export const handler = async (event, context) => {
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  console.log("Received event:", JSON.stringify(event, null, 2));

  const id = event.arguments.id;

  // Log the incoming event to CloudWatch
  console.log("id:", id);

  const params = {
    TableName: tableName, // Replace with your DynamoDB table name
    Key: {
      id: id
    }
  };

  try {
    console.log(`Querying DynamoDB for id: ${id}`);  // Log the query ID
    console.log("Pre Query DynamoDB - params:", JSON.stringify(params, null, 2));
    const result = await dynamoDb.get(params);
    console.log(`result: ${JSON.stringify(result)}`);
    if (!result.Item) {
      console.log(`Item with id ${id} not found.`);  // Log if item is not found
      // return { error: "Item not found" };
      return {
        id: null,
        created_at: null,
      };
    }
    const item = result.Item;
    console.log(`Item found: ${JSON.stringify(item)}`);  // Log the result if found

    // return {
    //     statusCode,
    //     item,
    //     headers,
    //   };
    // Return the data, ensure the fields are properly returned
    return {
      id: item.id,
      created_at: item.created_at,
    };
  } catch (error) {
    // Log the error to CloudWatch if the operation fails
    console.error("Error querying DynamoDB:", error.message);
    return { error: error.message };
  }
};
