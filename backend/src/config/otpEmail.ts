export const otpEmailTemplate = (
  otp: string,
  to?: string,
  expiresInMinutes: number = 5,
): string => {
  const recipient = to || "there";
  const year = new Date().getFullYear();
  const appName = "ProjectAPI";
  const digits = otp.replace(/\s+/g, "").split("");
  const spaced = digits.join("&nbsp;"); // visual spacing that survives email clients

  // expiry strip — one segment per minute
  const totalSegments = Math.max(expiresInMinutes, 1);
  const segments = Array.from({ length: totalSegments })
    .map(
      (_, i) =>
        `<td style="padding:0 2px;"><div style="height:6px;border-radius:3px;background:${
          i < totalSegments - 1 ? "#4ADE80" : "#1f2937"
        };"></div></td>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Your ${appName} verification code</title>

  <!-- Preheader (hidden preview text) -->
  <style>
    .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; }
    @media (prefers-color-scheme: dark) {
      .dm-bg { background:#0A0A0A !important; }
      .dm-card { background:#141414 !important; }
      .dm-ink { color:#FFFBF4 !important; }
      .dm-ink-soft { color:#D8CFBC !important; }
      .dm-ink-mute { color:#8A8578 !important; }
      .dm-otp-box { background:#0D0D0D !important; border-color:#262626 !important; }
      .dm-hairline { background:#262626 !important; }
    }
  </style>
</head>

<body class="dm-bg" style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <div class="preheader">
    Your ${appName} verification code is ${otp}. Expires in ${expiresInMinutes} minutes.
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-card" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06),0 20px 40px -20px rgba(0,0,0,0.15);">

          <!-- ───────── Accent top hairline ───────── -->
          <tr>
            <td style="height:4px;line-height:4px;font-size:0;background:linear-gradient(90deg,#4ADE80,#22D3EE,#4ADE80);">&nbsp;</td>
          </tr>

          <!-- ───────── Header ───────── -->
          <tr>
            <td style="padding:32px 36px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="vertical-align:middle;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="vertical-align:middle;padding-right:10px;">
                          <span style="display:inline-block;width:32px;height:32px;line-height:32px;text-align:center;background:#4ADE80;color:#0A0A0A;font-weight:800;border-radius:10px;font-size:16px;">P</span>
                        </td>
                        <td style="vertical-align:middle;">
                          <span class="dm-ink" style="color:#111827;font-size:15px;font-weight:700;letter-spacing:-0.2px;">${appName}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block;padding:5px 10px;border-radius:999px;background:#4ADE8015;color:#22A05C;font-size:11px;font-weight:600;letter-spacing:0.3px;text-transform:uppercase;">
                      Security
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ───────── Headline ───────── -->
          <tr>
            <td style="padding:20px 36px 0;">
              <h1 class="dm-ink" style="margin:0;color:#0A0A0A;font-size:26px;line-height:1.25;font-weight:700;letter-spacing:-0.4px;">
                Verify your email
              </h1>
              <p class="dm-ink-soft" style="margin:10px 0 0;color:#4b5563;font-size:14.5px;line-height:1.6;">
                Hi <strong class="dm-ink" style="color:#111827;">${recipient}</strong> — use the code below to finish setting up your ${appName} account.
              </p>
            </td>
          </tr>

          <!-- ───────── OTP block (copy-friendly) ───────── -->
          <tr>
            <td style="padding:26px 36px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-otp-box" style="background:#0A0A0A;border-radius:16px;border:1px solid #1f2937;">
                <tr>
                  <td style="padding:24px 20px 20px;text-align:center;">
                    <p class="dm-ink-mute" style="margin:0 0 12px;color:#9ca3af;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;font-weight:600;">
                      Your one-time code
                    </p>

                    <!-- Big selectable digits -->
                    <div style="user-select:all;-webkit-user-select:all;-ms-user-select:all;-moz-user-select:all;display:inline-block;">
                      <span style="font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,'Courier New',monospace;color:#FFFBF4;font-size:38px;font-weight:800;letter-spacing:6px;line-height:1.1;">${spaced}</span>
                    </div>

                    <!-- Copy hint -->
                    <p class="dm-ink-mute" style="margin:14px 0 0;color:#8A8578;font-size:11.5px;line-height:1.5;">
                      Tap &amp; hold the code to copy — or select all and paste.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ───────── Expiry strip ───────── -->
          <tr>
            <td style="padding:22px 36px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:10px;width:16px;">
                    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#4ADE80;box-shadow:0 0 0 4px #4ADE8022;"></span>
                  </td>
                  <td class="dm-ink-soft" style="vertical-align:middle;color:#4b5563;font-size:13px;line-height:1.5;">
                    Expires in <strong class="dm-ink" style="color:#111827;">${expiresInMinutes} minute${expiresInMinutes === 1 ? "" : "s"}</strong>
                  </td>
                </tr>
              </table>

              <!-- visual countdown strip: one segment per minute -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
                <tr>${segments}</tr>
              </table>
            </td>
          </tr>

          <!-- ───────── Divider ───────── -->
          <tr>
            <td style="padding:24px 36px 0;">
              <div class="dm-hairline" style="height:1px;background:#e5e7eb;"></div>
            </td>
          </tr>

          <!-- ───────── Safety note ───────── -->
          <tr>
            <td style="padding:18px 36px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#fafafa;border-radius:12px;border:1px solid #f0f0f1;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p class="dm-ink" style="margin:0 0 4px;color:#111827;font-size:12.5px;font-weight:600;">
                      Didn't request this?
                    </p>
                    <p class="dm-ink-soft" style="margin:0;color:#6b7280;font-size:12px;line-height:1.55;">
                      You can safely ignore this email. The code will expire on its own, and no changes will be made to your account.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ───────── Footer ───────── -->
          <tr>
            <td style="padding:24px 36px 32px;">
              <p class="dm-ink-mute" style="margin:0;color:#9ca3af;font-size:11.5px;line-height:1.6;text-align:center;">
                This is an automated message from <strong class="dm-ink-soft" style="color:#6b7280;">${appName}</strong>.<br/>
                Replies to this address are not monitored.
              </p>
              <p class="dm-ink-mute" style="margin:14px 0 0;color:#c7c9ce;font-size:11px;line-height:1.6;text-align:center;">
                © ${year} ${appName}. All rights reserved.
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