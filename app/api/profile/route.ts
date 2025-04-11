import { PrismaClient } from "@prisma/client";
import { getAuthUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const user = await getAuthUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    return new Response(JSON.stringify(profile), { status: 200 });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return new Response("Error fetching profile", { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  try {
    const { bio, age, gender, images, lookingFor } = await req.json();

    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      update: { bio, age, gender, images, lookingFor },
      create: {
        userId: user.id,
        bio,
        age,
        gender,
        images,
        lookingFor
      },
    });

    return new Response(JSON.stringify(profile), { status: 200 });
  } catch (error) {
    console.error("Profile save error:", error);
    return new Response("Error saving profile", { status: 500 });
  }
}
