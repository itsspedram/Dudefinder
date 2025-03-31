// README.md (project root)
# 💘 Dudefinder

Dudefinder is a full-stack dating app built with **Next.js (App Router)**, **Prisma**, **PostgreSQL**, and **NextAuth**. Users can register, create profiles, explore matches, swipe/like, and chat with real-time UI feedback.

---

## ✅ Features Completed

### Authentication
- User registration and login with credentials
- Session management using NextAuth (JWT based)

### User Profiles
- Create and edit profile with:
  - Name, bio, age, gender, image URLs
  - Looking for (man, woman, or both)

### Swiping System
- Like/unlike users
- Auto-create Match when two users like each other
- Prevent duplicate match records

### Match List & Filtering
- View list of mutual matches
- Explore feed filtered by gender preference

### Messaging
- Chat UI between matched users
- Message APIs to send and fetch messages

### UI Enhancements
- Global route loading indicator
- Button-level spinners for async actions
- Conditional rendering and auth-aware interface

---

## 🛠️ Tech Stack
- **Next.js (App Router + TypeScript)**
- **Prisma ORM** with PostgreSQL (hosted on Railway)
- **NextAuth.js** for authentication
- **Tailwind CSS** for styling

---

## 📦 API Routes Summary
| Method | Route                    | Description                      |
|--------|--------------------------|----------------------------------|
| POST   | `/api/register`          | Register a new user              |
| POST   | `/api/auth/[...nextauth]`| Login (NextAuth)                 |
| POST   | `/api/profile`           | Create/update user profile       |
| POST   | `/api/like`              | Like another user                |
| GET    | `/api/matches`           | Get list of matched users        |
| GET    | `/api/users/explore`     | Explore users for swiping        |
| GET    | `/api/messages/:matchId` | Get messages in a match thread   |
| POST   | `/api/messages`          | Send message to a match thread   |

---

## 🖥️ Frontend Pages
| Route         | Description                     |
|---------------|---------------------------------|
| `/`           | Home page with session info     |
| `/login`      | Login form                     |
| `/register`   | Registration form              |
| `/profile`    | Create/edit your profile       |
| `/explore`    | Swipe and like users           |
| `/matches`    | View matched users             |
| `/chat/[id]`  | Chat screen per matched user   |

---

## 🚀 Dev Setup
1. Clone the repo
2. Install dependencies: `pnpm install`
3. Create `.env` with `DATABASE_URL` and `NEXTAUTH_SECRET`
4. Run DB migration: `npx prisma migrate dev`
5. Start dev server: `pnpm dev`

---

## ✨ Next Up (Optional Ideas)
- Add image uploads (Cloudinary or UploadThing)
- Realtime messaging (Socket.IO or polling)
- Match previews with last message
- Toasts for match & message alerts

> Built with ❤️ by Pedram 
