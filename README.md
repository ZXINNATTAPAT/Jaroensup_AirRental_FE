# เว็บแอปพลิเคชันแอร์เช่า และจ้างช่างออนไลน์ครบวงจร
# React, WebXR, Three.js, Node.js, MYSQL

## 🚀 การ Deploy บน Netlify

โปรเจกต์นี้พร้อมสำหรับการ deploy บน Netlify แล้ว!

### Quick Start

1. **Push code ไปยัง Git repository** (GitHub/GitLab/Bitbucket)

2. **เชื่อมต่อกับ Netlify:**
   - ไปที่ [Netlify](https://www.netlify.com/)
   - คลิก "Add new site" → "Import an existing project"
   - เลือก Git provider และ repository

3. **ตั้งค่า Environment Variables:**
   ```
   VITE_SERVER_URL=https://your-backend-api-url.com
   ```

4. **Deploy!** Netlify จะ build และ deploy อัตโนมัติ

### ไฟล์ที่สำคัญสำหรับ Netlify

- `netlify.toml` - Build configuration และ redirects
- `public/_redirects` - SPA routing support

### ดูรายละเอียดเพิ่มเติม

ดูคู่มือฉบับเต็มได้ที่ [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md)

## 📦 Installation

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📝 Environment Variables

สร้างไฟล์ `.env` ใน root directory:

```
VITE_SERVER_URL=http://localhost:3000
```

**สำหรับ Production:** ตั้งค่าใน Netlify Dashboard → Site settings → Environment variables