import expect from "expect";

import { nestObject, deleteNestedObjectProps } from "../../src/Utils";

describe("Testing nestObject", () => {
  it("It returns new matched Object", () => {
    expect(nestObject({}, ["a"], 12)).toEqual({ a: 12 });
  });
});

describe("Testing deleteNestedObjectProps", () => {
  it("It should delete obj prop a", () => {
    expect(deleteNestedObjectProps({ a: 12, b: 10 }, ["a"])).toEqual({ b: 10 });
  });
});
