type telegramApiRawOptions = {
  body: string;
  headers: { [key: string]: string };
};

// https://core.telegram.org/bots/api
async function telegramApiRaw(method: string, options: telegramApiRawOptions) {
  return await fetch(
    `https://api.telegram.org/bot${
      Deno.env.get("QUOTES_TELEGRAM_KEY")
    }/${method}`,
    { method: "POST", ...options },
  ).then((res) => res.json()).catch(() => ({ ok: false }));
}

async function telegramApi(method: string, params: any) {
  return await telegramApiRaw(method, {
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
  });
}

export async function getChatTitle(chatId: number): Promise<string> {
  const chatData = await telegramApi("getChat", { chat_id: chatId });

  if (typeof chatData?.result?.title !== "string") {
    throw new Error("Ошибка запроса названия");
  }

  return chatData?.result?.title;
}

export async function setChatTitle(chatId: number, title: string) {
  await telegramApi("setChatTitle", { chat_id: chatId, title });
}
