# คู่มือการ Deploy บน Netlify

## ขั้นตอนการ Deploy

### 1. เตรียม Repository
- Push โค้ดทั้งหมดไปยัง GitHub/GitLab/Bitbucket

### 2. เชื่อมต่อกับ Netlify
1. ไปที่ [Netlify](https://www.netlify.com/)
2. คลิก "Add new site" → "Import an existing project"
3. เลือก Git provider (GitHub/GitLab/Bitbucket)
4. เลือก repository ของคุณ

### 3. ตั้งค่า Build Settings
Netlify จะ detect อัตโนมัติจาก `netlify.toml`:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** `18`

### 4. ตั้งค่า Environment Variables
ไปที่ **Site settings** → **Environment variables** และเพิ่ม:

```
VITE_SERVER_URL=https://your-backend-api-url.com
```

**สำคัญ:** ต้องใส่ `VITE_` prefix เพื่อให้ Vite รู้จักตัวแปรนี้

### 5. Deploy
- Netlify จะ build และ deploy อัตโนมัติเมื่อ push code
- หรือคลิก "Deploy site" เพื่อ deploy ทันที

## ไฟล์ที่สำคัญ

### `netlify.toml`
- กำหนด build settings
- ตั้งค่า redirects สำหรับ SPA routing
- ตั้งค่า headers สำหรับ security และ caching

### `public/_redirects`
- Redirect ทุก route ไปที่ `/index.html` เพื่อให้ React Router ทำงานได้

## Troubleshooting

### ปัญหา: 404 เมื่อ refresh หน้า
**แก้ไข:** ตรวจสอบว่า `public/_redirects` มีอยู่และมีเนื้อหา `/*    /index.html   200`

### ปัญหา: Environment variables ไม่ทำงาน
**แก้ไข:** 
- ตรวจสอบว่าใส่ `VITE_` prefix แล้ว
- ตรวจสอบว่า rebuild หลังเพิ่ม environment variables

### ปัญหา: Build ล้มเหลว - "terser not found"
**แก้ไข:** 
- โปรเจกต์นี้ใช้ `esbuild` แทน `terser` แล้ว (เร็วกว่าและไม่ต้องติดตั้งเพิ่ม)
- ตรวจสอบ `vite.config.js` ว่าใช้ `minify: 'esbuild'`

### ปัญหา: Build ล้มเหลว - "Duplicate key"
**แก้ไข:**
- ตรวจสอบว่ามี duplicate keys ใน object literals
- ใช้ ESLint หรือตรวจสอบ build logs เพื่อหาตำแหน่งที่ซ้ำ

### ปัญหา: Build ล้มเหลว - อื่นๆ
**แก้ไข:**
- ตรวจสอบว่า Node version ถูกต้อง (18)
- ตรวจสอบว่า dependencies ติดตั้งครบ (`npm install`)
- ดู build logs ใน Netlify dashboard
- รัน `npm run build` ใน local เพื่อทดสอบก่อน deploy

### ปัญหา: Browserslist outdated
**แก้ไข:**
- รัน `npm run update-browserslist` หรือ `npx update-browserslist-db@latest`
- ไม่ critical แต่ควรอัปเดตเป็นครั้งคราว

## Custom Domain
1. ไปที่ **Site settings** → **Domain management**
2. คลิก "Add custom domain"
3. ใส่ domain name ของคุณ
4. ตั้งค่า DNS records ตามที่ Netlify แนะนำ

## Continuous Deployment
- Netlify จะ auto-deploy เมื่อ push code ไปยัง branch ที่ตั้งค่าไว้
- สามารถตั้งค่า branch และ build settings ได้ใน **Site settings** → **Build & deploy**
