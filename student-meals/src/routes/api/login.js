import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import("./__types/login").RequestHandler} */
export async function POST({ request }) {
  /** @type {import("$lib/global").User} */
  const data = await request.json();
  const user = await prisma.user.upsert({
    where: {
      id: data.id,
    },
    update: {},
    create: data,
  });
  return {
    status: 200,
    headers: {
      "set-cookie": `token=${user.id}; path=/; HttpOnly; max-age=31536000`,
    },
    body: user,
  };
}