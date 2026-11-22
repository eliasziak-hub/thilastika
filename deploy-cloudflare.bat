@echo off
REM Ανέβασμα στο Cloudflare Pages (χρειάζεται Node.js). Την πρώτη φορά ζητά σύνδεση στο Cloudflare.
npx wrangler pages deploy . --project-name thilastika --commit-dirty=true
pause
