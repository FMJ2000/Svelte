import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import("./__types/[id]").RequestHandler} */
export async function GET({ params }) {
  try {
    const recipes = await prisma.recipe.findUnique({
      where: {
        id: params.id,
      }
    });
    return {
      status: 200,
      body: recipes,
    }
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      body: JSON.stringify(err),
    };
  }
}