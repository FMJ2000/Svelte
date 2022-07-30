import { writable } from "svelte/store";

/** @type {import(".pnpm/@auth0+auth0-spa-js@1.22.2/node_modules/@auth0/auth0-spa-js/dist/typings/global").User} */
let initUser = {};

export const isAuthenticated = writable(false);
export const user = writable(initUser);
export const popupOpen = writable(false);
export const error = writable();