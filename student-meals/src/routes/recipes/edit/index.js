import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import("./__types/index").RequestHandler} */
export async function POST({ request }) {
  /** @type {any} */
  const data = await request.json();
  data.steps = { create: data.steps.map((step, index) => { return {...step, index: index}; }) };
  data.ingredients = { create: data.ingredients };
  /** @type {import("$lib/global").Recipe} */
  const recipe = await prisma.recipe.upsert({
    where: {
      id: data.id,
    },
    create: data,
    update: data,
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