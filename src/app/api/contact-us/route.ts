// /app/api/contact/route.ts
import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Configure the AWS SES client
const ses = new SESClient({ region: "us-east-1" }); // Change to your region

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const params = {
      Destination: {
        ToAddresses: ["your-email@example.com"], // Change to your verified recipient email
      },
      Message: {
        Body: {
          Text: {
            Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
          },
        },
        Subject: { Data: "New Contact Form Submission" },
      },
      Source: "your-verified-sender@example.com", // Must be verified in SES
    };

    await ses.send(new SendEmailCommand(params));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SES send error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
