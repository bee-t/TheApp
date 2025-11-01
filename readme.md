Requirements : 

- Node
- Docker desktop


Setup Instructions 

Start the database:

bash
- docker-compose up -d

Setup Backend:

bash
- cd backend
- npm install
- npm run dev


Setup Frontend:

bash
- cd frontend
- npm install
- npm run dev


Access the application:

Frontend: http://localhost:3000
Backend API: http://localhost:5000

Folder Structure :

app-infrastructure/
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── database.ts
│   │   ├── auth.ts
│   │   └── types.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env
│   └── dist/ (generated after build)
│       ├── server.js
│       ├── database.js
│       ├── auth.js
│       └── types.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Box.tsx
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Text.tsx
│   │   │   │   ├── Flex.tsx
│   │   │   │   ├── Container.tsx
│   │   │   │   ├── List.tsx
│   │   │   │   ├── Link.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── Home.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── api/
│   │   │   └── auth.ts
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── dist/ (generated after build)
├── docker-compose.yml
└── README.md (optional)

Detailed Breakdown : 

Backend Structure:
backend/
├── src/
│   ├── server.ts          # Main Express server setup
│   ├── database.ts        # PostgreSQL connection & initialization
│   ├── auth.ts           # Authentication service (login/signup)
│   └── types.ts          # TypeScript interfaces
├── package.json          # Backend dependencies & scripts
├── tsconfig.json         # TypeScript configuration
├── .env                  # Environment variables
└── dist/                 # Compiled JavaScript (auto-generated)


Frontend Strucrture : 

frontend/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI component library
│   │   │   ├── Box.tsx           # Layout container
│   │   │   ├── Button.tsx        # Interactive button
│   │   │   ├── Input.tsx         # Form inputs
│   │   │   ├── Text.tsx          # Typography
│   │   │   ├── Flex.tsx          # Flexbox layout
│   │   │   ├── Container.tsx     # Centered container
│   │   │   ├── List.tsx          # List components
│   │   │   ├── Link.tsx          # Navigation links
│   │   │   └── index.ts          # Component exports
│   │   ├── Login.tsx     # Login page component
│   │   ├── Signup.tsx    # Signup page component
│   │   └── Home.tsx      # Home page component
│   ├── context/
│   │   └── AuthContext.tsx # Authentication state management
│   ├── api/
│   │   └── auth.ts       # API calls to backend
│   ├── types.ts          # TypeScript interfaces
│   ├── App.tsx           # Main app component with routing
│   ├── App.css           # App-specific styles
│   ├── main.tsx          # React app entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Frontend dependencies & scripts
├── vite.config.ts        # Vite build configuration
├── tsconfig.json         # TypeScript configuration
└── tsconfig.node.json    # Node-specific TypeScript config

Root Level :

app-infrastructure/
├── docker-compose.yml    # PostgreSQL database container setup
└── README.md            # Project documentation (optional)

File Purposes :

File Purposes:
Backend: API server, database, authentication logic

Frontend UI Components: Strict, type-safe reusable components

Pages: Login, Signup, Home page components

Context: Global state management (authentication)

API: HTTP requests to backend

Types: Shared TypeScript interfaces


Current Features Included :

✅ User registration with password hashing

✅ JWT-based authentication

✅ Login/logout functionality

✅ Protected routes

✅ Token verification

✅ Responsive UI components

✅ Error handling

✅ TypeScript throughout