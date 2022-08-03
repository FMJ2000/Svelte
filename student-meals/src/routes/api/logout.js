/** @type {import("./__types/logout").RequestHandler} */
export async function POST({ request }) {
  return {
    status: 200,
    headers: {
      "set-cookie": `token=""; path=/; HttpOnly; max-age=0`,
    },
    body: {
      ok: true,
    },
  };
}

/** @type {import("./__types/logout").RequestHandler} */
export async function GET({ request }) {
  return {
    status: 200,
  }
}