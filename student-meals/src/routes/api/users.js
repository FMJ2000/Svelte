import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import("./__types/users").RequestHandler} */
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
    body: user,
  };
}