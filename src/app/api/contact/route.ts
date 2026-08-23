import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let emailDispatched = false;
    let crmDispatched = false;

    // 1. Dispatch to Aneevarp CRM Inbound Webhook (Triggers WhatsApp & HubSpot Sync)
    try {
      const crmEndpoints = [
        'http://127.0.0.1:5000/api/inbound-lead',
        'http://localhost:5000/api/inbound-lead',
        'https://ai-sales-agent.onrender.com/api/inbound-lead',
        'https://aneevarp-crm.onrender.com/api/inbound-lead'
      ];
      for (const endpoint of crmEndpoints) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              product: 'ZenScout AI',
              name,
              email,
              message,
              type: 'contact_and_support'
            }),
            signal: AbortSignal.timeout(3000)
          });
          if (res.ok) {
            crmDispatched = true;
            break; // Stop after first successful delivery
          }
        } catch {
          // Try next CRM endpoint
        }
      }
    } catch (crmErr) {
      console.warn('Aneevarp CRM dispatch notice:', crmErr);
    }

    // 2. Optional Gmail SMTP transport (if env vars exist)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: 'aneevarpsolutions@gmail.com',
          replyTo: email,
          subject: `New Contact Form Submission from ${name} [ZenScout AI]`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <h3>New Contact Form Submission (ZenScout AI)</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br />')}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailDispatched = true;
      } catch (smtpErr) {
        console.warn('SMTP Send error, continuing with CRM pipeline:', smtpErr);
      }
    }

    // Always succeed if either CRM or basic ingestion processed
    return NextResponse.json(
      { message: 'Message sent successfully', crmDispatched, emailDispatched },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Failed to process message:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
