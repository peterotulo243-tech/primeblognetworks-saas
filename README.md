# PrimeBlogNetworks SaaS (Next.js, free hosting)

Shared database, client/admin logins, server-rendered indexable pages, sitemap.xml, robots.txt, JSON-LD, OG images.
Free stack: GitHub + Netlify free plan (hosting + Netlify Blobs database). No other accounts needed.

## Deploy (all free)
1. Create a free GitHub repo and upload this folder's contents (not node_modules).
2. Netlify > Add new site > Import from GitHub. Build settings are read from netlify.toml.
3. Site configuration > Environment variables, add:
   - ADMIN_EMAIL = primeblognetworks@gmail.com
   - ADMIN_PASSWORD = a long password you choose
   - SESSION_SECRET = long random string (30+ characters)
   - NEXT_PUBLIC_SITE_URL = your site URL (e.g. https://primeblognetworks.netlify.app), then redeploy
   - Optional: GSC_VERIFICATION, NEXT_PUBLIC_GA_ID
4. Open /admin and log in. Create a client, Generate Demo, Send Demo.
5. Google Search Console: add the site, paste your verification code in GSC_VERIFICATION, submit /sitemap.xml.

## Payment flow
Client taps PAY NOW > PayPal or Remitly. Admin gets a notification, checks the money arrived, and clicks Confirm in Payments.
The page then turns Live. PayPal/M-Pesa auto-confirmation needs webhooks (a later upgrade).

## Local run
npm install && npm run dev (data is kept in a temp file locally)
