export const verificationEmailTemplate = (
  generateVerificationCode,
  fullname
) => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    "
  >
    <table role="presentation" style="width: 100%; border-collapse: collapse">
      <tr>
        <td
          style="padding: 20px 0; text-align: center; background-color: #ffffff"
        >
          <table
            role="presentation"
            style="
              width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            "
          >
            <tr>
              <td style="padding: 40px 30px">
                <!-- Logo -->
                <h2>Expense Tracker Verification Email</h2>

                <!-- Header -->
                <h3 style="color: #333333; font-size: 24px; margin: 0 0 20px 0">
                  Verify Your Email Address
                </h3>

                <!-- Main Content -->
                <p
                  style="
                    color: #666666;
                    font-size: 16px;
                    line-height: 1.5;
                    margin: 0 0 20px 0;
                  "
                >
                    Hi, ${fullname} <br/>
                  Thank you for signing up! Please use the verification code
                  below to complete your registration:
                </p>

                <!-- Verification Code Box -->
                <div
                  style="
                    background-color: #f8f8f8;
                    padding: 20px;
                    border-radius: 6px;
                    margin: 30px 0;
                  "
                >
                  <p
                    style="
                      color: #333333;
                      font-size: 32px;
                      font-weight: bold;
                      margin: 0;
                      letter-spacing: 5px;
                    "
                  >
                    ${generateVerificationCode}
                  </p>
                </div>

                <!-- Additional Information -->
                <p
                  style="
                    color: #666666;
                    font-size: 16px;
                    line-height: 1.5;
                    margin: 0 0 20px 0;
                  "
                >
                  This code will expire in 10 minutes. If you didn't request
                  this verification, please ignore this email.
                </p>

                <!-- Footer -->
                <p style="color: #999999; font-size: 14px; margin: 40px 0 0 0">
                  Best regards,<br />
                  From Expense Tracker
                </p>
              </td>
            </tr>
          </table>

          <!-- Footer Links -->
          <table role="presentation" style="width: 600px; margin: 20px auto 0">
            <tr>
              <td
                style="
                  padding: 20px;
                  text-align: center;
                  color: #999999;
                  font-size: 12px;
                "
              >
                <p style="margin: 0 0 10px 0">
                  This is an automated message, please do not reply to this
                  email.
                </p>
                <p style="margin: 0">
                  © 2025 Expense Tracker. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `;
};
