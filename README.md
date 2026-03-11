Michael Oguntimehin — Portfolio
A modern, responsive personal portfolio built with Next.js 14, featuring smooth animations and a clean aesthetic.

Tech Stack
Framework: Next.js 14 (App Router)
Language: TypeScript
Styling: Tailwind CSS
Animations: Framer Motion
Icons: Lucide React
Getting Started
Prerequisites: Node.js 18+ installed.

Install dependencies
npm install
Run the development server
npm run dev
Open http://localhost:3000 in your browser.
Project Structure
The project follows a standard Next.js App Router structure:

src/├── app/              # App Router pages and global layouts├── components/       # Reusable UI components│   ├── layout/       # Navbar, Footer, and layout-specific elements│   ├── sections/     # Hero, About, Projects, and Contact sections│   └── ui/           # Shared UI primitives (cards, buttons, etc.)├── hooks/            # Custom React hooks└── lib/              # Utility functions and data constantspublic/               # Static assets (images, logos)
Configuration
To use the contact form and social links, you will need to set up environment variables.

Create a .env.local file in the root directory.
Add your necessary API keys (e.g., for email services) and social profile URLs.
Note: This project is set up to use environment variables for sensitive data to keep credentials out of the source code.

Deployment
This project is optimized for deployment on Vercel, but it can be hosted on any platform supporting Next.js.

bash

npm run build
For the easiest deployment workflow, connect your GitHub repository to Vercel.
```
