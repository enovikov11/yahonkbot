import { makeNewTitle } from "../src/update.ts";
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";

const cases = [
  { oldTitle: "Чат 11.11", price: 11.11, newTitle: null },
  { oldTitle: "Чат 11.11", price: 110.12, newTitle: null },
  { oldTitle: "Чат 11.11 11.11", price: 11.12, newTitle: null },

  { oldTitle: "Чат 11.11", price: 11.12, newTitle: "Чат 11.12" },
  { oldTitle: "Чат 11.13", price: 11.12, newTitle: "Чат 11.12" },
  { oldTitle: "Чат (11.11)", price: 11.12, newTitle: "Чат (11.12)" },

  { oldTitle: "Чат 11.11", price: 11, newTitle: "Чат 11.00" },
  { oldTitle: "Чат 11.00", price: 12, newTitle: "Чат 12.00" },

  { oldTitle: "Чат 11.11 9999", price: 11.12, newTitle: "Чат 11.12 9999" },

  { oldTitle: "Чат ATH 11.11", price: 11.12, newTitle: "Чат ATH 11.12" },
  { oldTitle: "Чат ATH 11.13", price: 11.12, newTitle: null },

  { oldTitle: "Чат ATL 11.11", price: 11.12, newTitle: null },
  { oldTitle: "Чат ATL 11.13", price: 11.12, newTitle: "Чат ATL 11.12" },

  { oldTitle: "Чат 10WH 11.11", price: 11.12, newTitle: "Чат 10WH 11.12" },
  { oldTitle: "Чат 10WH 11.13", price: 11.12, newTitle: null },

  { oldTitle: "Чат 10WL 11.11", price: 11.12, newTitle: null },
  { oldTitle: "Чат 10WL 11.13", price: 11.12, newTitle: "Чат 10WL 11.12" },

  { oldTitle: "Чат ATH ATL 11.11", price: 11.12, newTitle: null },
  { oldTitle: "Чат ATH ATL 11.13", price: 11.12, newTitle: null },
];

cases.forEach(({ oldTitle, price, newTitle }) => {
  Deno.test(`${oldTitle} + ${price}`, () =>
    assertEquals(makeNewTitle(oldTitle, price), newTitle));
});
