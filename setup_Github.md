# 🌐 Setup WiFi Focus Pro via GitHub Web

## **STEP 1: Buat Repository di GitHub**

1. **Login ke GitHub** (atau daftar gratis di github.com)
2. **Click "+"** di corner kanan atas → "New repository"
3. **Isi form:**
   - Repository name: `wifi-focus-pro`
   - Description: `Premium WiFi Monitoring Dashboard`
   - Public (agar bisa di-deploy)
   - ✅ Add README.md
   - ✅ Add .gitignore (pilih Node)
4. **Click "Create repository"**

---

## **STEP 2: Upload File via GitHub Web**

### **A. Upload package.json**
1. Click "Add file" → "Create new file"
2. Nama file: `package.json`
3. Paste isi file yang disediakan
4. Click "Commit changes" (dengan message "Add package.json")

### **B. Upload index.html**
1. Click "Add file" → "Create new file"
2. Nama file: `index.html`
3. Paste isi file
4. Commit

### **C. Buat folder `src/` dan upload file**
1. Click "Add file" → "Create new file"
2. Nama file: `src/App.jsx` (otomatis buat folder src)
3. Paste isi App.jsx
4. Commit

5. Repeat untuk file berikut:
   - `src/main.jsx`
   - `src/WifiFocusPro.jsx`
   - `src/index.css`

### **D. Upload Config Files**
Upload 4 file berikut ke root:
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `.gitignore` (update dengan isi yang disediakan)

---

## **STEP 3: Final File Structure**

Setelah upload, structure seharusnya:

```
wifi-focus-pro/
├── README.md (dari GitHub)
├── .gitignore
├── package.json
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── WifiFocusPro.jsx
    └── index.css
```

---

## **STEP 4: Deploy ke Vercel**

### **Option A: Via GitHub Integration (RECOMMENDED)**

1. **Buka Vercel**: https://vercel.com/dashboard
2. **Sign up/Login dengan GitHub** account
3. **Click "New Project"**
4. **Select repository**: `wifi-focus-pro`
5. **Framework Preset**: Vercel auto-detect "Vite"
6. **Environment Variables**: (tidak perlu)
7. **Click "Deploy"**
8. ✅ **Website live dalam 1-2 menit!**

### **Option B: Via Drag & Drop**

1. **Terminal local:**
   ```bash
   npm install
   npm run build
   ```

2. **Buka Netlify**: https://app.netlify.com/
3. **Drag & drop `dist/` folder**
4. ✅ Website langsung live!

---

## **STEP 5: Custom Domain (Optional)**

### **Di Vercel:**
1. Settings → Domains
2. Add Custom Domain
3. Update DNS settings di registrar (GoDaddy, Namecheap, etc)

### **Di Netlify:**
1. Domain Management → Custom Domain
2. Same process sebagai Vercel

---

## **STEP 6: Testing Lokal (Sebelum Deploy)**

Jika pengen test lokal sebelum deploy:

1. **Clone repository:**
   ```bash
   git clone https://github.com/username/wifi-focus-pro.git
   cd wifi-focus-pro
   ```

2. **Install & Run:**
   ```bash
   npm install
   npm run dev
   ```

3. **Buka**: http://localhost:3000

---

## **Checklist Deploy**

- ✅ Repository created di GitHub
- ✅ Semua file sudah di-upload
- ✅ File structure sesuai
- ✅ package.json valid (tanpa syntax error)
- ✅ Vercel atau Netlify connected
- ✅ Deploy trigger otomatis
- ✅ Website live & accessible

---

## **Quick Deploy URL**

Setelah deploy, akses website di:

```
https://wifi-focus-pro-XXXXX.vercel.app
```

atau

```
https://wifi-focus-pro.netlify.app
```

---

## **Troubleshooting**

### **Deploy gagal/pending?**
- Check GitHub Actions logs
- Verify package.json syntax
- Check Node version (16+)

### **Error: dependencies not installed**
- Vercel/Netlify auto-run `npm install`
- Jika error, re-trigger deploy

### **Website blank/404?**
- Check dist folder created
- Verify build script di package.json
- Check browser console untuk errors

### **Styling not working?**
- Vercel/Netlify auto-run build
- Clear cache: Ctrl+Shift+R (hard refresh)

---

## **Update Code Later**

Setiap kali update code di GitHub:
1. Edit file via GitHub web
2. Vercel auto-deploy dalam 1 menit
3. Website update otomatis!

Atau via terminal:
```bash
git add .
git commit -m "Update: description"
git push
# Vercel detect & auto-deploy!
```

---

## **Cost?**

✅ **FREE!**

- GitHub: Gratis unlimited public repos
- Vercel: Gratis 6000 build hours/bulan
- Netlify: Gratis 300 build hours/bulan

**Cocok untuk hobby projects & portfolio!**

---

## **Next Steps**

1. ✅ Create repo
2. ✅ Upload files
3. ✅ Deploy ke Vercel/Netlify
4. ✅ Share link ke semua orang!

**Selesai! Website WiFi Focus Pro Anda sudah live! 🚀**

---

**Made with ❤️ | WiFi Focus Pro**
