/* eslint-disable @typescript-eslint/no-explicit-any */
// api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import connectToDatabase from "../(lib)/mongodb";
import Meeting from "../(model)/Meeting";

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'outlook', 'yahoo' etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password or app-specific password
  }
});

// Alternatively, for other SMTP services:
/*
const transporter = nodemailer.createTransporter({
  host: 'smtp.your-email-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
*/

const getApprovalEmailTemplate = (meeting: any) => {
  return {
    subject: '✅ Meeting Approved - Career Counseling Session with Director Sanjay Zawar',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .meeting-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745; }
          .topics { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
          .topic-tag { background: #e3f2fd; color: #1565c0; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
          .important-note { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Meeting Approved!</h1>
            <p>Your career counseling session has been confirmed</p>
          </div>
          
          <div class="content">
            <p>Dear <strong>${meeting.name}</strong>,</p>
            
            <p>Great news! Your career counseling session with <strong>Director Sanjay Zawar</strong> has been approved and confirmed.</p>
            
            <div class="meeting-details">
              <h3>📅 Meeting Details</h3>
              <p><strong>Date:</strong> ${new Date(meeting.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Time:</strong> ${meeting.preferredTime}</p>
              <p><strong>Duration:</strong> 60 minutes</p>
              <p><strong>Location:</strong> In-person meeting (Address will be shared 24 hours before the meeting)</p>
              <p><strong>Academic Background:</strong> ${meeting.course} - ${meeting.year}</p>
              
              <h4>Discussion Topics:</h4>
              <div class="topics">
                ${meeting.topics.map((topic: string) => `<span class="topic-tag">${topic}</span>`).join('')}
              </div>
              
              ${meeting.message ? `
                <h4>Your Message:</h4>
                <p style="font-style: italic; background: #f1f3f4; padding: 10px; border-radius: 4px;">"${meeting.message}"</p>
              ` : ''}
            </div>
            
            <div class="important-note">
              <h4>⚠️ Important Instructions:</h4>
              <ul>
                <li>Please arrive 10 minutes early</li>
                <li>Bring your resume and any specific questions</li>
                <li>Meeting location details will be shared 24 hours before the session</li>
                <li>If you need to reschedule, please contact us at least 48 hours in advance</li>
              </ul>
            </div>
            
            <p>We look forward to helping you with your career planning. Director Sanjay Zawar is excited to discuss your career goals and provide valuable guidance.</p>
            
            <p>If you have any questions or need to make changes, please don't hesitate to contact us.</p>
            
            <p>Best regards,<br>
            <strong>Career Counseling Team</strong><br>
            Director Sanjay Zawar's Office</p>
          </div>
          
          <div class="footer">
            <p>This is an automated confirmation email. Please save this email for your records.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

const getDeclineEmailTemplate = (meeting: any) => {
  return {
    subject: '📅 Meeting Request - Rescheduling Required',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); color: #8b4513; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .meeting-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107; }
          .alternative-times { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .time-slot { background: white; padding: 10px; margin: 5px 0; border-radius: 4px; border-left: 3px solid #28a745; }
          .reschedule-note { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📅 Rescheduling Required</h1>
            <p>Let's find a better time for your session</p>
          </div>
          
          <div class="content">
            <p>Dear <strong>${meeting.name}</strong>,</p>
            
            <p>Thank you for your interest in scheduling a career counseling session with <strong>Director Sanjay Zawar</strong>.</p>
            
            <p>Unfortunately, the requested time slot is not available due to scheduling conflicts. However, we'd love to find an alternative time that works for both you and the Director.</p>
            
            <div class="meeting-details">
              <h3>📋 Your Original Request</h3>
              <p><strong>Requested Date:</strong> ${new Date(meeting.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Requested Time:</strong> ${meeting.preferredTime}</p>
              <p><strong>Student:</strong> ${meeting.name} (${meeting.course} - ${meeting.year})</p>
            </div>
            
            <div class="reschedule-note">
              <h4>📝 How to Reschedule:</h4>
              <ol>
                <li>Visit our meeting scheduler again using the same link</li>
                <li>Select one of the available time slots mentioned above</li>
                <li>Submit your request with the new preferred time</li>
                <li>You'll receive a confirmation email within 24 hours</li>
              </ol>
            </div>
            
            <p>We apologize for any inconvenience and appreciate your understanding. Director Sanjay Zawar is committed to providing quality career guidance to all students, and we want to ensure you get the dedicated time you deserve.</p>
            
            <p><strong>Your topics of interest:</strong> ${meeting.topics.join(', ')}</p>
            
            <p>Please reschedule at your earliest convenience, and we'll make sure to accommodate your session.</p>
            
            <p>Best regards,<br>
            <strong>Career Counseling Team</strong><br>
            Director Sanjay Zawar's Office</p>
          </div>
          
          <div class="footer">
            <p>Need help rescheduling? Contact us directly and we'll assist you in finding the perfect time slot.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { meetingId, action } = await req.json();

    if (!meetingId || !action) {
      return NextResponse.json(
        { message: "Missing meetingId or action" },
        { status: 400 }
      );
    }

    // Fetch meeting details
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return NextResponse.json(
        { message: "Meeting not found" },
        { status: 404 }
      );
    }

    // Prepare email content based on action
    let emailTemplate;
    if (action === 'approve') {
      emailTemplate = getApprovalEmailTemplate(meeting);
    } else if (action === 'decline') {
      emailTemplate = getDeclineEmailTemplate(meeting);
    } else {
      return NextResponse.json(
        { message: "Invalid action. Use 'approve' or 'decline'" },
        { status: 400 }
      );
    }

    // Send email
    const mailOptions = {
      from: {
        name: 'Director Sanjay Zawar - Career Counseling',
        address: process.env.EMAIL_USER || 'your-email@example.com'
      },
      to: meeting.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        message: `Email sent successfully to ${meeting.email}`,
        action: action,
        recipient: meeting.email
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        message: 'Failed to send email', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}