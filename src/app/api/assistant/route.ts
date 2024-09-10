export const revalidate = 0;

import { connect } from "@/dbconfig/db";
import Task from "@/models/Tasks";
import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import mongoose from "mongoose";
connect();

export async function GET() {
  try {
    const tasks = await Task.find({}); // Fetch the tasks
    const collision = await ai(tasks); // Call AI to get the collision data
    const items = convertToJsonArray(collision); // Convert collision to JSON

    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

async function ai(data: any) {
  const apiKey = "AIzaSyAgHpbM2nVl1PavlwUqf10bV7j03GgzFXg";
  const template = `
  I will give you a list of tasks. 
  Here is the data:
  ${JSON.stringify(data, null, 2).replace(/\"/g, '\\"')}
  
  Task: Create a Dependency-Based Task Scheduling system. The output must strictly follow this JSON format:
  
  [
    {
      "id": "task_id",
      "dependent_on": ["task_id"]
    },
    {
      "id": "task_id",
      "dependent_on": []
    }
  ]
  
  Make sure the output is always consistent and follows these rules:
  - Output must be an array of objects.
  - Each object must contain the keys "id" and "dependent_on".
  - If there are no dependencies, return "dependent_on" as an empty array.
  - No extra text or additional structures, only JSON objects.
  - The keys must always be "id" and "dependent_on".
  - Example of dependency are suppose work_type "infrastructure" depends on work_type "pipeline" , work_type "road works" depends on work_type "pipeline",etc
  Do not return any explanations or extra information, only the required JSON array.
  `;

  const geminiModel = new ChatGoogleGenerativeAI({
    modelName: "gemini-pro",
    apiKey: apiKey,
  });

  for (let attempt = 1; attempt <= 5; attempt++) {
    const response = await geminiModel.invoke(template);
    const content = response.content.trim();

    try {
      // Attempt to parse the response content
      const parsedContent = JSON.parse(content);

      // Check if the format is correct
      if (Array.isArray(parsedContent) && parsedContent.every(item => {
        if (item.collision) {
          return item.collision.id && Array.isArray(item.collision.dependent_on);
        } else {
          return item.id && Array.isArray(item.dependent_on);
        }
      })) {
        return content;
      } else {
        throw new Error("Invalid format");
      }
    } catch (error) {
      if (attempt === 5) {
        throw new Error("Failed to get the correct format after 5 attempts");
      }
    }
  }
}

function convertToJsonArray(str: string) {
  // Split the string by curly braces that start a new JSON object
  const objects = str
    .split(/(?<=})\s*(?={)/) // Look for closing brace followed by an opening brace with optional spaces
    .map((obj) => obj.trim()) // Trim any whitespace around the JSON objects
    .filter((obj) => obj); // Remove any empty strings

  // Parse each JSON object and combine into an array
  const jsonArray = objects.map((obj) => JSON.parse(obj));

  return jsonArray;
}
