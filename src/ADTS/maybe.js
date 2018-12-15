// @flow

import find from "crocks/Maybe/find";
import compose from "crocks/helpers/compose";
import option from "crocks/pointfree/option";
import isSameType from "crocks/predicates/isSameType";
import Pred from "crocks/Pred";
import Maybe from "crocks/Maybe";
import ifElse from "crocks/logic/ifElse";
import map from "crocks/pointfree/map";
import chain from "crocks/pointfree/chain";
import equals from "crocks/pointfree/equals";
import propPath from "crocks/Maybe/propPath";
import hasPropPath from "crocks/predicates/hasPropPath";

import { isPropEqual } from "./pred";

const { Just, Nothing } = Maybe;

//findAny :: a -> Array<a> -> M a
export const findAny = a => b => find(isPropEqual(a), b);

export const findAnyC = (a, def) =>
  compose(
    option(def),
    findAny(a)
  );

// validateSameType :: (a -> Boolean) -> a -> Maybe b
const validateSameType = ifElse(isSameType(Pred), Just, Nothing);

// findAnyWithPred :: Pred -> b -> M a

export const findAnyWithPred = arr =>
  compose(
    chain(pred => find(pred, arr)),
    validateSameType
  );

export const findAnyWithPredC = (arr, def) =>
  compose(
    option(def),
    findAnyWithPred(arr)
  );

export const validatePath = path => ifElse(hasPropPath(path), Just, Nothing);

export const valInPath = path =>
  compose(
    chain(propPath(path)),
    validatePath(path)
  );

export const valInPathC = (path, def) =>
  compose(
    option(def),
    valInPath(path)
  );

// const a = {
//   validatePath: {
//     first: {
//       val: 12,
//       second: {
//         plus: 1,
//         third: 13
//       }
//     }
//   }
// };

// console.log(valInPath(["validatePath"])(a).chain(valInPath(["first"])).option());
