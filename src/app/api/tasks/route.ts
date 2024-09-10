import { connect } from "@/dbconfig/db";
import Task from "@/models/Tasks";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const tasks = await Task.find({})
    return NextResponse.json({ tasks });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        message: "Error fetching tasks",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // Create a new task
    const new_task = new Task(reqBody);
    await new_task.save();

    return NextResponse.json(
      {
        message: "Task created",
        task: new_task, // Return the created task
      },
      { status: 201 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        message: "Error creating task",
      },
      { status: 500 }
    );
  }
}
