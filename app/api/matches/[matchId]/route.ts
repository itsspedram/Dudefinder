// app/api/matches/[matchId]/route.ts
import { PrismaClient } from "@prisma/client";
import { getAuthUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { matchId: string } }) {
  const user = await getAuthUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const match = await prisma.match.findFirst({
    where: {
      id: params.matchId,
      OR: [{ user1Id: user.id }, { user2Id: user.id }],
    },
    include: {
      user1: { include: { profile: true } },
      user2: { include: { profile: true } },
    },
  });

  if (!match) return new Response("Match not found", { status: 404 });

  const otherUser = match.user1Id === user.id ? match.user2 : match.user1;

  return Response.json({
    otherUser: {
      name: otherUser.name || 'Unknown',
      age: otherUser.profile?.age || null,
    },
  });
}
