import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

/** 
 * @param {string} cookies
 * @param {string} name
 */
export function getCookie(cookies, name) {
  const namePos = cookies.indexOf(name);
  const endNamePos = cookies.indexOf(";", namePos+1);
  const nameSub = cookies.substring(namePos, endNamePos > namePos ? endNamePos : cookies.length);
  return nameSub.substring(name.length + 1);
}

