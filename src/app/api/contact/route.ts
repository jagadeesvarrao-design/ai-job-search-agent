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

    // Gmail SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'support.zenresume@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    };

    // Dispatch to Aneevarp CRM Inbound Webhook (Triggers WhatsApp & HubSpot Sync)
    try {
      const crmEndpoints = [
        'http://127.0.0.1:5000/api/inbound-lead',
        'http://localhost:5000/api/inbound-lead',
        'https://ai-sales-agent.onrender.com/api/inbound-lead',
        'https://aneevarp-crm.onrender.com/api/inbound-lead'
      ];
      for (const endpoint of crmEndpoints) {
        try {
          await fetch(endpoint, {
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
          break; // Stop after first successful delivery
        } catch {
          // Try next CRM endpoint
        }
      }
    } catch (crmErr) {
      console.warn('Aneevarp CRM dispatch notice:', crmErr);
    }

    // Send the email directly as well
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
