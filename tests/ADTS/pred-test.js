import expect from "expect";

// import the predicate fns
import {
  doesPropExist,
  doesPropExistC,
  isObjectPropTrue,
  isObjectPropTrueC,
  isPropString,
  isPropNonEmptyString,
  isPropNonEmptyStringC,
  isPropStringC,
  isPropTrue,
  isPropTrueC,
  isPropEqual,
  isPropEqualC
} from "../../src/ADTS/pred";

const props = {
  a: "String",
  b: false,
  identityObj: {},
  identityArr: []
};

describe("Testing doesPropExist", () => {
  it("It returns false if prop doesnt exist", () => {
    expect(doesPropExist("c").runWith(props)).toEqual(false);
  });
});

describe("Testing doesPropExistC", () => {
  it("It returns false if prop does't exist", () => {
    expect(doesPropExistC("c")(props)).toEqual(false);
  });
});

describe("Testing isObjectPropTrue", () => {
  it("It returns false if prop value isnt true", () => {
    expect(isObjectPropTrue("c").runWith(props)).toEqual(false);
    expect(isObjectPropTrue("b").runWith(props)).toEqual(false);
  });
});

describe("Testing isObjectPropTrueC", () => {
  it("It returns false if the prop value isnt true", () => {
    expect(isObjectPropTrueC("a")(props)).toEqual(false);
  });
});

describe("Testing isPropString", () => {
  it("It returns false if prop value isnt a string", () => {
    expect(isPropString.runWith(props)).toEqual(false);
  });
});

describe("Testing isPropStringC", () => {
  it("It returns false if prop value isnt a string", () => {
    expect(isPropStringC(props)).toEqual(false);
  });
});

describe("Testing isPropNonEmptyString", () => {
  it("It returns false if prop value isnt a string", () => {
    expect(isPropNonEmptyString.runWith(props)).toEqual(false);
  });
});

describe("Testing isPropNonEmptyStringC", () => {
  it("It returns false if prop value isnt a string", () => {
    expect(isPropNonEmptyStringC(props)).toEqual(false);
  });
});

describe("Testing isPropTrue", () => {
  it("It returns false if prop value isnt true", () => {
    expect(isPropTrue.runWith(props)).toEqual(false);
  });
});

describe("Testing isPropTrueC", () => {
  it("It returns false if prop value isnt true", () => {
    expect(isPropTrueC(props)).toEqual(false);
  });
});

//equality test
describe("Testing isPropEqual", () => {
  it("It returns true if props are equal", () => {
    expect(isPropEqual(props).runWith(props)).toEqual(true);
  });
  it("It returns false if props are not equal", () => {
    expect(isPropEqual("Stringify").runWith(props.a)).toEqual(false);
  });
});

describe("Testing isPropEqualC", () => {
  it("It returns true if props are equal", () => {
    expect(isPropEqualC(props)(props)).toEqual(true);
  });
});
