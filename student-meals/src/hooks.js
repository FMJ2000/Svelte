import cookie from "cookie";

export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get("cookie") || "");
  event.locals.token = cookies.token;
  return await resolve(event);
}

export function getSession({ locals }) {
  return {
    token: locals.token,
  };
}