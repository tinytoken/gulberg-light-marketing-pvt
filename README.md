# Gulberg Light Marketing - Real Estate Agency Website

A complete full-stack real estate agency website built with React, Node.js, Express, and SQLite.

## Technology Stack

- **Frontend:** React 19, Tailwind CSS 4, Framer Motion, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** SQLite (via better-sqlite3)
- **Build Tool:** Vite

## Features

- Fully responsive mobile-first design
- Property listings with filtering and search
- Detailed property pages with image galleries
- Lead generation forms
- Admin dashboard for managing properties and viewing inquiries
- SEO optimized with structured data
- Google Maps integration

## Project Structure

```
/
├── server.ts              # Express backend server and API routes
├── database.sqlite        # SQLite database file (created automatically)
├── index.html             # Main HTML file with SEO tags
├── package.json           # Project dependencies and scripts
├── vite.config.ts         # Vite configuration
└── src/
    ├── App.tsx            # Main React component and routing
    ├── main.tsx           # React entry point
    ├── index.css          # Tailwind CSS entry point
    ├── components/        # Reusable UI components
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   └── PropertyCard.tsx
    └── pages/             # Page components
        ├── Home.tsx
        ├── Properties.tsx
        ├── PropertyDetails.tsx
        ├── About.tsx
        ├── Projects.tsx
        ├── Contact.tsx
        └── Admin.tsx      # Admin dashboard
```

## How to Run Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   This will start both the Express backend and the Vite frontend on `http://localhost:3000`.

3. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Admin Dashboard: `http://localhost:3000/admin`

## Deployment Guide

### Deploying on a VPS (Ubuntu/Debian)

1. **Clone the repository to your VPS**
2. **Install Node.js (v18+)**
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Build the project:**
   ```bash
   npm run build
   ```
5. **Start the production server:**
   ```bash
   npm start
   ```
   *(Consider using PM2 to keep the app running in the background: `pm2 start npm --name "gulberg-real-estate" -- start`)*
6. **Set up Nginx as a reverse proxy** to route traffic from port 80/443 to port 3000.

### Deploying on Vercel

Since this is a full-stack application using Express and SQLite, deploying directly to Vercel requires some modifications. Vercel is designed for serverless functions, and SQLite requires a persistent file system which Vercel does not provide.

**To deploy on Vercel, you must:**
1. Migrate the database from SQLite to MongoDB (using Mongoose) or PostgreSQL (using Prisma/Drizzle).
2. Convert the Express routes in `server.ts` to Vercel Serverless Functions (`api/` directory) or use Next.js API routes.
3. Update the frontend API calls to point to the new serverless endpoints.

**Alternative Deployment Platforms (Easier for this stack):**
- **Render.com:** Create a "Web Service", set build command to `npm run build`, and start command to `npm start`. Add a "Disk" to persist the `database.sqlite` file.
- **Railway.app:** Simply connect your GitHub repository. Railway will automatically detect the Node.js environment and run the `start` script. Add a persistent volume for the database.
