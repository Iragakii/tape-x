# Tape Input App - Deployment Guide

## Deploy to Render

This project is configured to deploy on [Render](https://render.com), a modern cloud platform.

### Quick Start Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Sign in/Sign up with GitHub
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Render will auto-detect the `render.yaml` configuration

3. **Deploy Settings**
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - The `render.yaml` file handles SPA routing automatically

### Environment Variables

No environment variables are required for this static site deployment.

### Build Details

- **Framework**: React 19 with TypeScript
- **Bundler**: Vite (rolldown-vite)
- **Styling**: Tailwind CSS v4
- **Output**: Static HTML/CSS/JS files in `/dist`

### Local Testing

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

Open `http://localhost:4173` to verify the build works.

### Post-Deployment

Once deployed, your app will be available at: `https://your-app-name.onrender.com`

### Notes

- The app is a static site (no backend required)
- All animations and interactions run in the browser
- The `render.yaml` configuration sets up SPA routing to handle client-side navigation
