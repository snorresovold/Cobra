import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std/testing/asserts.ts";

import Environment from "../runtime/environment.ts"; 

// Write your test cases
Deno.test("Declare and Lookup Variable in Same Environment", () => {
  const env = new Environment();

  const result = env.declareVar("x", { type: "number" });
  const lookupResult = env.lookupVar("x");

  assertEquals(result, { type: "number" });
  assertEquals(lookupResult, { type: "number" });
});

Deno.test("Assign and Lookup Variable in Same Environment", () => {
  const env = new Environment();

  env.declareVar("x", { type: "number" });
  const result = env.assignVar("x", { type: "number" });
  const lookupResult = env.lookupVar("x");

  assertEquals(result, { type: "number" });
  assertEquals(lookupResult, { type: "number" });
});
