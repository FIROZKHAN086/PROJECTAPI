export const otpEmailTemplate = (
  otp: string,
  to?: string,
  expiresInMinutes: number = 5,
  // Page that copies the code to the clipboard (email can't run JS, so the button opens this).
  copyPageUrl: string = `${(
    process.env.APP_LINK || "https://projectapi.firozkhan.site"
  ).replace(/\/$/, "")}/copy-code`
): string => {
  const recipient = to || "there";
  const year = new Date().getFullYear();
  const appName = "ProjectAPI";

  // strip whitespace so the code is one clean string
  const codePlain = otp.replace(/\s+/g, "");

  // The code goes in the URL *fragment* (#...), which browsers never send to the server,
  // so it doesn't end up in server logs.

  const mono =
    "'SF Mono',SFMono-Regular,Menlo,Consolas,'Courier New',monospace";

  // expiry visual — one dot per minute, filled
  const totalSegments = Math.max(expiresInMinutes, 1);
  const expiryDots = Array.from({ length: totalSegments })
    .map(
      (_, i) =>
        `<td style="padding:0 2px;"><div style="width:18px;height:5px;border-radius:3px;background:${
          i < totalSegments - 1 ? "#4ADE80" : "#1f2937"
        };"></div></td>`
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

  <style>
    .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; }

    /* Rounded corners for clients that support CSS3 */
    .rounded-lg { border-radius:12px; }
    .rounded-xl { border-radius:16px; }

    /* Mobile tightening */
    @media (max-width:520px) {
      .px { padding-left:22px !important; padding-right:22px !important; }
      .otp-text { font-size:26px !important; letter-spacing:6px !important; }
      .otp-box { padding:12px 6px 12px 14px !important; }
      .h1 { font-size:23px !important; }
    }

    @media (prefers-color-scheme: dark) {
      .dm-bg { background:#0A0A0A !important; }
      .dm-card { background:#141414 !important; }
      .dm-ink { color:#FFFBF4 !important; }
      .dm-ink-soft { color:#D8CFBC !important; }
      .dm-ink-mute { color:#8A8578 !important; }
      .dm-otp-box { background:#0D0D0D !important; border-color:#262626 !important; }
      .dm-hairline { background:#262626 !important; }
      .dm-note { background:#0D0D0D !important; border-color:#262626 !important; }
      .dm-digit { background:#07070B !important; border-color:#2a2a2a !important; }
    }
  </style>
</head>

<body class="dm-bg" style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <div class="preheader">
    Your ${appName} verification code is ${codePlain}. Expires in ${expiresInMinutes} minute${expiresInMinutes === 1 ? "" : "s"}.
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-card" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06),0 20px 40px -20px rgba(0,0,0,0.15);">

          <!-- ══════════ Accent top hairline ══════════ -->
          <tr>
            <td style="height:4px;line-height:4px;font-size:0;background:linear-gradient(90deg,#4ADE80,#22D3EE,#4ADE80);">&nbsp;</td>
          </tr>

          <!-- ══════════ Header: brand + security pill ══════════ -->
          <tr>
            <td class="px" style="padding:26px 36px 0;">
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

          <!-- ══════════ Hero ══════════ -->
          <tr>
            <td class="px" style="padding:28px 36px 0;">
              <span style="display:inline-block;padding:6px 10px;border-radius:8px;background:#4ADE8015;color:#22A05C;font-size:10.5px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">
                Email verification
              </span>
              <h1 class="h1 dm-ink" style="margin:12px 0 0;color:#0A0A0A;font-size:27px;line-height:1.22;font-weight:700;letter-spacing:-0.5px;">
                Confirm it's really you
              </h1>
              <p class="dm-ink-soft" style="margin:10px 0 0;color:#4b5563;font-size:14.5px;line-height:1.65;">
                Hi <strong class="dm-ink" style="color:#111827;">${recipient}</strong> — use the code below to finish setting up your ${appName} account.
              </p>
            </td>
          </tr>

          <!-- ══════════ OTP block ══════════ -->
          <tr>
            <td class="px" style="padding:24px 36px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-otp-box rounded-xl" style="background:#fafafa;border:1px solid #eeeef0;border-radius:16px;">
                <tr>
                  <td style="padding:26px 16px 22px;text-align:center;">

                    <p class="dm-ink-mute" style="margin:0 0 16px;color:#9ca3af;font-size:10.5px;letter-spacing:1.8px;text-transform:uppercase;font-weight:700;">
                      Your one-time code
                    </p>

                    <!-- Code: ONE text node in ONE cell, so copying never picks up tabs/spaces.
                         Visual spacing comes from letter-spacing, which is not part of the copied text.
                         user-select:all makes a single click/tap select the whole code. -->
                    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                      <tr>
                        <td class="dm-digit otp-box" align="center" style="background:#0A0A0A;border:1px solid #262626;border-radius:12px;padding:14px 10px 14px 20px;">
                          <span class="otp-text" style="-webkit-user-select:all;user-select:all;display:inline-block;white-space:nowrap;color:#FFFBF4;font-family:${mono};font-size:32px;font-weight:800;line-height:1.1;letter-spacing:10px;">${codePlain}</span>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══════════ Expiry indicator ══════════ -->
          <tr>
            <td class="px" style="padding:22px 36px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;width:16px;padding-right:10px;">
                    <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4ADE80;box-shadow:0 0 0 4px #4ADE8022;"></span>
                  </td>
                  <td class="dm-ink-soft" style="vertical-align:middle;color:#4b5563;font-size:13px;line-height:1.5;">
                    Expires in <strong class="dm-ink" style="color:#111827;">${expiresInMinutes} minute${expiresInMinutes === 1 ? "" : "s"}</strong>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
                <tr>${expiryDots}</tr>
              </table>
            </td>
          </tr>

          <!-- ══════════ Divider ══════════ -->
          <tr>
            <td class="px" style="padding:26px 36px 0;">
              <div class="dm-hairline" style="height:1px;background:#e5e7eb;"></div>
            </td>
          </tr>

          <!-- ══════════ Safety note ══════════ -->
          <tr>
            <td class="px" style="padding:20px 36px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-note" style="background:#fafafa;border-radius:12px;border:1px solid #f0f0f1;">
                <tr>
                  <td style="padding:16px;">
                    <p class="dm-ink" style="margin:0 0 5px;color:#111827;font-size:13px;font-weight:700;">
                      Didn't request this?
                    </p>
                    <p class="dm-ink-soft" style="margin:0;color:#6b7280;font-size:12.5px;line-height:1.6;">
                      You can safely ignore this email. The code expires on its own and no changes will be made to your account.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══════════ Footer ══════════ -->
          <tr>
            <td class="px" style="padding:24px 36px 32px;">
              <p class="dm-ink-mute" style="margin:0;color:#9ca3af;font-size:11.5px;line-height:1.6;text-align:center;">
                Automated message from <strong class="dm-ink-soft" style="color:#6b7280;">${appName}</strong>.<br/>
                Replies to this address aren't monitored.
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
