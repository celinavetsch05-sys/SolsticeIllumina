# Resend Contact Form — Design Spec
**Date:** 2026-04-15
**Status:** Approved

## Problem

The existing contact form uses Formspree, which redirects the user to Formspree's own "thank you" page on submission. This breaks the site experience and is off-brand.

## Goal

Replace Formspree with Resend so that form submission is handled entirely on-page, with a custom success state styled to match the cosmic terminal aesthetic.

## Architecture

Three moving parts:

### 1. Domain Verification (one-time)
Verify `solsticeillumina.com` as a sending domain in the Resend dashboard. This requires adding three DNS records to wherever `solsticeillumina.com`'s DNS is managed:
- SPF record
- DKIM record
- DMARC record

Resend provides the exact values. Once propagated, emails can be sent from `contact@solsticeillumina.com`.

### 2. Serverless Function — `api/contact.js`
A Vercel Node.js serverless function. Receives a `POST` request with a JSON body.

**Input:**
```json
{ "name": "...", "email": "...", "project": "...", "message": "..." }
```

**Behaviour:**
- Validates that `name`, `email`, and `message` are present; returns `400` if not
- Calls Resend `emails.send()` with:
  - **From:** `contact@solsticeillumina.com`
  - **To:** `celinavetsch15@outlook.com`
  - **Subject:** `New message from {name}`
  - **HTML body:** clean layout with all four fields
- Returns `{ ok: true }` on success
- Returns `{ error: "Failed to send message." }` with status `500` on Resend error

**Environment variable:** `RESEND_API_KEY` — set in Vercel Project Settings → Environment Variables. Never committed to the repo.

### 3. Form Update — `index.html`

Remove `action` and `method` from the `<form>`. Add a JS submit handler that:

1. Prevents default form submission
2. Sets button text to `"Transmitting…"` and disables it
3. POSTs `{ name, email, project, message }` as JSON to `/api/contact`
4. **On success:** fades the form out, replaces content inside `.mission-ctrl` with a success panel:
   - Green dot indicator (reusing `.ctrl-dot.green`)
   - Heading: `"Transmission received."`
   - Body: `"I'll be in touch soon."`
   - Styled consistently with the existing terminal UI
5. **On error:** re-enables the button, restores its label, shows an inline error line below the button in `--muted` color

## File Changes

| File | Change |
|------|--------|
| `api/contact.js` | New — serverless function |
| `index.html` | Update form: remove `action`/`method`, add JS submit handler, add success/error UI |
| `package.json` | New — add `resend` as a dependency |

## Out of Scope

- Email reply-to threading
- Spam filtering beyond Resend's built-in protection
- Form field persistence on error (fields stay filled; user can retry)
