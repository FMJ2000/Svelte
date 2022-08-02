/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
  return {
    user: event.locals.user
  }
}