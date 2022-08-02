import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import("./__types/index").RequestHandler} */
export async function GET({ request }) {
  console.log(request.headers);
  /** @type {import("$lib/global").Recipe[]} */
  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: true,
      steps: true,
    }
  });
  return {
    status: 200,
    body: { recipes },
  };
}