/*
  3188 - Tuple to Nested Object
  -------
  by jiangshan (@jiangshanmeta) #medium #object #tuple

  ### Question

  Given a tuple type ```T``` that only contains string type, and a type ```U```, build an object recursively.

  ```typescript
  type a = TupleToNestedObject<['a'], string> // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
  type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
  ```

  > View on GitHub: https://tsch.js.org/3188
*/

/* _____________ Your Code Here _____________ */

type ArrayIndex<T extends any[]> = Exclude<keyof T, keyof any[]>
type ArrayKeys<T extends any[]> = { [K in ArrayIndex<T>]: T[K] }[ArrayIndex<T>]

type TupleToNestedObject<T extends any[], U> =
  T extends [infer First, ...infer Rest]
    ? First extends string
      ? { [K in First]: TupleToNestedObject<Rest, U> }
      : never
    : U

type I = ArrayIndex<['a', 'b']>
type T = TupleToNestedObject<['a', 'b'], number>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3188/answer
  > View solutions: https://tsch.js.org/3188/solutions
  > More Challenges: https://tsch.js.org
*/
