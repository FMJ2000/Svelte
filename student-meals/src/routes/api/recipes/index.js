import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import("./__types/index").RequestHandler} */
export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        createdAt: "desc",
      },
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