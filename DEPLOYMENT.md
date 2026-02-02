# Deployment Guide

## 📦 Pre-Deployment Checklist

- [ ] Test all features locally
- [ ] Check for console errors
- [ ] Test authentication flow
- [ ] Verify API integration
- [ ] Test responsive design on mobile
- [ ] Build production version successfully

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free tier available
- Git integration

**Steps:**

1. Create a Vercel account at [vercel.com](https://vercel.com)

2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy from the project directory:
   ```bash
   cd "fitness app"
   vercel
   ```

5. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? **Select your account**
   - Link to existing project? **N**
   - Project name? **fitness-tracker** (or your choice)
   - Directory? **./fitness app**
   - Override settings? **N**

6. For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

**Steps:**

1. Create a Netlify account at [netlify.com](https://netlify.com)

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Deploy:
   ```bash
   netlify deploy
   ```

5. For production:
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/fitness-tracker",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Update vite.config.js:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/fitness-tracker/'
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## 🔧 Build Optimization

Before deploying, ensure your build is optimized:

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

Check the build output:
- dist/ folder should be created
- No build errors
- Assets are minified

## 🌐 Custom Domain (Optional)

### For Vercel:
1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Netlify:
1. Go to Site Settings > Domain Management
2. Add custom domain
3. Configure DNS

## 📝 Environment Variables

If you add API keys in the future:

**Vercel:**
```bash
vercel env add
```

**Netlify:**
Add in Site Settings > Environment Variables

## ✅ Post-Deployment

1. Test the live URL
2. Check all features work
3. Test on different devices
4. Update README with live URL
5. Submit to the Google Form

## 🐛 Troubleshooting

**Build fails:**
- Check Node version (should be 16+)
- Delete node_modules and reinstall
- Check for TypeScript errors

**Routes not working:**
- Add _redirects file for Netlify:
  ```
  /* /index.html 200
  ```
- Vercel handles this automatically

**API not working:**
- Check CORS settings
- Verify API endpoints
- Check browser console for errors

## 📊 Performance Tips

- Images: Use WebP format
- Code splitting: Already handled by Vite
- Lazy loading: Implement for charts
- Caching: Configured by deployment platform

---

Good luck with your deployment! 🚀
