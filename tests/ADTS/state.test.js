import { isPropBoolean } from "../../src/ADTS/state";

test("Testing isPropBoolean", () => {
  const props = {
    a: "String",
    b: false
  };
  expect(isPropBooleanOr("a", false).evalWith(props)).toBe(false);
});
