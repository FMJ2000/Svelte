import { prisma } from "$lib/util";

/** @type {import("./__types/[id]").RequestHandler} */
export async function GET({ params }) {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id: params.id,
    },
    include: {
      ingredients: {
        select: {
          id: true,
          name: true,
          amount: true,
          unit: true,
        }
      },
      steps: {
        select: {
          index: true,
          description: true,
          duration: true,
        }
      },
    },
  });
  return {
    status: 200,
    body: { recipe },
  };
}

