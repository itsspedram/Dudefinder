# 💘 Dudefinder

Dudefinder is a modern fullstack dating app built with **Next.js**, **Prisma**, and **Socket.IO**, now organized as a **Turbo monorepo** for scalable development. It's fast, fun, and designed for love (or at least for swiping 👀).

---

## 🧠 Features

- 🧑‍🤝‍🧑 User registration & login (NextAuth)
- 📄 Profile creation with gender, age, bio & image gallery
- ❤️ Like system + automatic match detection
- 💬 Real-time chat via Socket.IO
- 🔥 TurboRepo-based dev setup for frontend + backend
- 🎨 Tailwind UI with loading states & feedback
- ✅ Type-safe backend with Prisma + PostgreSQL
- 🎉 Toast notifications for actions like match/save/login
- ⚙️ Clean architecture using custom React hooks for all API calls
- 🔐 Global 401 redirect to login page for unauthorized users
- ❌ Custom 404 Not Found page

---

## 📁 Project Structure

```
my-dating-app/
├── app/                 # Next.js app (frontend + API routes)
├── components/          # Shared UI components
├── lib/                 # Utility helpers (auth, fetchers, etc)
├── prisma/              # Prisma schema & migrations
├── public/              # Public assets
├── socket-server/       # Socket.IO backend (Express + TS)
├── turbo.json           # TurboRepo config
├── pnpm-workspace.yaml  # pnpm monorepo config
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/my-dating-app.git
cd my-dating-app
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your_super_secret
NEXTAUTH_URL=http://localhost:3000
```

Make sure your PostgreSQL DB is running (Railway recommended).

### 4. Migrate database

```bash
npx prisma migrate dev
```

---

## 🚀 Start Development

To run **both Next.js and the Socket.IO server** side by side:

```bash
pnpm dev:web
```

This runs via **TurboRepo**:

- 🧠 `http://localhost:3000` → Next.js app
- 💬 `http://localhost:4444` → Socket.IO backend

You can also run them individually:

```bash
# Start only the Next.js app
pnpm dev

# Start only the socket server
cd socket-server
pnpm dev
```

---

## 🔧 API Routes
| Method | Route                        | Description                      |
|--------|------------------------------|----------------------------------|
| POST   | `/api/register`              | Register a new user              |
| POST   | `/api/auth/[...nextauth]`    | Handle login/logout              |
| GET/POST | `/api/profile`               | Create, update, or fetch profile |
| POST   | `/api/like`                  | Like a user                      |
| GET    | `/api/matches`               | Get matched users                |
| GET    | `/api/users/explore`         | Get users based on preferences   |
| GET    | `/api/messages/[matchId]`    | Fetch chat messages in match     |
| POST   | `/api/messages`              | Send chat message to match       |

---

## 💽 Pages
| Route             | Purpose                        |
|------------------|---------------------------------|
| `/`              | Home                           |
| `/login`         | Login                          |
| `/register`      | Register                       |
| `/profile`       | View & edit profile            |
| `/explore`       | Discover and like users        |
| `/matches`       | See matches + start chat       |
| `/chat/[matchId]`| Chat with matched user         |
| `/not-found`     | 404 fallback page              |

---

## 📊 Tech Stack

| Layer     | Tech                        |
|-----------|-----------------------------|
| Frontend  | Next.js 15, Tailwind CSS    |
| Backend   | Prisma, PostgreSQL, Express |
| Auth      | NextAuth.js                 |
| Realtime  | Socket.IO                   |
| Dev Tool  | TurboRepo + pnpm            |

---

## 🛠️ Upcoming Features

- [x] Swipe & match logic
- [x] Messaging system (chat)
- [x] Match detection & profile filtering
- [x] Typing indicators
- [x] Match preview cards
- [x] Toast notifications for key actions
- [x] Global fetch 401 redirect
- [x] Responsive swipe UI with animations
- [x] Custom 404 page
- [ ] Avatar builder
- [ ] Better seed data
- [ ] Reactions in chat
- [ ] Chat header enhancements
- [ ] 🎮 Add casual in-app games
- [ ] 🐳 Dockerize the full stack for deployment

---

## 🧱 Dev Scripts

```bash
# Start dev with TurboRepo
pnpm dev:web

# Build
pnpm build

# Lint
pnpm lint

# Prisma
npx prisma studio  # View DB
npx prisma migrate dev
```

---

## 👩‍💻 Developer Notes

### Environment Setup
1. Copy `.env.example` to `.env` and fill in your credentials.
2. Run:
   ```bash
   pnpm install
   npx prisma migrate dev
   pnpm dev:web
   ```

### Folder Tips
- `lib/hooks`: Reusable logic per feature
- `components/`: Dumb UI blocks only
- `app/`: Next.js routes and API handlers
- `socket-server/`: Express + Socket.IO backend

---

## 🤝 Contributions

Pull requests are welcome! For major changes:
1. Open an issue first.
2. Use conventional commit messages (e.g. `feat:`, `fix:`).
3. Run `pnpm lint` before pushing.


---

MIT – Built with ❤️ by Pedram and lots of console logs
