import { PrismaClient } from "@prisma/client";
import { getAuthUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  context: { params: { matchId: string } }
) {
  const user = await getAuthUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { matchId } = context.params;

  // 🔍 Debug log (optional)
  console.log("🔑 User ID:", user.id);
  console.log("📬 Match ID:", matchId);

  // Confirm the user is part of the match
  const match = await prisma.match.findFirst({
    where: {
      id: matchId,
      OR: [
        { user1Id: user.id },
        { user2Id: user.id },
      ],
    },
  });

  if (!match) {
    console.warn("🚫 No match found or user not in match");
    return new Response("Forbidden", { status: 403 });
  }

  const messages = await prisma.message.findMany({
    where: { matchId },
    orderBy: { createdAt: "asc" },
    include: {
      sender: {
        select: { id: true, name: true },
      },
    },
  });

  return Response.json(messages);
}
