/* eslint-disable @typescript-eslint/no-explicit-any */
// api/schedule-meeting/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "../(lib)/mongodb";
import Meeting, { IMeeting } from "../(model)/Meeting";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const data = await req.json();

        const {
          name, email, phone, course, year,
          preferredDate, preferredTime, topics, message
        } = data;

        if (
            !name ||
            !email ||
            !phone ||
            !course ||
            !year ||
            !preferredDate ||
            !preferredTime ||
            !topics
        ) {
            return NextResponse.json(
              { message: "Missing required fields" },
              { status: 400 }
            );
        }

        const meeting: Partial<IMeeting> = {
            name, email, phone, course, year,
            preferredDate, preferredTime, topics, message,
            approved: false,
            timestamp: new Date()
        }

        const savedMeeting = await Meeting.create(meeting);

        return NextResponse.json(
            { message: "Meeting created successfully", Meeting: savedMeeting },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error scheduling meeting:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: (error as Error).message } , 
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectToDatabase();
        const meetings = await Meeting.find().sort({ timestamp: -1 });
        return NextResponse.json(meetings, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching meetings: ', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: (error as Error).message } , 
            { status: 500 }
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connectToDatabase();
        const { id, updates } = await req.json();

        if (!id || typeof updates !== 'object' || !updates) {
            return NextResponse.json(
                { message: "Missing or invalid 'id' or 'updates' payload" },
                { status: 400 }
            );
        }
        
        const updatedMeeting = await Meeting.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );

        if (!updatedMeeting) {
            return NextResponse.json(
                { message: "Meeting not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Meeting updated successfully", meeting: updatedMeeting },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating meeting:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}