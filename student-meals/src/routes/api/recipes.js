import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import("./__types/recipe").RequestHandler} */
export async function GET() {
  /** @type {import("$lib/global").Recipe[]} */
  const recipes = await prisma.recipe.findMany({
    include: {
      steps: true,
      ingredients: true,
    }
  });
  return {
    status: 200,
    body: { recipes },
  };
}