import { PrismaClient } from "@prisma/client";
import { getAuthUser } from "@/lib/auth"

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    const { bio, age, gender, images } = await req.json();

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: { bio, age, gender, images },
      create: {
        userId: user.id,
        bio,
        age,
        gender,
        images,
      },
    });

    return new Response(JSON.stringify(profile), { status: 200 });
  } catch (error) {
    console.error("Profile error:", error);
    return new Response("Error creating profile", { status: 500 });
  }
}
