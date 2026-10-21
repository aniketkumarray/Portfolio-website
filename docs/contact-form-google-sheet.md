# Contact form → Google Sheet

Both contact forms (the "Drop me a line" card and the Contact section) post to
`VITE_FORM_ENDPOINT`. Pointing that at a Google Apps Script web app appends every
message to a Google Sheet — no server, no credentials in the repo.

```
Browser form ──POST (text/plain)──▶ Apps Script /exec ──appendRow()──▶ Sheet
```

Target sheet: <https://docs.google.com/spreadsheets/d/1cjl1c3Zp0yb_jAreCOHhZjoVvCX8zhPPoM08wewi3rM/edit>

## 1. Open the script editor

Open the sheet above → **Extensions → Apps Script**. This binds the script to the
sheet, so it can use `getActiveSpreadsheet()` without a sheet ID.

## 2. Paste the script

Replace the default `Code.gs` contents with:

```js
/** Tab that receives the messages. Rename your existing tab to "Leads" or change this. */
const SHEET_NAME = 'Leads'

/** Optional: get an email per enquiry. Leave empty to disable. */
const NOTIFY_EMAIL = ''

function setup() {
  const sheet = getSheet_()
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message', 'Source'])
    sheet.getRange('A1:E1').setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
}

function doPost(e) {
  try {
    const data = parse_(e)
    if (!data.email || !data.message) {
      return json_({ ok: false, error: 'email and message are required' })
    }

    // Honeypot: bots fill this, humans never see it. Accept silently.
    if (data.company) return json_({ ok: true })

    getSheet_().appendRow([
      new Date(),
      data.name || '',
      data.email,
      data.message,
      data.source || '',
    ])

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        `Portfolio message from ${data.name || data.email}`,
        `${data.message}\n\n— ${data.name || ''} (${data.email})`,
      )
    }

    return json_({ ok: true })
  } catch (err) {
    console.error(err)
    return json_({ ok: false, error: String(err) })
  }
}

/** Health check: open the /exec URL in a browser and you should see {"ok":true}. */
function doGet() {
  return json_({ ok: true, service: 'portfolio-contact' })
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME)
}

function parse_(e) {
  const raw = (e && e.postData && e.postData.contents) || ''
  try {
    return JSON.parse(raw)
  } catch (_) {
    return Object.fromEntries(new URLSearchParams(raw))
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}
```

## 3. Run the setup once

In the editor select **setup** in the function dropdown → **Run**. Authorise the
scopes when prompted (Sheets + Gmail if you set `NOTIFY_EMAIL`). This creates the
`Leads` tab with headers.

## 4. Deploy as a web app

1. **Deploy → New deployment**
2. Type: **Web app**
3. Description: `Portfolio contact form`
4. **Execute as: Me**
5. **Who has access: Anyone** — not "Anyone with a Google account", because visitors are not signed in
6. **Deploy**, then copy the **Web app URL** (ends in `/exec`)

> After any later script edit: **Deploy → Manage deployments → edit (pencil) → Version: New version → Deploy**.

## 5. Set the endpoint

**Locally** — create `.env` from `.env.example` and set:

```dotenv
VITE_FORM_ENDPOINT=https://script.google.com/macros/s/AKfy.../exec
```

Vite reads env vars at build time, so restart `npm run dev` after changing it.

**On Vercel** — Project → Settings → Environment Variables → add
`VITE_FORM_ENDPOINT` with the same URL for Production (and Preview if you want),
then **redeploy**. A rebuild is required; changing the variable alone does not
update an existing deployment.

## 6. Test

```powershell
Invoke-RestMethod -Method Post -Uri "<your-exec-url>" -ContentType "text/plain;charset=utf-8" `
  -Body '{"name":"Test","email":"test@example.com","message":"Hello from the test script","source":"manual test"}'
```

Expect `ok: True` and a new row in the `Leads` tab. Then submit the real form and
confirm the `Source` column says `hello card` or `contact section`.

## Behaviour and caveats

- **Success is optimistic.** Apps Script cannot return a CORS-readable response,
  so the form sends a fire-and-forget request and shows the thank-you state. If
  the URL is wrong the row will not arrive even though the UI looked happy — check
  the sheet after the first real submission.
- **Keep the sheet private.** The web app runs as you, so it can write to a
  private sheet. Do not make the sheet "Anyone with the link can edit"; visitors
  never need access to it.
- **Spam.** The form has a hidden honeypot and the script ignores those posts. If
  the sheet ever gets hit directly, add rate limiting or a reCAPTCHA check.
- **Quotas.** Apps Script consumer quotas are far above a portfolio's traffic
  (20k+ requests/day). No cost.
- **No CORS preflight.** The client sends `Content-Type: text/plain` in
  `no-cors` mode (`src/hooks/useContactForm.ts`) specifically because Apps Script
  cannot answer an `OPTIONS` request. Formspree/JSON endpoints keep using the
  normal JSON path.
