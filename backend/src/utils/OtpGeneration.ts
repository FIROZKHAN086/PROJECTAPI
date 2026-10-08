


export async function generateOtp() {
    // 6 digit OTP generation
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();   
  return otpCode;
}