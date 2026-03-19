# Veltrix Platform - Quick Start Guide

## 30 Second Setup

```bash
# 1. Navigate to project
cd /vercel/share/v0-project

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Visit http://localhost:3000
```

Done! The application is now running.

---

## What Can You Do Right Now?

### Browse the Landing Page
- **URL**: `http://localhost:3000`
- Beautiful hero section with gradient text
- Features showcase and tech stack
- CTA buttons and monitoring section
- Responsive design on mobile/tablet/desktop

### Login/Signup (No Validation)
- **Login**: `http://localhost:3000/login`
- **Signup**: `http://localhost:3000/signup`
- Use any email/password combination
- Creates mock workspace automatically
- GitHub OAuth button works (simulated)

### Access Dashboard (After Login)
- **Projects**: `http://localhost:3000/dashboard/projects`
  - See 2 mock projects
  - Create new projects with 4-step wizard
  - Edit, view, or delete projects
  
- **Deployments**: `http://localhost:3000/dashboard/deployments`
  - View deployment history with statuses
  - Filter by deployment status
  - See commit messages and runtimes
  
- **Settings**: `http://localhost:3000/dashboard/settings`
  - View/edit account information
  - Workspace settings
  - Account deletion

### Explore All Public Pages
- `/product` - Platform features and services
- `/pricing` - Three pricing tiers
- `/customers` - Customer showcase
- `/blog` - Blog articles
- `/docs` - Documentation sections
- `/changelog` - Version history
- `/company` - About, Security, Careers, Press
- `/contact` - Contact form

---

## Create a Project (Step by Step)

1. **Login**
   - Go to `http://localhost:3000/login`
   - Enter email: `test@example.com`
   - Enter password: `password123`
   - Click "Sign in"

2. **Navigate to Projects**
   - You're now in dashboard
   - Click "Projects" in sidebar

3. **Create New Project**
   - Click "New Project" button (top right)
   - Modal opens with 4 steps:
     - **Step 1**: Select "Static Site", "Web Service", etc.
     - **Step 2**: Choose a repository from list
     - **Step 3**: Fill in project details:
       - Project Name (must be unique)
       - Branch (default: `main`)
       - Build Command (e.g., `npm run build`)
     - **Step 4**: Select environment (development/staging/production)
   - Click "Create Project"

4. **View Your Project**
   - Project appears in the projects list
   - Click "Edit" to modify settings
   - Copy deployment URL to clipboard

5. **Check Deployments**
   - Go to "Deployments" in sidebar
   - See your project's deployment history
   - Click "Visit →" to open deployment (demo link)

---

## Key Pages & Features

| Page | URL | Description |
|------|-----|-------------|
| Landing | `/` | Hero, features, CTA, monitoring sections |
| Login | `/login` | Email/password + GitHub OAuth |
| Signup | `/signup` | Create account + auto workspace |
| Dashboard | `/dashboard/projects` | View & manage projects |
| Deployments | `/dashboard/deployments` | Deployment history & status |
| Settings | `/dashboard/settings` | Account & workspace config |
| Product | `/product` | Platform overview |
| Pricing | `/pricing` | Three pricing tiers |
| Contact | `/contact` | Contact form |

---

## Mock Data (Pre-Loaded)

### Projects
1. **portfolio-site** - Static site on production
2. **api-backend** - Web service on production

### Deployments
- Multiple deployments per project
- Different statuses (deployed, deploying)
- Commit messages and runtimes included

### Users & Workspaces
Created automatically on signup:
- User ID generated
- Email stored
- Workspace name derived from email
- All stored in localStorage

---

## Testing Features

### Test 1: Login/Logout
1. Click "Dashboard" in navbar
2. Enter credentials
3. Successfully logged in
4. Click user menu → Logout
5. Redirected to landing page

### Test 2: Create & View Project
1. Login at `/login`
2. Go to `/dashboard/projects`
3. Click "New Project"
4. Fill 4 steps of wizard
5. Project added to list
6. Click "Edit" to view details

### Test 3: Filter Deployments
1. Go to `/dashboard/deployments`
2. Click status tabs (all, deployed, deploying, failed)
3. List updates accordingly

### Test 4: Browse Public Pages
1. From navbar, click "Product"
2. Explore different public pages
3. All pages fully functional
4. No login required

---

## Customize Easily

### Change Colors
Edit `tailwind.config.ts` for color palette

### Add New Page
1. Create file in `/app/your-page/page.jsx`
2. Import Navbar and Footer
3. Build your content
4. Links update automatically in navbar

### Modify Mock Data
Edit `lib/auth-store.js` and `lib/projects-store.js`

### Update Navigation
Edit `components/navbar.jsx` navItems array

---

## Frontend Development

### Components Used
- Next.js 16 (React Server Components)
- Tailwind CSS for styling
- shadcn/ui components
- Lucide React for icons
- Sonner for toast notifications

### No Backend Required
- All data stored in localStorage
- Authentication is mocked
- Projects & deployments are mock data
- Perfect for frontend development

### Mobile Responsive
- Mobile hamburger menu
- Responsive grid layouts
- Touch-friendly buttons
- Works on all screen sizes

---

## Common Issues & Solutions

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Clear all data**
Open browser console and run:
```javascript
localStorage.clear();
```

**Pages not loading?**
```bash
# Clear and reinstall
rm -rf node_modules
npm install
npm run dev
```

**Styling not working?**
Tailwind CSS is built-in. Just save files and see changes.

---

## Next Steps

1. **Explore the codebase**: Check out the component structure
2. **Customize styling**: Update colors and fonts
3. **Add new pages**: Create new routes easily
4. **Modify mock data**: Update default projects/deployments
5. **Connect backend**: Replace localStorage with real API

---

## File Structure Quick Reference

```
Key files to know:
├── app/page.jsx - Landing page
├── app/login/page.jsx - Login page
├── app/dashboard/layout.jsx - Dashboard layout
├── components/navbar.jsx - Navigation
├── components/dashboard/create-project-modal.jsx - Project creation
├── lib/auth-store.js - Mock authentication
└── lib/projects-store.js - Mock projects & deployments
```

---

## Build for Production

```bash
# Build
npm run build

# Start production server
npm start

# Deploy to Vercel
npx vercel
```

---

## Support Resources

- Full documentation: `SETUP_INSTRUCTIONS.md`
- Component structure in `/components`
- Pages in `/app`
- Utilities in `/lib`
- Styles: Tailwind CSS (no separate CSS files)

---

**You're all set! Happy coding! 🚀**
