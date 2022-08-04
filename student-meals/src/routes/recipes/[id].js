import { getCookie } from "$lib/util";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import("./__types/[id]").RequestHandler} */
export async function GET({ params }) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.id,
    },
    include: {
      ingredients: true,
      steps: true,
    },
  });
  return {
    status: 200,
    body: { recipe },
  };
}