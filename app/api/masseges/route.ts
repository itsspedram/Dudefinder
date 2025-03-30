import { PrismaClient } from "@prisma/client";
import { getAuthUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { matchId, text } = await req.json();

  if (!matchId || !text) return new Response("Missing fields", { status: 400 });

  // Confirm this user is part of the match
  const match = await prisma.match.findFirst({
    where: {
      id: matchId,
      OR: [
        { user1Id: user.id },
        { user2Id: user.id },
      ],
    },
  });

  if (!match) return new Response("Forbidden", { status: 403 });

  const message = await prisma.message.create({
    data: {
      senderId: user.id,
      matchId,
      text,
    },
  });

  return Response.json(message);
}
