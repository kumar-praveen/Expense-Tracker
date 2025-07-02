import { generateVerificationCode } from "./generateVerificationCode.js";
import { sendEmail } from "./sendEmail.js";
import { verificationEmailTemplate } from "./verificationEmailTemplate.js";

export const sendVerificationCode = async (
  userEmailAdd,
  fullname,
  verificationCode
) => {
  const message = verificationEmailTemplate(verificationCode, fullname);
  await sendEmail(message, "Verification Code(Expense Tracker)", userEmailAdd);
};
