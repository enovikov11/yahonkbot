export async function getPrice(ticker: string): Promise<number> {
  const { quoteResponse } = await fetch(
    `https://yfapi.net/v6/finance/quote?symbols=${ticker}`,
    {
      headers: { "x-api-key": Deno.env.get("QUOTES_API_KEY") || "" },
    },
  ).then((res) => res.json());

  const price = quoteResponse?.result[0]?.regularMarketPrice;

  if (typeof price !== "number") {
    throw new Error("Ошибка запроса цены");
  }

  return price;
}
