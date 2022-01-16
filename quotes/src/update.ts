import { getChatTitle, setChatTitle } from "./telegram.ts";
import { getPrice } from "./yahoo.ts";

export function makeNewTitle(oldTitle: string, price: number): string | null {
  const candidates = [...oldTitle.matchAll(/\b\d+\.\d{2}\b/g)]
    .map((n) => +n)
    .filter((candidate) =>
      Math.max(candidate / price, price / candidate) < 1.3
    );

  if (candidates.length !== 1) {
    return null;
  }

  const candidate = candidates[0],
    trenders = [...oldTitle.matchAll(/(AT|Y|M|W|D)(H|L)\b/g)];

  if (trenders.length > 1) {
    return null;
  }

  if (trenders.length === 1) {
    if (trenders[0][2] === "L" && candidate < price) {
      return null;
    }

    if (trenders[0][2] === "H" && candidate > price) {
      return null;
    }
  }

  const newTitle = oldTitle.replace(candidate.toFixed(2), price.toFixed(2));

  return newTitle === oldTitle ? null : newTitle;
}

export async function update() {
  const chatId = Number(Deno.env.get("QUOTES_CHAT_ID")),
    ticker = Deno.env.get("QUOTES_TICKER") || "";

  const oldTitle: string = await getChatTitle(chatId),
    price: number = await getPrice(ticker),
    newTitle: string | null = makeNewTitle(oldTitle, price);

  if (newTitle) {
    await setChatTitle(chatId, newTitle);
  }
}
