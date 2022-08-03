import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import("./__types/user").RequestHandler} */
export async function GET({ request }) {
  try {
    //console.log(request);
    const recipes = await prisma.recipe.findMany({
      where: {
        userId: request.headers.get("userId") || "",
      },
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