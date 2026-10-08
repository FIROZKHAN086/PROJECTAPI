export const welcomeEmailTemplate = (
  name?: string,
  ctaUrl: string = process.env.APP_LINK || "https://projectapi.firozkhan.site/",
  ctaLabel: string = "Open your dashboard",
): string => {
  const recipient = name || "there";
  const year = new Date().getFullYear();
  const appName = "ProjectAPI";

  const steps = [
    {
      n: "01",
      title: "Create your first project",
      body: "Spin up a project in seconds — pick a template or start from scratch.",
    },
    {
      n: "02",
      title: "Wire up your API keys",
      body: "Generate keys from the dashboard and drop them into your app.",
    },
    {
      n: "03",
      title: "Ship something cool",
      body: "Deploy, share, and iterate. We'll be here if you get stuck.",
    },
  ];

  const stepsHtml = steps
    .map(
      (s, i) => `
        <tr>
          <td style="padding:${i === 0 ? "0" : "14px"} 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-step" style="background:#fafafa;border:1px solid #f0f0f1;border-radius:12px;">
              <tr>
                <td style="width:44px;vertical-align:top;padding:16px 0 16px 16px;">
                  <span style="display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;background:#4ADE8015;color:#22A05C;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:11.5px;font-weight:700;border-radius:9px;">${s.n}</span>
                </td>
                <td style="vertical-align:top;padding:16px 16px 16px 12px;">
                  <p class="dm-ink" style="margin:0 0 3px;color:#111827;font-size:13.5px;font-weight:700;letter-spacing:-0.1px;">${s.title}</p>
                  <p class="dm-ink-soft" style="margin:0;color:#6b7280;font-size:12.5px;line-height:1.55;">${s.body}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>`,
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
  <title>Welcome to ${appName}</title>

  <style>
    .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; }
    @media (prefers-color-scheme: dark) {
      .dm-bg { background:#0A0A0A !important; }
      .dm-card { background:#141414 !important; }
      .dm-ink { color:#FFFBF4 !important; }
      .dm-ink-soft { color:#D8CFBC !important; }
      .dm-ink-mute { color:#8A8578 !important; }
      .dm-step { background:#0D0D0D !important; border-color:#262626 !important; }
      .dm-hairline { background:#262626 !important; }
      .dm-note { background:#0D0D0D !important; border-color:#262626 !important; }
      .dm-btn { color:#0A0A0A !important; }
    }
  </style>
</head>

<body class="dm-bg" style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <div class="preheader">
    Welcome to ${appName}, ${recipient} — here are three quick steps to get started.
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
                      Welcome
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ───────── Headline ───────── -->
          <tr>
            <td style="padding:20px 36px 0;">
              <h1 class="dm-ink" style="margin:0;color:#0A0A0A;font-size:28px;line-height:1.22;font-weight:700;letter-spacing:-0.5px;">
                You're in, ${recipient} 🎉
              </h1>
              <p class="dm-ink-soft" style="margin:12px 0 0;color:#4b5563;font-size:15px;line-height:1.65;">
                Thanks for joining ${appName}. We built this to make shipping API-backed products feel effortless — here are three quick steps to get you moving.
              </p>
            </td>
          </tr>

          <!-- ───────── Steps ───────── -->
          <tr>
            <td style="padding:26px 36px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${stepsHtml}
              </table>
            </td>
          </tr>

          <!-- ───────── Primary CTA ───────── -->
          <tr>
            <td style="padding:26px 36px 0;" align="center">
              <a href="${ctaUrl}" class="dm-btn" style="display:inline-block;padding:14px 26px;border-radius:12px;background:#4ADE80;color:#0A0A0A;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:-0.1px;">
                ${ctaLabel} &nbsp;→
              </a>
              <p class="dm-ink-mute" style="margin:12px 0 0;color:#9ca3af;font-size:11.5px;line-height:1.5;">
                Or paste this into your browser:<br/>
                <span style="color:#6b7280;word-break:break-all;">${ctaUrl}</span>
              </p>
            </td>
          </tr>

          <!-- ───────── Divider ───────── -->
          <tr>
            <td style="padding:26px 36px 0;">
              <div class="dm-hairline" style="height:1px;background:#e5e7eb;"></div>
            </td>
          </tr>

          <!-- ───────── Help note ───────── -->
          <tr>
            <td style="padding:18px 36px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-note" style="background:#fafafa;border-radius:12px;border:1px solid #f0f0f1;">
                <tr>
                  <td style="padding:16px;">
                    <p class="dm-ink" style="margin:0 0 4px;color:#111827;font-size:13px;font-weight:700;">
                      Need a hand?
                    </p>
                    <p class="dm-ink-soft" style="margin:0;color:#6b7280;font-size:12.5px;line-height:1.6;">
                      Reply to this email or head to the support console inside your dashboard — a real human reads every message.
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
                You're receiving this because you signed up for ${appName}.<br/>
                If this wasn't you, you can ignore this email.
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