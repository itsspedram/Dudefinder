import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
      gender: 'woman',
      lookingFor: 'man',
      age: 24,
      bio: 'I love books and beaches 🌊📚',
      images: ['https://randomuser.me/api/portraits/women/1.jpg'],
    },
    {
      name: 'Bob',
      email: 'bob@example.com',
      password: 'password123',
      gender: 'man',
      lookingFor: 'woman',
      age: 28,
      bio: 'Coffee, code, and cuddles ☕💻',
      images: ['https://randomuser.me/api/portraits/men/1.jpg'],
    },
    {
      name: 'Charlie',
      email: 'charlie@example.com',
      password: 'password123',
      gender: 'man',
      lookingFor: 'both',
      age: 30,
      bio: 'Let’s go hiking 🥾🌲',
      images: ['https://randomuser.me/api/portraits/men/2.jpg'],
    },
    {
      name: 'Diana',
      email: 'diana@example.com',
      password: 'password123',
      gender: 'woman',
      lookingFor: 'woman',
      age: 27,
      bio: 'Dog mom 🐶, plant lover 🌱',
      images: ['https://randomuser.me/api/portraits/women/2.jpg'],
    },
  ];

  for (const user of users) {
    const hashedPassword = await hash(user.password, 10);

    const created = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        profile: {
          create: {
            bio: user.bio,
            age: user.age,
            gender: user.gender,
            lookingFor: user.lookingFor,
            images: user.images,
          },
        },
      },
    });

    console.log(`✅ Created user: ${created.name}`);
  }
}

main().finally(() => prisma.$disconnect());
