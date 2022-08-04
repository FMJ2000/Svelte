import { getCookie } from "$lib/util";
import { prisma } from "$lib/util";

/** @type {import("./__types/[id]").RequestHandler} */
export async function POST({ params, request }) {
  /** @type {import("$lib/global").Recipe} */
  const data = await request.json();
  await Promise.all(data.steps.map((step, index) => prisma.step.upsert({
    where: {
      recipeId_index: {
        recipeId: params.id,
        index: index || 0,
      },
    },
    create: {
      index: index,
      recipeId: params.id,
      description: step.description,
      duration: step.duration,
    },
    update: {
      description: step.description,
      duration: step.duration,
    },
  })));
  await Promise.all(data.ingredients.map((ingredient, index) => prisma.ingredient.upsert({
    where: {
      id: ingredient.id || "",
    },
    create: {
      recipeId: params.id,
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
    },
    update: {
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
    },
  })));
  /** @type {import("$lib/global").Recipe} */
  const recipe = await prisma.recipe.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      description: data.description,
      picture: data.picture,
    },
    include: {
      ingredients: true,
      steps: true,
    },
  });
  return {
    status: 200,
    body: recipe,
  };
}


/** @type {import("./__types/[id]").RequestHandler} */
export async function DELETE({ request, params }) {
  const token = getCookie(request.headers.get("cookie") || "", "token");
  if (await prisma.recipe.count({
    where: {
      id: params.id,
      userId: token,
    }
  }) > 0) {
    await prisma.recipe.delete({
      where: {
        id: params.id,
      },
    });
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
    return {
      status: 200,
      body: recipes,
    };
  }
  return {
    status: 403,
  }
}