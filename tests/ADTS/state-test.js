import expect from "expect";
import {
  getBoolean,
  getBooleanC,
  getNumber,
  getNumberC,
  getObject,
  getObjectC,
  getNonEmptyObject,
  getNonEmptyObjectC,
  getArray,
  getArrayC,
  getNonEmptyArray,
  getNonEmptyArrayC,
  getString,
  getStringC,
  getNonEmptyString,
  getNonEmptyStringC
} from "../../src/ADTS/state";

const props = {
  a: "String",
  b: false,
  identityObj: {},
  identityArr: []
};

/**
 *Testing the boolean props
 *BEGIN
 */

describe("Testing getString", () => {
  it("It returns empty string when a non string prop is requested", () => {
    expect(getString("b", "").evalWith(props)).toEqual("");
  });
});

describe("Testing getString", () => {
  it("It returns empty string when a non empty string prop is requested", () => {
    expect(getStringC("b", "")(props)).toEqual("");
  });
});

describe("Testing getNonEmptyString", () => {
  it("It returns hello when a non empty string prop is required", () => {
    expect(getNonEmptyString("b", "hello").evalWith(props)).toBe("hello");
  });
});

describe("Testing getNonEmptyStringC", () => {
  it("It returns hello when a non empty string props is required", () => {
    expect(getNonEmptyStringC("b", "hello")(props)).toBe("hello");
  });
});

describe("Testing getBoolean", () => {
  it("It returns false when a non bool prop is requested", () => {
    expect(getBoolean("a", false).evalWith(props)).toBe(false);
  });
});

describe("Testing getBooleanC", () => {
  it("returns false when a non bool prop is requested", () => {
    expect(getBooleanC("a", false)(props)).toBe(false);
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
describe("Testing getNumber", () => {
  it("returns 1 when a non int prop is requested", () => {
    expect(getNumber("a", 1).evalWith(props)).toBe(1);
  });
});

describe("Testing getNumberC", () => {
  it("returns 1 when a non int prop is requested", () => {
    expect(getNumberC("a", 1)(props)).toBe(1);
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

describe("Testing getObject", () => {
  it("returns Empty Object {} when non object prop is requested", () => {
    expect(getObject("a", {}).evalWith(props)).toEqual({});
  });
});

describe("Testing getObjectC", () => {
  it("returns Empty Object {} when non object prop is requested", () => {
    expect(getObjectC("a", {})(props)).toEqual({});
  });
});

describe("Testing getNonEmptyObject", () => {
  it("returns {a: 12} when empty obj prop is requested", () => {
    expect(getNonEmptyObject("identityObj", { a: 12 }).evalWith(props)).toEqual(
      {
        a: 12
      }
    );
  });
});

describe("Testing getNonEmptyObjectC", () => {
  it("returns {a: 12} when empty obj prop is requested", () => {
    expect(getNonEmptyObjectC("identityObj", { a: 12 })(props)).toEqual({
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

describe("Testing getArray", () => {
  it("returns [] when nonarrayprop is requested", () => {
    expect(getArray("a", []).evalWith(props)).toEqual([]);
  });
});

describe("Testing getArrayC", () => {
  it("returns [] when nonarrayprop is requested", () => {
    expect(getArrayC("a", [])(props)).toEqual([]);
  });
});

describe("Testing getNonEmptyArray", () => {
  it("returns [1,2,3] when empty array or non empty prop is requested", () => {
    expect(getNonEmptyArray("identityArr", [1, 2, 3]).evalWith(props)).toEqual([
      1,
      2,
      3
    ]);
  });
});

describe("Testing getNonEmptyArrayC", () => {
  it("returns [1,2,3] when empty array or non empty prop is requested", () => {
    expect(getNonEmptyArrayC("identityArr", [1, 2, 3])(props)).toEqual([
      1,
      2,
      3
    ]);
  });
});
