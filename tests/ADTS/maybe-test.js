import expect from "expect";

import {
  findString,
  findStringC,
  findNumber,
  findNumberC,
  findObject,
  findObjectC,
  findArray,
  findArrayC
} from "../../src/ADTS/maybe";

const props = {
  a: "String",
  b: false,
  identityObj: {},
  identityArr: [],
  arrWithObj: [{ a: 12 }],
  arrWithStrings: ["Tev", "Tre"],
  arrWithNumbers: [1, 2, 3, 4],
  arrWithArrs: [[1, 2], [1, 3], [3, 4]]
};

describe("Testing findObj", () => {
  it("It returns the object if it exists", () => {
    expect(findObject({ a: 12 })(props.arrWithObj).option({ a: 1 })).toEqual({
      a: 12
    });
  });
  it("It returns the default option if object doesnt exist", () => {
    expect(
      findObject({ a: 11 })(props.arrWithObj).option({
        a: 1
      })
    ).toEqual({ a: 1 });
  });
});

describe("Testing findObjectC", () => {
  it("It returns the object if it Exists", () => {
    expect(findObjectC({ a: 12 }, { a: 1 })(props.arrWithObj)).toEqual({
      a: 12
    });
  });
  it("It returns the default if obj isnt available", () => {
    expect(findObjectC({ a: 11 }, { a: 1 })(props.arrWithObj)).toEqual({
      a: 1
    });
  });
});

describe("Testing findString", () => {
  it("It returns the string if its in the array", () => {
    expect(findString("Tev")(props.arrWithStrings).option("")).toEqual("Tev");
  });
});

describe("Testing findStringC", () => {
  it("It returns the string if its in the array", () => {
    expect(findStringC("Tev", "T")(props.arrWithStrings)).toEqual("Tev");
  });
});

describe("Testing findNumber", () => {
  it("It returns the number if it is in the array", () => {
    expect(findNumber(1)(props.arrWithNumbers).option(12)).toEqual(1);
  });
});

describe("Testing findNumberC", () => {
  it("It returns the number if it is in the array", () => {
    expect(findNumberC(1, 12)(props.arrWithNumbers)).toEqual(1);
  });
});

describe("Testing findArray", () => {
  it("It returns the [arr] if it is in the arrayContainer", () => {
    expect(findArray([1, 2])(props.arrWithArrs).option([])).toEqual([1, 2]);
  });
});

describe("Testing findArrayC", () => {
  it("It returns the [arr] if it is in the arrayContainer", () => {
    expect(findArrayC([1, 2], [])(props.arrWithArrs)).toEqual([1, 2]);
  });

  it("It returns the default [] if it is in not in arrayContainer", () => {
    expect(findArrayC([1, 5], [])(props.arrWithArrs)).toEqual([]);
  });
});
