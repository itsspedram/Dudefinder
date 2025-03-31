# 💘 Dudefinder

Dudefinder is a full-stack dating app built with **Next.js (App Router)**, **Prisma**, **PostgreSQL**, and **NextAuth**. Users can register, create profiles, explore matches, like others, and chat if matched.

---

## ✅ Features Completed

### Authentication
- Register/login with email & password using NextAuth.js
- Session-based UI

### User Profiles
- Bio, age, gender, images
- Preferences (looking for: man/woman/both)

### Explore & Match
- See filtered users based on preference
- Like users, detect mutual likes → auto-create match
- Only matched users can access chats

### Messaging
- Chat between matched users
- Full GET/POST API with match validation
- Frontend UI for sending and reading messages
- Error handling for unauthorized access
- Real-time feel (soon to be improved)

### UI & UX
- Reusable button with loading state
- Session-aware navbar with conditional links
- Global route loading spinner
- Form loading feedback

---

## 🔧 API Routes
| Method | Route                        | Description                      |
|--------|------------------------------|----------------------------------|
| POST   | `/api/register`              | Register a new user              |
| POST   | `/api/auth/[...nextauth]`    | Handle login/logout              |
| POST   | `/api/profile`               | Create or update profile         |
| POST   | `/api/like`                  | Like a user                      |
| GET    | `/api/matches`               | Get matched users                |
| GET    | `/api/users/explore`         | Get users based on preferences   |
| GET    | `/api/messages/[matchId]`    | Fetch chat messages in match     |
| POST   | `/api/messages`              | Send chat message to match       |

---

## 🖥️ Pages
| Route           | Purpose                    |
|------------------|-----------------------------|
| `/`             | Home                       |
| `/login`        | Login                      |
| `/register`     | Register                   |
| `/profile`      | Edit user profile          |
| `/explore`      | Discover and like users    |
| `/matches`      | See matches + start chat   |
| `/chat/[matchId]` | Chat with matched user     |

---

## 🚀 Dev Setup
```bash
pnpm install
npx prisma migrate dev
pnpm dev
```

Create `.env` file with:
```
DATABASE_URL=...
NEXTAUTH_SECRET=...
```

---

## 🧠 Recent Fixes & Progress
- Fixed critical mismatch bug between `matchId` vs `userId` in chat logic
- Backend now validates match ownership correctly
- Chat now fully works for both sides after match
- Match list returns actual match ID

---

## 🎯 Next Ideas
- Auto-refresh chat (polling or sockets)
- Chat header with partner's name and avatar
- Match preview with latest message
- Swipe UI for explore page
- Notifications & toast system

---
> Built with ❤️ by Pedram and lots of console logs
