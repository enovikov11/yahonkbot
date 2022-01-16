import { getChatTitle, setChatTitle } from "./telegram.ts";
import { getPrice } from "./yahoo.ts";

const chatId = Number(Deno.env.get("QUOTES_CHAT_ID")),
  ticker = Deno.env.get("QUOTES_TICKER") || "";

export function makeNewTitle(oldTitle: string, price: number): string | null {
  const candidates = [...oldTitle.matchAll(/\b\d+\.\d{2}\b/g)]
    .map((n) => +n)
    .filter((candidate) =>
      Math.max(candidate / price, price / candidate) < 1.3
    );

  return candidates.length === 1
    ? oldTitle.replace(candidates[0].toFixed(2), price.toFixed(2))
    : null;
}

export async function update() {
  const oldTitle: string = await getChatTitle(chatId),
    price: number = await getPrice(ticker),
    newTitle: string | null = makeNewTitle(oldTitle, price);

  if (newTitle) {
    await setChatTitle(chatId, newTitle);
  }
}
