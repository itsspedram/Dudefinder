# 💘 Dudefinder

Dudefinder is a modern full-stack dating app built with Next.js (App Router), Prisma, PostgreSQL, and NextAuth. Users can register, log in, create profiles, explore other users, swipe (like), match, and message each other.

---

## 🚀 Features Implemented

### ✅ Authentication
- User registration (`/api/register`)
- Login with credentials using NextAuth
- Session management with JWT

### ✅ Profiles
- Create/update profile (`/api/profile`)
- Fields: bio, age, gender, image URLs

### ✅ Swiping / Matching
- Like other users (`/api/like`)
- Mutual likes create a Match
- List your matches (`/api/matches`)
- Explore users you haven't liked/matched yet (`/api/users/explore`)

### ✅ Messaging
- Schema set up for real-time messages between matched users
- Each message is linked to sender and match thread
- Message endpoints coming next

---

## 🧑‍💻 Tech Stack
- **Next.js** (App Router, TypeScript)
- **Prisma** ORM + PostgreSQL (via Railway)
- **NextAuth.js** for authentication
- **Tailwind CSS** for styling

---

## 🧪 API Routes Summary
| Method | Route                        | Description                         |
|--------|------------------------------|-------------------------------------|
| POST   | `/api/register`              | Register a new user                 |
| POST   | `/api/auth/[...nextauth]`    | Login (NextAuth)                    |
| POST   | `/api/profile`               | Create/update user profile          |
| POST   | `/api/like`                  | Like a user, auto-match detection   |
| GET    | `/api/matches`               | List of mutual matches              |
| GET    | `/api/users/explore`         | Users available for swiping         |


---

## 🖥️ Frontend Pages
| Route        | Description                 |
|--------------|-----------------------------|
| `/`          | Home (dynamic greeting)     |
| `/login`     | Login form                  |
| `/register`  | Registration form           |
| `/profile`   | Profile creation/edit       |
| `/explore`   | Browse and swipe on users   |
| `/matches`   | View all matches            |

---

## 📌 Next Up
- 💬 Message API routes (send/get by match)
- 💻 Chat UI per match
- 🔔 Notifications / Realtime updates

---

## 🛠 Dev Setup
1. Clone the repo
2. Create `.env` with `DATABASE_URL` and `NEXTAUTH_SECRET`
3. Run `pnpm install`
4. Run `npx prisma migrate dev`
5. Start dev server: `pnpm dev`


> Built with 💖 by Pedram
