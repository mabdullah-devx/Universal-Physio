const { BrevoClient } = require('@getbrevo/brevo');

/**
 * Send Automated Appointment Confirmation Email via Brevo to Patient & Admin
 */
async function sendBookingConfirmationEmail(booking) {
  if (!booking || !booking.email) {
    console.log('Skipping email send: No patient email address provided.');
    return;
  }

  const key = (process.env.BREVO_API_KEY || '').trim();
  if (!key) {
    console.error('Brevo Email Warning: BREVO_API_KEY environment variable is not defined.');
    return;
  }

  const senderEmail = (process.env.SENDER_EMAIL || 'info@universalphysio.fit').trim();
  const senderName = (process.env.SENDER_NAME || 'Universal Physio Care').trim();

  const patientName = booking.name || 'Patient';
  const serviceName = booking.service || 'Physical Therapy Session';
  const bookingDate = booking.booking_date || booking.date || 'Scheduled Date';
  const bookingTime = booking.booking_time || booking.time || 'Scheduled Time';
  const address = booking.address || '';
  const area = booking.area || 'Lahore';

  const patientHtml = `
    <div style="font-family: Arial, sans-serif; color: #2C3E2D; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #E5EADF; border-radius: 16px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #2C3E2D; margin: 0; font-size: 24px;">Universal Physio Care</h1>
        <p style="color: #5C6F52; font-size: 14px; margin: 4px 0 0 0;">Doctor of Physical Therapy Home Care • Lahore</p>
      </div>

      <h2 style="color: #5C6F52; font-size: 18px; margin-top: 0; border-bottom: 2px solid #F0F4EC; padding-bottom: 10px;">
        Appointment Request Received! 🩺✨
      </h2>
      <p style="font-size: 15px; line-height: 1.5;">Hello <strong>${patientName}</strong>,</p>
      <p style="font-size: 15px; line-height: 1.5;">Your home physical therapy session request with Universal Physio Care has been successfully received.</p>
      
      <div style="background-color: #FDFBF9; padding: 18px; border-radius: 12px; border: 1px solid #F0F4EC; margin: 20px 0;">
        <h4 style="margin: 0 0 12px 0; color: #2C3E2D; font-size: 15px;">📋 Appointment Details</h4>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Service:</strong> ${serviceName}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Date:</strong> ${bookingDate}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Time:</strong> ${bookingTime}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Location:</strong> ${address} (${area})</p>
      </div>

      <p style="font-size: 14px; color: #3E4F37; line-height: 1.5;">
        👨‍⚕️ Our certified Doctor of Physical Therapy (DPT) will review your request and contact you shortly via phone or WhatsApp.
      </p>
      
      <p style="font-size: 13px; color: #5C6F52; background-color: #F4F7F2; padding: 10px 14px; border-radius: 8px;">
        💡 <strong>Tip:</strong> Please wear comfortable clothing suitable for physical assessment.
      </p>

      <hr style="border: none; border-top: 1px solid #E5EADF; margin: 24px 0;" />
      <p style="font-size: 12px; color: #8BA17E; text-align: center; margin: 0;">
        Universal Physio Care • Certified Home Visit Services<br />
        📞 Contact: +92 3064954970 | ✉️ info@universalphysio.fit
      </p>
    </div>
  `;

  try {
    const brevo = new BrevoClient({ apiKey: key });
    
    // 1. Send confirmation to Patient
    const responsePatient = await brevo.transactionalEmails.sendTransacEmail({
      subject: `Appointment Request Received - Universal Physio Care`,
      sender: { name: senderName, email: senderEmail },
      to: [{ email: booking.email, name: patientName }],
      htmlContent: patientHtml
    });
    console.log('✅ Brevo Email sent to patient:', booking.email, responsePatient);

    // 2. Send notification to Admin Email
    const adminHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h3>🔔 New Appointment Booking Received!</h3>
        <p><strong>Patient:</strong> ${patientName} (${booking.email})</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date & Time:</strong> ${bookingDate} at ${bookingTime}</p>
        <p><strong>Address:</strong> ${address}, ${area}</p>
      </div>
    `;

    await brevo.transactionalEmails.sendTransacEmail({
      subject: `🚨 New Booking: ${patientName} - ${serviceName}`,
      sender: { name: senderName, email: senderEmail },
      to: [{ email: 'universalphysio.com@gmail.com', name: 'Physio Admin' }],
      htmlContent: adminHtml
    }).catch(e => console.log('Admin notify note:', e.message));

    return responsePatient;
  } catch (error) {
    console.error('❌ Error sending Brevo email:', error.response?.body || error.message || error);
  }
}

module.exports = {
  sendBookingConfirmationEmail
};
