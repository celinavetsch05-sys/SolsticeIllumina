# Resend Contact Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Formspree HTML form submission with a Vercel serverless function that calls Resend, keeping everything on-page with a custom success state.

**Architecture:** A `api/contact.js` serverless function receives JSON from a `fetch()` call, validates the fields, and sends the email via Resend's Node SDK. The form in `index.html` is updated to submit via JavaScript instead of native HTML form action, enabling full control over success and error states.

**Tech Stack:** Node.js (Vercel serverless), Resend SDK v3, vanilla JS (embedded in index.html), Jest for testing

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Create | Declares `resend` dependency and `jest` dev dependency |
| `api/contact.js` | Create | Serverless function — validates input, calls Resend |
| `api/contact.test.js` | Create | Unit tests for the serverless function |
| `index.html` | Modify | Remove Formspree action/method, add fetch handler + success/error UI |

---

## Task 1: Create package.json

**Files:**
- Create: `package.json`

- [ ] **Step 1: Create package.json**

Create `package.json` at the repo root with this exact content:

```json
{
  "name": "solstice-illumina",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "resend": "^3.0.0"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  },
  "scripts": {
    "test": "jest"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, `package-lock.json` generated, no errors.

- [ ] **Step 3: Add node_modules to .gitignore**

Check if `.gitignore` exists:
```bash
cat .gitignore 2>/dev/null || echo "no .gitignore"
```

If it doesn't exist, create it. If it exists, append. Either way, ensure these lines are present:
```
node_modules/
.env.local
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "chore: add package.json with resend dependency"
```

---

## Task 2: Write failing tests for the serverless function

**Files:**
- Create: `api/contact.test.js`

- [ ] **Step 1: Create the test file**

Create `api/contact.test.js`:

```js
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'test-id' }),
    },
  })),
}));

const handler = require('./contact');

function makeReqRes(body, method = 'POST') {
  const req = { method, body };
  const res = {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
  };
  return { req, res };
}

test('returns 405 for non-POST requests', async () => {
  const { req, res } = makeReqRes({}, 'GET');
  await handler(req, res);
  expect(res.statusCode).toBe(405);
  expect(res.body.error).toBeTruthy();
});

test('returns 400 if name is missing', async () => {
  const { req, res } = makeReqRes({ email: 'a@b.com', message: 'hello' });
  await handler(req, res);
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeTruthy();
});

test('returns 400 if email is missing', async () => {
  const { req, res } = makeReqRes({ name: 'Test', message: 'hello' });
  await handler(req, res);
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeTruthy();
});

test('returns 400 if message is missing', async () => {
  const { req, res } = makeReqRes({ name: 'Test', email: 'a@b.com' });
  await handler(req, res);
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBeTruthy();
});

test('returns 200 with ok:true on success', async () => {
  const { req, res } = makeReqRes({ name: 'Test', email: 'a@b.com', message: 'hello' });
  await handler(req, res);
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual({ ok: true });
});

test('project field is optional', async () => {
  const { req, res } = makeReqRes({ name: 'Test', email: 'a@b.com', message: 'hello' });
  await handler(req, res);
  expect(res.statusCode).toBe(200);
});
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
npm test
```

Expected: Tests fail with `Cannot find module './contact'`. This confirms the tests are wired up before the implementation exists.

---

## Task 3: Implement the serverless function

**Files:**
- Create: `api/contact.js`

- [ ] **Step 1: Create the handler**

Create `api/contact.js`:

```js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, project, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    await resend.emails.send({
      from: 'contact@solsticeillumina.com',
      to: 'celinavetsch15@outlook.com',
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a2e">
          <h2 style="color:#6b3fa0">New message from ${name}</h2>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Project type:</strong> ${project || '—'}</p>
          <hr style="border:none;border-top:1px solid #e0d6ff;margin:1rem 0">
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
};
```

- [ ] **Step 2: Run tests — confirm they pass**

```bash
npm test
```

Expected output:
```
PASS  api/contact.test.js
  ✓ returns 405 for non-POST requests
  ✓ returns 400 if name is missing
  ✓ returns 400 if email is missing
  ✓ returns 400 if message is missing
  ✓ returns 200 with ok:true on success
  ✓ project field is optional

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
```

- [ ] **Step 3: Commit**

```bash
git add api/contact.js api/contact.test.js
git commit -m "feat: add Resend contact serverless function"
```

---

## Task 4: Set RESEND_API_KEY environment variable in Vercel

This is a manual step in the Vercel dashboard.

- [ ] **Step 1: Add the secret in Vercel**

1. Go to [vercel.com](https://vercel.com) → your `SolsticeIllumina` project
2. Click **Settings** → **Environment Variables**
3. Click **Add New**
4. Set:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_3fWi6A8S_BASh2NTx5LUztY7F2RenABAf`
   - **Environments:** Production, Preview, Development (tick all three)
5. Click **Save**

- [ ] **Step 2: Create .env.local for local dev (optional)**

If you want to test locally using `vercel dev`, create `.env.local` at the repo root (this file is already in .gitignore):

```
RESEND_API_KEY=re_3fWi6A8S_BASh2NTx5LUztY7F2RenABAf
```

> **Security note:** Regenerate this API key in your Resend dashboard after setup — it was shared in plain text during the design session.

---

## Task 5: Verify solsticeillumina.com domain in Resend

This is a manual DNS step.

- [ ] **Step 1: Add domain in Resend**

1. Go to [resend.com](https://resend.com) → **Domains** → **Add Domain**
2. Enter `solsticeillumina.com` and click **Add**
3. Resend will show you 3 DNS records to add (SPF, DKIM, DMARC)

- [ ] **Step 2: Add DNS records**

Go to wherever your DNS is managed (likely your domain registrar — Namecheap, GoDaddy, Squarespace, etc.) and add the three records Resend provides. They will look roughly like:

| Type | Name | Value |
|------|------|-------|
| TXT | `@` or `solsticeillumina.com` | `v=spf1 include:amazonses.com ~all` |
| TXT | `resend._domainkey` | `p=MII...` (long DKIM key) |
| TXT | `_dmarc` | `v=DMARC1; p=none;` |

Use the exact values Resend gives you — the above are examples only.

- [ ] **Step 3: Verify in Resend**

Click **Verify** in the Resend Domains panel. DNS propagation is usually instant to a few minutes. The status should change to **Verified**.

---

## Task 6: Update index.html — replace Formspree with fetch handler

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add id to the form and an error element**

In `index.html`, find the form opening tag (line ~978):

```html
<form action="https://formspree.io/f/xgorvqjl" method="POST">
```

Replace with:

```html
<form id="contact-form">
```

- [ ] **Step 2: Add the inline error element below the submit button**

Find (line ~997):

```html
        <button type="submit" class="ctrl-submit">Initiate Transmission</button>
      </form>
```

Replace with:

```html
        <button type="submit" class="ctrl-submit">Initiate Transmission</button>
        <p id="contact-error" style="display:none;color:var(--muted);font-family:sans-serif;font-size:.78rem;text-align:center;margin-top:.75rem"></p>
      </form>
```

- [ ] **Step 3: Remove the stale comment block**

Find and delete lines ~971–977:

```html
      <!--
        To make this form functional, connect it to a form service.
        Easy options: Formspree (formspree.io) — free tier, no backend needed.
        Replace action="#" with your Formspree endpoint, e.g.:
        action="https://formspree.io/f/yourformid"
        method="POST"
      -->
```

- [ ] **Step 4: Add the submit handler script**

In `index.html`, find the `<!-- ── SCRIPTS ──>` comment and add the following block immediately after the opening `<script>` tag (before any existing code):

```js
  /* ── Contact form ── */
  document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn = this.querySelector('.ctrl-submit');
    const errorEl = document.getElementById('contact-error');
    const originalText = btn.textContent;

    btn.textContent = 'Transmitting\u2026';
    btn.disabled = true;
    errorEl.style.display = 'none';

    const payload = {
      name:    this.querySelector('#name').value,
      email:   this.querySelector('#email').value,
      project: this.querySelector('#project').value,
      message: this.querySelector('#message').value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        const container = document.querySelector('.mission-ctrl');
        container.innerHTML = `
          <div class="ctrl-header">
            <div class="ctrl-dot green"></div>
            <div class="ctrl-dot green"></div>
            <div class="ctrl-dot green"></div>
            <span class="ctrl-label">Solstice Illumina \xb7 Transmission Complete</span>
          </div>
          <div style="padding:2.5rem 1.5rem;text-align:center">
            <p style="color:var(--iris);font-family:sans-serif;font-size:.6rem;letter-spacing:.28em;text-transform:uppercase;margin-bottom:1rem">Signal received</p>
            <p style="color:var(--stardust);font-size:1.3rem;font-family:Georgia,serif;margin-bottom:.75rem">Transmission received.</p>
            <p style="color:var(--muted);font-family:sans-serif;font-size:.85rem">I\u2019ll be in touch soon.</p>
          </div>
        `;
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      errorEl.textContent = 'Transmission failed. Please try again or reach out directly.';
      errorEl.style.display = 'block';
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });
```

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: switch contact form from Formspree to Resend API"
```

---

## Task 7: Push and verify on Vercel

- [ ] **Step 1: Push to GitHub**

```bash
git push
```

- [ ] **Step 2: Check Vercel deployment**

Go to your Vercel dashboard and confirm the deployment completes without errors. The build log should show the `api/contact.js` function being detected.

- [ ] **Step 3: Test the form end-to-end**

Open `solsticeillumina.com`, fill in the contact form, and submit. You should see:
1. Button text changes to "Transmitting…"
2. The form fades out and the success panel appears with "Transmission received."
3. An email arrives at `celinavetsch15@outlook.com` with the message contents

- [ ] **Step 4: Test the error state (optional)**

Temporarily break the API key in Vercel env vars, submit the form, and confirm the inline error message appears without leaving the page. Restore the correct key afterwards.

---

## Post-setup: Regenerate your Resend API key

> The API key `re_3fWi6A8S_BASh2NTx5LUztY7F2RenABAf` was shared in plain text during planning. After deployment, go to **Resend → API Keys**, create a new key, update the Vercel environment variable, and delete the old key.
