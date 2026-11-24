# Devkansh Interior — Local Testing (Hindi)

## Website + Admin
1. Is folder ko VS Code mein open karein — isi folder mein `package.json` hona chahiye.
2. `.env.example` ko copy karke `.env.local` banayein.
3. `.env.local` mein `ADMIN_PANEL_ID`, `ADMIN_PANEL_PASSWORD`, `ADMIN_SESSION_SECRET`, `GOOGLE_APPS_SCRIPT_URL`, aur `GOOGLE_APPS_SCRIPT_SECRET` set karein.
4. Google Apps Script ke Project Settings → Script Properties mein `API_SECRET` naam se wahi secret value set karein jo `.env.local` mein `GOOGLE_APPS_SCRIPT_SECRET` hai. Secret kisi public/client-side code mein na daalein.
5. Apps Script Web App ko Execute as Me aur access Anyone ke saath deploy/redeploy karein.
6. Terminal: `npm install` phir `npm run dev`.
7. Website: `http://localhost:3000`; Admin: `http://localhost:3000/admin`.
8. Admin login ke baad Draft Save / Publish test karein; published block `/updates` par dikhega.
9. Production build: `npm run build`; local production: `npm run start`.

## Notes
- Admin ID default example `devkanshadmin` hai; password aap khud `.env.local` mein set karein.
- `GOOGLE_APPS_SCRIPT_SECRET` aur Apps Script Script Property `API_SECRET` ka value bilkul same hona chahiye.
- Apps Script media upload action code mein hai, lekin is Admin UI mein media upload control abhi included nahin hai.
- Google Apps Script, Sheets aur Drive ka live read/write test aapke Google account permissions aur deployed script settings ke saath hi final confirm hoga.
