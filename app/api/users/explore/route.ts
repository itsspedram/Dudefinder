import { PrismaClient } from "@prisma/client";
import { getAuthUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  const user = await getAuthUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    // 1. Get all user IDs you've liked
    const likes = await prisma.like.findMany({
      where: { fromUserId: user.id },
      select: { toUserId: true },
    });

    const likedIds = likes.map(like => like.toUserId);

    // 2. Get all matched user IDs
    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { user1Id: user.id },
          { user2Id: user.id },
        ],
      },
    });

    const matchedIds = matches.map(match =>
      match.user1Id === user.id ? match.user2Id : match.user1Id
    );

    // 3. Combine excluded user IDs
    const excludedIds = [...new Set([...likedIds, ...matchedIds, user.id])];

    // 4. Fetch swipeable users
    const usersToSwipe = await prisma.user.findMany({
      where: {
        id: { notIn: excludedIds },
      },
      include: {
        profile: true,
      },
    });

    return new Response(JSON.stringify(usersToSwipe), { status: 200 });
  } catch (err) {
    console.error("Explore feed error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
