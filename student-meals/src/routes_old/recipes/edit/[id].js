import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/** @type {import("./__types/[id]").RequestHandler} */
export async function GET({ params }) {
  try {
    let auth0 = await createClient();
    console.log(auth0);
    let user = await auth0.getTokenSilently();
    console.log(user);
    let recipe = {
      userId: $user.id,
      name: "",
      description: "",
      picture: `https://picsum.photos/id/${Math.floor(Math.random()*1000)}/128/128`,
      steps: [{
        description: "",
        duration: 1.0,
      }],
      ingredients: [{
        name: "",
        amount: 1.0,
        unit: "p",
      }],
    }
    if (params.id) {
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
  } catch (err) {
    console.error(err);
    return {
      status: 500,
    }
  }
  

  
}