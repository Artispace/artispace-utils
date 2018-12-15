import expect from "expect";
import { Just } from "crocks/Maybe";

import {
  findAny,
  findAnyC,
  findAnyWithPred,
  findAnyWithPredC,
  valInPath,
  valInPathC
} from "../../src/ADTS/maybe";

import { isPropEqual } from "../../src/ADTS/pred";

const props = {
  a: "String",
  b: false,
  identityObj: {},
  identityArr: [],
  arrWithObj: [{ a: 12 }],
  arrWithStrings: ["Tev", "Tre"],
  arrWithNumbers: [1, 2, 3, 4],
  arrWithArrs: [[1, 2], [1, 3], [3, 4]],
  arrWithId: [{ id: 1 }, { id: 2 }, { id: 32 }],
  validatePath: {
    first: {
      val: 12,
      second: {
        plus: 1,
        third: 13
      }
    }
  }
};

describe("Testing findAny", () => {
  it("It returns the object if it exists", () => {
    expect(findAny({ a: 12 })(props.arrWithObj).option({ a: 1 })).toEqual({
      a: 12
    });
  });
  it("It returns the default option if object doesnt exist", () => {
    expect(
      findAny({ a: 11 })(props.arrWithObj).option({
        a: 1
      })
    ).toEqual({ a: 1 });
  });
  it("It returns the object if it Exists", () => {
    expect(findAnyC({ a: 12 }, { a: 1 })(props.arrWithObj)).toEqual({
      a: 12
    });
  });
  it("It returns the default if obj isnt available", () => {
    expect(findAnyC({ a: 11 }, { a: 1 })(props.arrWithObj)).toEqual({
      a: 1
    });
  });
  it("It returns the string if its in the array", () => {
    expect(findAnyC("Tev", "T")(props.arrWithStrings)).toEqual("Tev");
  });
  it("It returns the string if its in the array", () => {
    expect(findAny("Tev")(props.arrWithStrings).option("")).toEqual("Tev");
  });
  it("It returns the number if it is in the array", () => {
    expect(findAny(1)(props.arrWithNumbers).option(12)).toEqual(1);
  });
  it("It returns the number if it is in the array", () => {
    expect(findAnyC(1, 12)(props.arrWithNumbers)).toEqual(1);
  });
  it("It returns the [arr] if it is in the arrayContainer", () => {
    expect(findAny([1, 2])(props.arrWithArrs).option([])).toEqual([1, 2]);
  });
  it("It returns the [arr] if it is in the arrayContainer", () => {
    expect(findAnyC([1, 2], [])(props.arrWithArrs)).toEqual([1, 2]);
  });
  it("It returns the default [] if it is in not in arrayContainer", () => {
    expect(findAnyC([1, 5], [])(props.arrWithArrs)).toEqual([]);
  });
});

const eq = n => isPropEqual(n).contramap(({ id }) => id);

describe("Testing findAnyWithhPred", () => {
  it("It retuns Obj in the array matching the id", () => {
    expect(findAnyWithPred(props.arrWithId)(eq(32)).option(1)).toEqual({
      id: 32
    });
  });
});

describe("Testing findAntWithPredC", () => {
  it("It returns Obj in the array matching the id", () => {
    expect(findAnyWithPredC(props.arrWithId, { id: 1 })(eq(32))).toEqual({
      id: 32
    });
  });
});

describe("Testing valInPath", () => {
  it("It returns A Just of the value at the last element in the path", () => {
    expect(valInPath(["validatePath", "first", "val"])(props)).toEqual(
      Just(12)
    );
  });
  it("It returns a Just after chaining", () => {
    expect(
      valInPath(["validatePath"])(props).chain(valInPath(["first"]))
    ).toEqual(
      Just({
        val: 12,
        second: {
          plus: 1,
          third: 13
        }
      })
    );
  });
});

describe("Testing valInPathC", () => {
  it("It returns a value 12 at the last element in the path", () => {
    expect(valInPathC(["validatePath", "first", "val"], 12)(props)).toEqual(12);
  });
});
