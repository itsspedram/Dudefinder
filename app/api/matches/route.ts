import { PrismaClient } from "@prisma/client";
import { getAuthUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET() {
  const user = await getAuthUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { user1Id: user.id },
          { user2Id: user.id },
        ],
      },
      include: {
        user1: {
          include: { profile: true },
        },
        user2: {
          include: { profile: true },
        },
      },
    });

    // Filter to return the matched *other* user's info only
    const result = matches.map((match) => {
      const otherUser = match.user1Id === user.id ? match.user2 : match.user1;
      return {
        id: otherUser.id,
        name: otherUser.name,
        email: otherUser.email,
        profile: otherUser.profile,
        matchedAt: match.createdAt,
        matchId: match.id,
      };
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("Match list error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
