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
//isNonEmptyString :: a -> Boolean
const isNonEmptyString: boolean = and(not(isEmpty), isString);

//isNonEmptyObject :: a -> Boolean
const isNonEmptyObject: boolean = and(not(isEmpty), isObject);

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

//isPropString :: -> State.get :: (s -> a) -> State s a
export const isPropString = (prop: property, def: any): gettype =>
  get(safeStringProp(prop, def));

export const isPropStringC = (prop: property, def: any): boolean =>
  flip(evalWith, isPropString(prop, def));

export const isPropNonEmptyString = (prop: property, def: any): gettype =>
  get(safeNonEmptyString(prop, def));

export const isPropNonEmptyStringC = (prop: property, def: any): boolean =>
  flip(evalWith, isPropNonEmptyString(prop, def));

//isPropArray :: -> State.get :: (s -> a) -> State s a
export const isPropArray = (prop: property, def: any): gettype =>
  get(safeArrayProp(prop, def));

export const isPropArrayC = (prop: property, def: any): boolean =>
  flip(evalWith, isPropArray(prop, def));

//isPropNonEmptyArray :: -> State.get :: (s -> a) -> State s a
export const isPropNonEmptyArray = (prop: property, def: any): gettype =>
  get(safeNonEmptyArrayProp(prop, def));

export const isPropNonEmptyArrayC = (prop: property, def: any): boolean =>
  flip(evalWith, isPropNonEmptyArray(prop, def));

//isPropObject :: -> State.get :: (s -> a) -> State s a
export const isPropObject = (prop: property, def: any): gettype =>
  get(safeObjectProp(prop, def));

export const isPropObjectC = (prop: property, def: any): boolean =>
  flip(evalWith, isPropObject(prop, def));

//isPropNonEmptyObject:: -> State.get :: (s -> a) -> State s a
export const isPropNonEmptyObject = (prop: property, def: any): gettype =>
  get(safeNonEmptyObject(prop, def));

export const isPropNonEmptyObjectC = (prop: property, def: any): boolean =>
  flip(evalWith, isPropNonEmptyObject(prop, def));

//isPropNumber :: -> State.get :: (s -> a) -> State s a
export const isPropNumber = (prop: property, def: any): gettype =>
  get(safeNumberProp(prop, def));

export const isPropNumberC = (prop: property, def: any): boolean =>
  flip(evalWith, isPropNumber(prop, def));

//isPropBoolean :: -> State.get :: (s -> a) -> State s a
export const isPropBoolean = (prop: property, def: any): gettype =>
  get(safeBooleanProp(prop, def));

export const isPropBooleanC = (prop: property, def: any): boolean =>
  flip(evalWith, isPropBoolean(prop, def));
