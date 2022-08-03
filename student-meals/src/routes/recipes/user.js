import { getCookie } from "$lib/util";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import("./__types/user").RequestHandler} */
export async function GET({ request }) {
  const token = getCookie(request.headers.get("cookie") || "", "token");
  const recipes = await prisma.recipe.findMany({
    where: {
      userId: token,
    },
    include: {
      ingredients: true,
      steps: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(recipes);
  return {
    status: 200,
    body: { recipes },
  };
}