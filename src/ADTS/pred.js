//@flow
import Pred from "crocks/Pred";
import isEmpty from "crocks/predicates/isEmpty";
import isNumber from "crocks/predicates/isNumber";
import hasProp from "crocks/predicates/hasProp";
import and from "crocks/logic/and";
import not from "crocks/logic/not";
import isString from "crocks/predicates/isString";
import equals from "crocks/pointfree/equals";
import flip from "crocks/combinators/flip";
import runWith from "crocks/pointfree/runWith";

import contramap from "crocks/pointfree/contramap";
import propOr from "crocks/helpers/propOr";

type property = string | number;

type predtype = (
  prop: property
) => {
  inspect: () => string,
  toString: () => string,
  runWith: (x: any) => boolean,
  type: any,
  valueOf: () => (x: any) => boolean,
  empty: () => any,
  concat: (m: any) => any,
  contramap: (fn: any) => any
};

//isNonEmpty :: a -> Boolean
const isNonEmpty: boolean = and(not(isEmpty));

// isPropString :: Pred String
export const isPropString: predtype = Pred(isString);

//isPropStringC :: a -> Boolean
export const isPropStringC: boolean = flip(runWith, isPropString);

//isPropNonEmptyString :: Pred string
export const isPropNonEmptyString: predtype = isPropString.concat(
  Pred(isNonEmpty)
);

export const isPropNonEmptyStringC: boolean = flip(
  runWith,
  isPropNonEmptyString
);

//isPropTrue :: Pred Boolean
export const isPropTrue: predtype = Pred(equals(true));

export const isPropTrueC: boolean = flip(runWith, isPropTrue);

// isObjectPropTrue :: a -> Pred
export const isObjectPropTrue = (val: property): predtype =>
  isPropTrue.contramap(propOr(false, val));
// isObjectPropTrueC :: a -> boolean
export const isObjectPropTrueC = (val: property): boolean =>
  flip(runWith, isObjectPropTrue(val));

// doesPropExist :: Pred {} | []
export const doesPropExist = (prop: property): predtype => Pred(hasProp(prop));

// doesPropExistC :: a -> boolean
export const doesPropExistC = (prop: property): boolean =>
  flip(runWith, doesPropExist(prop));

// isObjectPropTruthy :: Pred {}
export const isObjectPropTruthy = (prop: property): predtype =>
  doesPropExist(prop).concat(isObjectPropTrue(prop));

//isObjectPropTruthyC :: a -> Boolean
export const isObjectPropTruthyC = (prop: property): boolean =>
  flip(runWith, isObjectPropTruthy(prop));
