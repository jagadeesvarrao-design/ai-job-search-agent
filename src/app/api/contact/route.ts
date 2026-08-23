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
    let whatsappDispatched = false;
    let crmDispatched = false;

    // Load from process.env (secured without hardcoded secrets in source files)
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const recipientEmail = process.env.CRM_TEAM_EMAIL || 'aneevarpsolutions@gmail.com';

    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const fromWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER || '+14155238886';
    const toWhatsApp = process.env.CRM_HEAD_WHATSAPP_NUMBER || '+918790906267';

    // 1. Direct High-Priority Email Dispatch via Nodemailer (Gmail SMTP)
    try {
      if (gmailUser && gmailPass) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        const mailOptions = {
          from: `"ZenScout AI Support" <${gmailUser}>`,
          to: recipientEmail,
          replyTo: email,
          subject: `[ZenScout AI] New Inbound Inquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fafc; color: #1e293b; padding: 24px;">
              <div style="background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; max-width: 600px; margin: auto; padding: 28px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <div style="border-bottom: 2px solid #00685F; padding-bottom: 16px; margin-bottom: 20px;">
                  <h2 style="margin: 0; color: #00685F; font-size: 20px;">ZenScout AI — New Inbound Message</h2>
                  <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">Aneevarp Solutions Operations Hub</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: bold; width: 30%;">Sender Name:</td>
                    <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: bold;">Sender Email:</td>
                    <td style="padding: 8px 0; color: #00685F; font-size: 14px; font-weight: 600;"><a href="mailto:${email}" style="color: #00685F; text-decoration: none;">${email}</a></td>
                  </tr>
                </table>

                <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 8px;">Message:</div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; font-size: 14px; line-height: 1.6; color: #1e293b;">
                  ${message.replace(/\n/g, '<br />')}
                </div>

                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; text-align: center; font-size: 11px; color: #94a3b8;">
                  Delivered automatically by ZenScout AI • Aneevarp Solutions
                </div>
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailDispatched = true;
      }
    } catch (smtpErr) {
      console.error('Direct SMTP Error:', smtpErr);
    }

    // 2. Direct Instant WhatsApp Alert via Twilio REST API
    try {
      if (twilioSid && twilioToken && fromWhatsApp && toWhatsApp) {
        const fromFormatted = fromWhatsApp.startsWith('whatsapp:') ? fromWhatsApp : `whatsapp:${fromWhatsApp}`;
        const toFormatted = toWhatsApp.startsWith('whatsapp:') ? toWhatsApp : `whatsapp:${toWhatsApp}`;

        const whatsappBody = `🚨 *New ZenScout AI Inquiry*\n\n👤 *From:* ${name}\n📧 *Email:* ${email}\n💬 *Message:* "${message.substring(0, 300)}"\n\n🔗 *Reply:* mailto:${email}`;

        const authHeader = 'Basic ' + Buffer.from(`${twilioSid}:${twilioToken}`).toString('base64');
        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;

        const twilioParams = new URLSearchParams();
        twilioParams.append('From', fromFormatted);
        twilioParams.append('To', toFormatted);
        twilioParams.append('Body', whatsappBody);

        const twilioRes = await fetch(twilioUrl, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: twilioParams.toString(),
        });

        if (twilioRes.ok) {
          whatsappDispatched = true;
        } else {
          const errData = await twilioRes.json();
          console.warn('Twilio WhatsApp dispatch notice:', errData);
        }
      }
    } catch (waErr) {
      console.error('Direct WhatsApp Dispatch Error:', waErr);
    }

    // 3. Fallback Dispatch to External Aneevarp CRM if available
    try {
      const crmEndpoints = [
        'http://127.0.0.1:5000/api/inbound-lead',
        'http://localhost:5000/api/inbound-lead',
        'https://ai-sales-agent.onrender.com/api/inbound-lead'
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
            signal: AbortSignal.timeout(2000)
          });
          if (res.ok) {
            crmDispatched = true;
            break;
          }
        } catch {
          // Continue to next endpoint
        }
      }
    } catch (crmErr) {
      console.warn('CRM Dispatch Notice:', crmErr);
    }

    return NextResponse.json(
      { 
        message: 'Message processed successfully', 
        emailDispatched, 
        whatsappDispatched, 
        crmDispatched 
      },
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
