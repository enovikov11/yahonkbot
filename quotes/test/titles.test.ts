import { makeNewTitle } from "../src/update.ts";
import { assertEquals } from "https://deno.land/std@0.121.0/testing/asserts.ts";

Deno.test("Смена названия", () => {
  assertEquals(makeNewTitle("Типо чатик 12.34", 13.24), "Типо чатик 13.24");
  assertEquals(makeNewTitle("Типо чатик 12.30", 13.24), "Типо чатик 13.24");
  assertEquals(makeNewTitle("Типо чатик 12.30", 130.24), null);
  assertEquals(makeNewTitle("Типо чатик 12.34 12.30", 13.24), null);
  assertEquals(
    makeNewTitle("Типо чатик 12.34 5678", 13.24),
    "Типо чатик 13.24 5678",
  );
  assertEquals(makeNewTitle("Типо чатик 12.34", 13), "Типо чатик 13.00");
  assertEquals(makeNewTitle("Типо чатик 14.00", 13), "Типо чатик 13.00");
  assertEquals(makeNewTitle("Типо чатик (12.34)", 13.24), "Типо чатик (13.24)");
});
