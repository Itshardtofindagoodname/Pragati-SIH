import { connect } from "@/dbconfig/db";
import Departmental from "@/models/Departmental";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { generate_jwt } from "@/helpers/auth";

connect();
export async function GET() {
  try {
    const data = await Departmental.find({});
    return NextResponse.json({ data });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        message: "Error fetching departmental data",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // Process or validate fields if needed
    // TODO: Handle any additional logic here

    const new_departmental = new Departmental(reqBody);
    await new_departmental.save();

    // Generate JWT
    const token = generate_jwt({ id: new_departmental._id, email: new_departmental.email },"department")
    return NextResponse.json(
      {
        message: "Departmental registered",
        token, // Send the generated token
      },
      { status: 201 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        message: "Error registering departmental",
      },
      { status: 500 }
    );
  }
}
