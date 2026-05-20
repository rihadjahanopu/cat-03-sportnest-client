# 🏟️ SportNest

[![Next.js Version](https://img.shields.io/badge/Next.js-16.2.6--turbopack-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React Version](https://img.shields.io/badge/React-19.2.6-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Better Auth](https://img.shields.io/badge/Better--Auth-v1.6.11-FFA500?style=for-the-badge&logo=auth0&logoColor=white)](https://better-auth.com)
[![Database](https://img.shields.io/badge/MongoDB-7.2.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

**SportNest** is an ultra-modern, high-performance sports facility booking and venue management platform. Architected with the latest **Next.js 16 (Turbopack)**, **React 19**, **Better Auth**, and **MongoDB**, it provides players with an incredibly fast, premium glassmorphic interface to locate and book elite turfs and arenas in under 60 seconds.

---

## Live Demo

- [SportNest Live Link](https://cat-03-sportnest-client.vercel.app/)

---

## ✨ Features

- 🌌 **Premium Glassmorphic Design**: Tailored with a futuristic neon lime-green, electric cyan, and dark slate palette, complete with smooth Micro-Animations powered by Framer Motion.
- ⚡ **Turbopack Powered Compilation**: Supercharged development and production cycle times using Next.js 16's latest Turbopack engine.
- 🕒 **Real-Time Booking Sync**: TanStack Query polling handles live slot states and instant updates across the dashboard and client portal.
- 🛡️ **Secure Social & Email Auth**: Powered by Better Auth (JWT plugin with OAuth) featuring complete page-guard routing protecting unauthorized dashboard states.
- 📊 **Owner Administration Panel**: Owners can register, list, edit, track occupancy, and delete their own venues with zero friction.
- 🗑️ **Persistent Card Dismissal**: Cancelled bookings present a clean, persistent "Remove Card" control backed by secure local storage serialization.

---

## 🛠️ Tech Stack

### Frontend & Layout

- **Framework**: [Next.js 16.2.6 (App Router)](https://nextjs.org)
- **View Library**: [React 19.2.6](https://react.dev)
- **Styling Engine**: [Tailwind CSS v4](https://tailwindcss.com) + [Framer Motion](https://motion.dev)
- **Icons & Assets**: [Lucide React](https://lucide.dev)

### Data Flow & Client Operations

- **Data Fetching**: [TanStack React Query v5](https://tanstack.com/query) + [Axios](https://axios-http.com)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)

### Backend & Database (Microservice-Ready)

- **Web Server**: Node.js + Express
- **Database Driver**: [Mongoose](https://mongoosejs.com) + [MongoDB Native v7](https://mongodb.com)
- **Authentication Core**: [Better Auth v1.6](https://better-auth.com)

---

## 📂 Project Architecture

```bash
sportnest/
├── public/                 # Static public assets
├── src/
│   ├── app/                # Next.js 16 App Router Routes
│   │   ├── add-facility/   # Partner listing wizard
│   │   ├── api/            # API integration & auth handlers
│   │   ├── facilities/     # Arenas marketplace & details
│   │   ├── login/          # LoginPage with Auth guards
│   │   ├── register/       # RegisterPage with Auth guards
│   │   ├── my-bookings/    # Live real-time bookings tracker
│   │   ├── not-found.js    # Customized 404 Offside page
│   │   ├── layout.js       # Global RootLayout with Navbar/Footer
│   │   └── page.js         # Modular home container
│   ├── components/         # Reusable modular UI components
│   │   ├── Hero.js
│   │   ├── SportsCategories.js
│   │   ├── FeaturedFacilities.js
│   │   ├── WhyChoose.js
│   │   ├── Testimonials.js
│   │   ├── OwnerCTA.js
│   │   ├── Navbar.js
│   │   └── Footer.js
│   ├── lib/                # Shared utilities (Axios configuration, Auth Client)
│   ├── providers/          # Global context providers (React Query, Auth)
│   └── globals.css         # Theme overrides and tailwind imports
├── package.json            # Dependencies manifests
└── README.md               # Product Documentation
```

---

## ⚡ Quick Start

Follow these steps to set up and run the SportNest client portal locally.

### Prerequisites

Make sure you have [Node.js (v18+)](https://nodejs.org) and [npm](https://npmjs.com) installed.

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/rihadjahanopu/sportnest.git
cd sportnest
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root folder of the project:

```env
# API Base Endpoint
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Authentication Variables
BETTER_AUTH_SECRET=your_better_auth_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Social Auth Providers (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Run Development Server

Run the local dev environment with Turbopack enabled:

```bash
npm run dev
```

### 4. Build for Production

To build the static bundle and optimize the application:

```bash
npm run build
npm start
```

---

## 🛡️ API Integration Summary

All authenticated client requests to the Express backend dynamically fetch the Better Auth JWT token on the fly via a custom Axios request interceptor:

```javascript
api.interceptors.request.use(async (config) => {
	const { data } = await authClient.token();
	if (data?.token) {
		config.headers.Authorization = `Bearer ${data.token}`;
	}
	return config;
});
```

---

## 📝 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<p align="center">
  Made with ❤️ by the SportNest Team
</p>
