# टेस्ट स्थिति — Devkansh Interior CMS

## Source review में जाँची गई बातें
- मौजूदा Next.js pages और public design files को बनाए रखा गया है; मुख्य public pages का layout rewrite नहीं किया गया.
- Admin UI Gallery, Testimonials और Blog records के लिए Draft/Publish/Edit/Delete flow देता है.
- Admin media upload endpoint session authentication जाँचता है.
- CMS write endpoint authenticated admin session माँगता है.
- Public CMS endpoint केवल `published` records लौटाता है.
- Session token HMAC-signed है और expiry timestamp के साथ 8 घंटे बाद expire होता है.
- Google Apps Script bridge source अलग से `integrations/google-apps-script/Code.gs` में दिया गया है.
- Announcement/Updates page को नहीं बदला गया.

## अभी verified नहीं
- `npm ci` इस environment में timeout हुआ; इसलिए production build यहाँ नहीं चला.
- Apps Script code को user के Google account में deploy नहीं किया गया.
- Spreadsheet/Drive IDs और Script Properties को verify नहीं किया गया.
- Live Google Sheets read/write और Drive media upload test नहीं हुए.
- Browser/Incognito visual test नहीं हुआ.

**इसलिए इस ZIP को code-updated handoff माना जाए, production-tested release नहीं.** पहले local setup और Google Apps Script setup पूरा करके testing करें. Live Vercel deployment नहीं किया गया.
