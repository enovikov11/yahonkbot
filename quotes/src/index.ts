import { update } from "./update.ts";

setInterval(() => update().catch(console.error), 20 * 60 * 1000);
update().catch(console.error);
