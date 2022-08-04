import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import("./__types/index").RequestHandler} */
export async function GET() {
  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: true,
      steps: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    status: 200,
    body: { recipes },
  };
}