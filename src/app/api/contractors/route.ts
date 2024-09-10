import { connect } from "@/dbconfig/db";
import { generate_jwt } from "@/helpers/auth";
import Contractor from "@/models/Contractors";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const data = await Contractor.find({});
    return NextResponse.json({ data });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        message: "Error fetching contractors",
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

    const new_contractor = new Contractor(reqBody);
    await new_contractor.save();

    const token = generate_jwt(
      { id: new_contractor._id, email: new_contractor.email },
      "contractor"
    );

    return NextResponse.json(
      {
        message: "Contractor registered",
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        message: "Error registering contractor",
      },
      { status: 500 }
    );
  }
}
