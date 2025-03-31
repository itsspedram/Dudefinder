import { PrismaClient } from "@prisma/client";
import { getAuthUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    const { toUserId } = await req.json();
    if (!toUserId) return new Response("Missing toUserId", { status: 400 });

    // 1. Check if already liked
    const alreadyLiked = await prisma.like.findFirst({
      where: {
        fromUserId: user.id,
        toUserId,
      },
    });

    if (alreadyLiked) {
      return new Response(JSON.stringify({ match: false, message: "Already liked" }), { status: 200 });
    }

    // 2. Create the like
    await prisma.like.create({
      data: {
        fromUserId: user.id,
        toUserId,
      },
    });

    // 3. Check if the other user already liked back
    const mutualLike = await prisma.like.findFirst({
      where: {
        fromUserId: toUserId,
        toUserId: user.id,
      },
    });

    if (mutualLike) {
      // 4. Avoid duplicate match
      const existingMatch = await prisma.match.findFirst({
        where: {
          OR: [
            { user1Id: user.id, user2Id: toUserId },
            { user1Id: toUserId, user2Id: user.id },
          ],
        },
      });

      if (!existingMatch) {
        await prisma.match.create({
          data: {
            user1Id: user.id,
            user2Id: toUserId,
          },
        });
      }

      return new Response(JSON.stringify({ match: true }), { status: 201 });
    }

    return new Response(JSON.stringify({ match: false }), { status: 201 });
  } catch (err) {
    console.error("Like API error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
