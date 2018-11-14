//@flow

// crocks
import prop from "crocks/Maybe/prop";
import safe from "crocks/Maybe/safe";
import isString from "crocks/predicates/isString";
import chain from "crocks/pointfree/chain";
import compose from "crocks/helpers/compose";
import option from "crocks/pointfree/option";
import and from "crocks/logic/and";
import not from "crocks/logic/not";
import isEmpty from "crocks/predicates/isEmpty";
import isArray from "crocks/predicates/isArray";
import isObject from "crocks/predicates/isObject";
import isNumber from "crocks/predicates/isNumber";
import isBoolean from "crocks/predicates/isBoolean";
import isFunction from "crocks/predicates/isFunction";
import { get } from "crocks/State";
import flip from "crocks/combinators/flip";
import evalWith from "crocks/State/evalWith";

// propOr :: (String, (b -> Boolean), a) -> Object -> c
const propOr = (key, pred, def) =>
  compose(
    option(def),
    chain(safe(pred)),
    prop(key)
  );

type property = string | number;

type gettype = (
  fn: any
) => {
  inspect: () => string,
  toString: () => string,
  runWith: (state: any, ...args: any[]) => any,
  execWith: (s: any) => any,
  evalWith: (s: any) => any,
  type: any,
  ap: (m: any) => any,
  of: (x: any) => any,
  map: (fn: any) => any,
  chain: (fn: any) => any
};

type StringList = Array<string>;
type NumberList = Array<number>;

//isNonEmptyString :: a -> Boolean
const isNonEmptyString: any => boolean = and(not(isEmpty), isString);

//isNonEmptyObject :: a -> Boolean
const isNonEmptyObject: any => boolean = and(not(isEmpty), isObject);

//isNonEmptyArray :: a -> Boolean
const isNonEmptyArray: boolean = and(not(isEmpty), isArray);

// safeStringProp :: (String, String) -> Object -> String
const safeStringProp = (n, def): string => propOr(n, isString, def);

const safeNonEmptyString = (n, def): string => propOr(n, isNonEmptyString, def);

// safeArrayProp :: (String, String) -> Object -> [any]
const safeArrayProp = (n, def): Array<any> => propOr(n, isArray, def);

// safeNonEmptyArrayProp :: (String)
const safeNonEmptyArrayProp = (n, def): Array<any> =>
  propOr(n, isNonEmptyArray, def);

// safeObjectProp :: (String, String) -> Object -> {a}
const safeObjectProp = (n, def): Object => propOr(n, isObject, def);

const safeNonEmptyObject = (n, def): Object => propOr(n, isNonEmptyObject, def);

const safeNumberProp = (n, def): number => propOr(n, isNumber, def);

const safeBooleanProp = (n, def): Boolean => propOr(n, isBoolean, def);

const safeFunctionProp = (n, def) => propOr(n, isFunction, def);

//getString :: -> State.get :: (s -> a) -> State s a
export const getString = (prop: property, def: any): gettype =>
  get(safeStringProp(prop, def));

export const getStringC = (prop: property, def: any): boolean =>
  flip(evalWith, getString(prop, def));

export const getNonEmptyString = (prop: property, def: any): gettype =>
  get(safeNonEmptyString(prop, def));

export const getNonEmptyStringC = (prop: property, def: any): any =>
  flip(evalWith, getNonEmptyString(prop, def));

export const getStrInRange = (
  prop: property,
  def: any
): (any => StringList => any) => {
  return (props: any) => {
    const str = getNonEmptyStringC(prop, def)(props);
    return (range: StringList) => (range.includes(str) ? str : def);
  };
};

//getArray :: -> State.get :: (s -> a) -> State s a
export const getArray = (prop: property, def: any): gettype =>
  get(safeArrayProp(prop, def));

export const getArrayC = (prop: property, def: any): (any => any) =>
  flip(evalWith, getArray(prop, def));

//getNonEmptyArray :: -> State.get :: (s -> a) -> State s a
export const getNonEmptyArray = (prop: property, def: any): gettype =>
  get(safeNonEmptyArrayProp(prop, def));

export const getNonEmptyArrayC = (prop: property, def: any): (any => any) =>
  flip(evalWith, getNonEmptyArray(prop, def));

//getObject :: -> State.get :: (s -> a) -> State s a
export const getObject = (prop: property, def: any): gettype =>
  get(safeObjectProp(prop, def));

export const getObjectC = (prop: property, def: any): (any => any) =>
  flip(evalWith, getObject(prop, def));

//getNonEmptyObject:: -> State.get :: (s -> a) -> State s a
export const getNonEmptyObject = (prop: property, def: any): gettype =>
  get(safeNonEmptyObject(prop, def));

export const getNonEmptyObjectC = (prop: property, def: any): (any => any) =>
  flip(evalWith, getNonEmptyObject(prop, def));

//getNumber :: -> State.get :: (s -> a) -> State s a
export const getNumber = (prop: property, def: any): gettype =>
  get(safeNumberProp(prop, def));

export const getNumberC = (prop: property, def: any): any =>
  flip(evalWith, getNumber(prop, def));

export const getNumberInRange = (
  prop: property,
  def: any
): (any => NumberList => any) => {
  return (props: any) => {
    const int = getNumberC(prop, def)(props);
    return (range: NumberList) => (range.includes(int) ? int : def);
  };
};

//getBoolean :: -> State.get :: (s -> a) -> State s a
export const getBoolean = (prop: property, def: any): gettype =>
  get(safeBooleanProp(prop, def));

export const getBooleanC = (prop: property, def: any): (any => any) =>
  flip(evalWith, getBoolean(prop, def));

export const getFunction = (prop: property, def: any): gettype =>
  get(safeFunctionProp(prop, def));

export const getFunctionC = (prop: property, def: any): (any => any) =>
  flip(evalWith, getFunction(prop, def));
