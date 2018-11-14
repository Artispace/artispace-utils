// @flow
import find from "crocks/Maybe/find";
import compose from "crocks/helpers/compose";
import option from "crocks/pointfree/option";
import { isPropEqual } from "./pred";

type Maybetype = (
  prop: any
) => {
  map: () => any,
  concat: () => any,
  option: () => any
};

type ObjectList = Array<Object>;
type StringList = Array<string>;
type NumberList = Array<number>;

// STRING
//findString :: string -> Array<string> -> string
export const findString = (str: string) => (arr: StringList): Maybetype =>
  find(isPropEqual(str), arr);

export const findStringC = (str: string, def: string) =>
  compose(
    option(def),
    findString(str)
  );

// NUMBERS
//findNumber :: int -> Array<int> -> int
export const findNumber = (num: number) => (arr: NumberList): Maybetype =>
  find(isPropEqual(num), arr);

export const findNumberC = (num: number, def: number) =>
  compose(
    option(def),
    findNumber(num)
  );

//OBJECTS
//findObject :: Object -> Array<Object> -> Object
export const findObject = (obj: Object) => (arr: ObjectList): Maybetype =>
  find(isPropEqual(obj), arr);

export const findObjectC = (obj: Object, def: Object) =>
  compose(
    option(def),
    findObject(obj)
  );

// ARRAYS
export const findArray = (arr: Array<any>) => (
  arrcontainer: Array<any>
): Maybetype => find(isPropEqual(arr), arrcontainer);

export const findArrayC = (arr: Array<any>, def: Array<any>) =>
  compose(
    option(def),
    findArray(arr)
  );
