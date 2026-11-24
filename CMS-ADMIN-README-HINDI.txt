DEVKANSH INTERIOR — CMS ADMIN PACKAGE

इस ZIP में मौजूदा वेबसाइट के मौजूदा pages/design को रखते हुए Admin CMS में ये सुविधाएँ जोड़ी गई हैं:
1. Gallery: कंप्यूटर से फोटो upload, section/title/description, Draft/Publish/Edit/Delete.
2. Testimonials: ग्राहक नाम, review, rating, फोटो upload और छोटा वीडियो upload; URL विकल्प भी.
3. Blog: title, short description, पूरा लेख, cover photo upload; Draft/Publish/Edit/Delete.
4. पुराने Updates & Announcements पेज/फीचर को नहीं बदला गया.
5. केवल published CMS records public API से लौटते हैं. Delete status soft-delete है; हटाए रिकॉर्ड public site पर नहीं दिखते.
6. Admin CMS API और media upload के लिए authenticated session आवश्यक है. Session signed है और 8 घंटे में expire होता है.

महत्वपूर्ण — Google Apps Script:
इस ZIP में integrations/google-apps-script/Code.gs bridge source दिया गया है. इसे अपने Apps Script project में deploy करना जरूरी है. केवल वेबसाइट का कोड बदलने से Drive upload चालू नहीं होगा.
Setup के लिए integrations/google-apps-script/SETUP-HINDI.txt पढ़ें.

MEDIA LIMIT:
Admin direct upload सीमा 3 MB प्रति फाइल है. Supported images: JPG/PNG/WEBP. Supported videos: MP4/WEBM/MOV. बड़े वीडियो के लिए YouTube या Drive embed URL दें. Drive uploaded media link-viewable होगी.

ENVIRONMENT:
.env.local अपने कंप्यूटर पर स्वयं बनाएं/अपडेट करें. इसे ZIP या GitHub में कभी शामिल न करें.
Required: GOOGLE_APPS_SCRIPT_URL, GOOGLE_APPS_SCRIPT_SECRET, ADMIN_PANEL_ID, ADMIN_PANEL_PASSWORD, ADMIN_SESSION_SECRET.
ADMIN_SESSION_SECRET कम-से-कम 32 अक्षरों का नया random secret होना चाहिए.
पुराने exposed password/secret को बदलें.

LOCAL TEST:
1. npm ci
2. .env.example की कॉपी बनाकर .env.local बनाएं और अपने private values भरें.
3. npm run dev
4. http://localhost:3000/admin खोलें.
5. Login; फिर पहले छोटा JPG upload करके Gallery में Draft save करें; उसके बाद Publish करें.
6. /api/cms/public में केवल published records दिखने चाहिए. /gallery, /blog, /testimonials pages पर संबंधित प्रकाशित content जाँचें.
7. Logout के बाद /api/cms POST और /api/cms/upload पर 401 मिलना चाहिए. Incognito में /admin पर login form दिखना चाहिए.

TEST STATUS:
Source code review और archive packaging की गई है. इस execution environment में npm ci dependency installation timeout हुआ; इसलिए npm build, browser UI, Google Apps Script, Google Sheets और Google Drive integration को यहाँ सफलतापूर्वक test नहीं कहा जा सकता. Apps Script को ऊपर दिए setup के अनुसार deploy करने और local test पूरा करने के बाद ही इसे production-ready मानें.

LIVE WEBSITE:
इस ZIP के दौरान Live Vercel website पर कोई बदलाव या deployment नहीं किया गया.
