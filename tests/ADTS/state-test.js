import expect from "expect";
import {
  isPropBoolean,
  isPropBooleanC,
  isPropNumber,
  isPropNumberC,
  isPropObject,
  isPropObjectC,
  isPropNonEmptyObject,
  isPropNonEmptyObjectC,
  isPropArray,
  isPropArrayC,
  isPropNonEmptyArray,
  isPropNonEmptyArrayC,
  isPropString,
  isPropStringC,
  isPropNonEmptyString,
  isPropNonEmptyStringC
} from "../../src/ADTS/state";

/**
 *Testing the boolean props
 *BEGIN
 */
const props = {
  a: "String",
  b: false,
  identityObj: {},
  identityArr: []
};

describe("Testing isPropString", () => {
  it("It returns empty string when a non string prop is requested", () => {
    expect(isPropString("b", "").evalWith(props)).toEqual("");
  });
});

describe("Testing isPropString", () => {
  it("It returns empty string when a non empty string prop is requested", () => {
    expect(isPropStringC("b", "")(props)).toEqual("");
  });
});

describe("Testing isPropNonEmptyString", () => {
  it("It returns hello when a non empty string prop is required", () => {
    expect(isPropNonEmptyString("b", "hello").evalWith(props)).toBe("hello");
  });
});

describe("Testing isPropNonEmptyStringC", () => {
  it("It returns hello when a non empty string props is required", () => {
    expect(isPropNonEmptyStringC("b", "hello")(props)).toBe("hello");
  });
});

describe("Testing isPropBoolean", () => {
  it("It returns false when a non bool prop is requested", () => {
    expect(isPropBoolean("a", false).evalWith(props)).toBe(false);
  });
});

describe("Testing isPropBooleanC", () => {
  it("returns false when a non bool prop is requested", () => {
    expect(isPropBooleanC("a", false)(props)).toBe(false);
  });
});

/**
 *Testing the boolean props
 *END
 */

/**
 *Testing int props
 * BEGIN
 */
describe("Testing isPropNumber", () => {
  it("returns 1 when a non int prop is requested", () => {
    expect(isPropNumber("a", 1).evalWith(props)).toBe(1);
  });
});

describe("Testing isPropNumberC", () => {
  it("returns 1 when a non int prop is requested", () => {
    expect(isPropNumberC("a", 1)(props)).toBe(1);
  });
});

/**
 *Testing int props
 * END
 */

/**
 *Testing object props
 * BEGIN
 */

describe("Testing isPropObject", () => {
  it("returns Empty Object {} when non object prop is requested", () => {
    expect(isPropObject("a", {}).evalWith(props)).toEqual({});
  });
});

describe("Testing isPropObjectC", () => {
  it("returns Empty Object {} when non object prop is requested", () => {
    expect(isPropObjectC("a", {})(props)).toEqual({});
  });
});

describe("Testing isPropNonEmptyObject", () => {
  it("returns {a: 12} when empty obj prop is requested", () => {
    expect(
      isPropNonEmptyObject("identityObj", { a: 12 }).evalWith(props)
    ).toEqual({
      a: 12
    });
  });
});

describe("Testing isPropNonEmptyObjectC", () => {
  it("returns {a: 12} when empty obj prop is requested", () => {
    expect(isPropNonEmptyObjectC("identityObj", { a: 12 })(props)).toEqual({
      a: 12
    });
  });
});

/**
 *Testing object props
 * END
 */

/**
 *Testing array props
 * BEGIN
 */

describe("Testing isPropArray", () => {
  it("returns [] when nonarrayprop is requested", () => {
    expect(isPropArray("a", []).evalWith(props)).toEqual([]);
  });
});

describe("Testing isPropArrayC", () => {
  it("returns [] when nonarrayprop is requested", () => {
    expect(isPropArrayC("a", [])(props)).toEqual([]);
  });
});

describe("Testing isPropNonEmptyArray", () => {
  it("returns [1,2,3] when empty array or non empty prop is requested", () => {
    expect(
      isPropNonEmptyArray("identityArr", [1, 2, 3]).evalWith(props)
    ).toEqual([1, 2, 3]);
  });
});

describe("Testing isPropNonEmptyArrayC", () => {
  it("returns [1,2,3] when empty array or non empty prop is requested", () => {
    expect(isPropNonEmptyArrayC("identityArr", [1, 2, 3])(props)).toEqual([
      1,
      2,
      3
    ]);
  });
});
