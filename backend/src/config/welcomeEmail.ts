/** Escape user-supplied strings before they touch the HTML. */
const esc = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const welcomeEmailTemplate = (
  name?: string,
  ctaUrl: string = process.env.APP_LINK || "https://projectapi.firozkhan.site/",
  ctaLabel: string = "Open your dashboard",
): string => {
  const recipient = esc(name?.trim() || "there");
  const year = new Date().getFullYear();
  const appName = "ProjectAPI";

  const href = esc(ctaUrl);
  const label = esc(ctaLabel);
  const btnWidth = Math.max(210, ctaLabel.length * 10 + 70);

  /* font stacks — web fonts load in Apple Mail / iOS; others fall back gracefully */
  const display = "'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif";
  const body = "'Inter','Helvetica Neue',Helvetica,Arial,sans-serif";
  const mono = "'JetBrains Mono','SFMono-Regular',Menlo,Consolas,monospace";

  const steps = [
    {
      n: "01",
      title: "Create your first project",
      text: "Add a title, a cover image, and your live demo and GitHub links.",
    },
    {
      n: "02",
      title: "Grab your API key",
      text: "Copy it from the API tab. It's all you need to read your work from anywhere.",
    },
    {
      n: "03",
      title: "Call it from your portfolio",
      text: "Fetch, Axios, a React hook or Next.js — ready-made snippets are waiting in the playground.",
    },
  ];

  const stepRows = steps
    .map(
      (s) => `
            <tr>
              <td style="padding:0 0 12px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-step" bgcolor="#FBF7EE" style="background:#FBF7EE;border:1px solid #E8E0CF;border-radius:14px;">
                  <tr>
                    <td width="64" valign="top" style="padding:20px 0 20px 20px;font-family:${mono};font-size:20px;font-weight:700;line-height:1;color:#FF8A4C;">${s.n}</td>
                    <td valign="top" style="padding:20px 20px 20px 4px;">
                      <div class="dm-ink" style="font-family:${display};font-size:17px;font-weight:700;line-height:1.3;letter-spacing:-0.2px;color:#14110C;">${s.title}</div>
                      <div class="dm-ink-soft" style="margin-top:6px;font-family:${body};font-size:14px;line-height:1.6;color:#4A443A;">${s.text}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Welcome to ${appName}</title>
  <!--[if mso]>
  <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  <![endif]-->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
  <style>
    body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
    table, td { mso-table-lspace:0; mso-table-rspace:0; }
    img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
    body { margin:0; padding:0; width:100% !important; }
    a { text-decoration:none; }

    @media (max-width:620px) {
      .container { width:100% !important; }
      .px { padding-left:24px !important; padding-right:24px !important; }
      .h1 { font-size:38px !important; line-height:1.06 !important; letter-spacing:-1.2px !important; }
      .ghost { font-size:40px !important; }
      .hide-sm { display:none !important; }
    }

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
      .dm-border { border-color:#262626 !important; }
      .dm-ghost { color:#1F1F1F !important; }
    }
    /* Outlook.com / Outlook app dark mode */
    [data-ogsc] .dm-bg { background:#0A0A0A !important; }
    [data-ogsc] .dm-card { background:#141414 !important; }
    [data-ogsc] .dm-ink { color:#FFFBF4 !important; }
    [data-ogsc] .dm-ink-soft { color:#D8CFBC !important; }
    [data-ogsc] .dm-ink-mute { color:#8A8578 !important; }
    [data-ogsc] .dm-step, [data-ogsc] .dm-note { background:#0D0D0D !important; border-color:#262626 !important; }
    [data-ogsc] .dm-hairline { background:#262626 !important; }
    [data-ogsc] .dm-btn { color:#0A0A0A !important; }
    [data-ogsc] .dm-border { border-color:#262626 !important; }
    [data-ogsc] .dm-ghost { color:#1F1F1F !important; }
  </style>
</head>
<body class="dm-bg" style="margin:0;padding:0;background:#FFFBF4;">

  <!-- preheader (inbox preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;font-size:1px;line-height:1px;color:#FFFBF4;">
    Your account is ready. Three steps and your portfolio is live on the API.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-bg" bgcolor="#FFFBF4" style="background:#FFFBF4;">
    <tr>
      <td align="center" style="padding:32px 12px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="container dm-card dm-border" bgcolor="#FFFFFF" style="width:600px;max-width:600px;background:#FFFFFF;border:1px solid #EAE3D3;border-radius:20px;">

          <!-- top bar -->
          <tr>
            <td class="px" style="padding:28px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" valign="middle">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="30" height="30" align="center" valign="middle" bgcolor="#FF8A4C" style="width:30px;height:30px;background:#FF8A4C;border-radius:8px;font-family:${mono};font-size:13px;font-weight:700;line-height:30px;color:#0A0A0A;">{}</td>
                        <td style="padding-left:10px;font-family:${display};font-size:18px;font-weight:700;letter-spacing:-0.3px;color:#14110C;" class="dm-ink">${appName}</td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle" class="dm-ink-mute" style="font-family:${mono};font-size:11px;color:#8A8578;">
                    <span style="color:#7FBF97;">&#9679;</span>&nbsp;all systems online
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- hero -->
          <tr>
            <td class="px" style="padding:44px 40px 0 40px;">
              <div style="font-family:${mono};font-size:12px;letter-spacing:0.4px;color:#FF8A4C;">// welcome</div>
              <h1 class="h1 dm-ink" style="margin:14px 0 0 0;font-family:${display};font-size:52px;font-weight:700;line-height:1.02;letter-spacing:-2px;color:#14110C;">
                Welcome aboard,<br />${recipient}<span style="color:#FF8A4C;">.</span>
              </h1>
              <p class="dm-ink-soft" style="margin:20px 0 0 0;max-width:460px;font-family:${body};font-size:16px;line-height:1.65;color:#4A443A;">
                Your ${appName} account is ready. Manage your projects in one place and expose them to any portfolio through a clean public REST API.
              </p>
            </td>
          </tr>

          <!-- terminal -->
          <tr>
            <td class="px" style="padding:32px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0A0A0A" style="background:#0A0A0A;border:1px solid #262626;border-radius:14px;">
                <tr>
                  <td style="padding:14px 18px;border-bottom:1px solid #262626;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="left" style="font-family:${mono};font-size:11px;color:#8A8578;">
                          <span style="color:#3A3A3A;">&#9679;&nbsp;&#9679;&nbsp;&#9679;</span>&nbsp;&nbsp;playground
                        </td>
                        <td align="right" style="font-family:${mono};font-size:11px;color:#7FBF97;">200 OK</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 18px 20px 18px;font-family:${mono};font-size:12.5px;line-height:1.75;color:#D8CFBC;">
                    <span style="color:#8A8578;">// your portfolio, one request away</span><br />
                    <span style="color:#8B93FF;">GET</span> /v1/projects/<span style="color:#FF8A4C;">{apiKey}</span><br /><br />
                    <span style="color:#FFFBF4;">{</span><br />
                    &nbsp;&nbsp;<span style="color:#8B93FF;">"title"</span>: <span style="color:#FFFBF4;">"Your first project"</span>,<br />
                    &nbsp;&nbsp;<span style="color:#8B93FF;">"featured"</span>: <span style="color:#FF8A4C;">true</span><br />
                    <span style="color:#FFFBF4;">}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- steps -->
          <tr>
            <td class="px" style="padding:44px 40px 0 40px;">
              <div style="font-family:${mono};font-size:12px;letter-spacing:0.4px;color:#FF8A4C;">// next</div>
              <div class="dm-ink" style="margin:10px 0 20px 0;font-family:${display};font-size:26px;font-weight:700;line-height:1.15;letter-spacing:-0.8px;color:#14110C;">Live in three steps.</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${stepRows}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td class="px" align="left" style="padding:20px 40px 0 40px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:52px;v-text-anchor:middle;width:${btnWidth}px;" arcsize="24%" stroke="f" fillcolor="#FF8A4C">
                <w:anchorlock/>
                <center style="color:#0A0A0A;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">${label} &rarr;</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-->
              <a href="${href}" target="_blank" class="dm-btn" style="display:inline-block;background:#FF8A4C;color:#0A0A0A;font-family:${display};font-size:15px;font-weight:700;line-height:52px;letter-spacing:-0.1px;text-align:center;text-decoration:none;border-radius:12px;padding:0 28px;">${label}&nbsp;&nbsp;&rarr;</a>
              <!--<![endif]-->
              <div class="dm-ink-mute" style="margin-top:14px;font-family:${mono};font-size:11px;line-height:1.6;color:#8A8578;word-break:break-all;">
                or paste this link: ${href}
              </div>
            </td>
          </tr>

          <!-- tip -->
          <tr>
            <td class="px" style="padding:32px 40px 0 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-note" bgcolor="#FFF4EA" style="background:#FFF4EA;border:1px solid #FFD9BF;border-radius:14px;">
                <tr>
                  <td style="padding:18px 20px;font-family:${body};font-size:14px;line-height:1.65;color:#4A443A;" class="dm-ink-soft">
                    <span style="font-family:${mono};font-size:12px;font-weight:700;color:#FF8A4C;">tip &rarr;</span>&nbsp;
                    Use the API playground on your dashboard to test requests and copy ready-made snippets before you ship.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ghost wordmark + footer -->
          <tr>
            <td class="px" style="padding:44px 40px 0 40px;">
              <div class="ghost dm-ghost" style="font-family:${display};font-size:68px;font-weight:700;line-height:1;letter-spacing:-3px;color:#F1EBDD;">${appName}</div>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:20px 40px 0 40px;">
              <div class="dm-hairline" style="height:1px;line-height:1px;font-size:1px;background:#E8E0CF;">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td class="px" style="padding:20px 40px 32px 40px;">
              <div class="dm-ink-mute" style="font-family:${mono};font-size:11px;line-height:1.8;color:#8A8578;">
                &copy; ${year} ${appName}. Built for developers who ship.<br />
                You're receiving this because you created a ${appName} account.
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
};