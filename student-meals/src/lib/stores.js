import { writable } from "svelte/store";

/** @type {import(".pnpm/svelte@3.49.0/node_modules/svelte/types/runtime/store/index").Writable<import("$lib/global").User | null>} */
export const user = writable(null);
