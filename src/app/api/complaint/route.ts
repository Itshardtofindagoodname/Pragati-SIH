import { connect } from "@/dbconfig/db";
import Complaint from "@/models/Complaints";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(){
    const data = await Complaint.find({})
    return NextResponse.json({data})
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // Process or validate attachment_id if needed
    // TODO: Handle attachment_id logic here

    const new_complaint = new Complaint(reqBody);
    await new_complaint.save();

    return NextResponse.json(
      {
        message: "Complaint registered",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      {
        message: "Error",
      },
      { status: 500 }
    );
  }
}
