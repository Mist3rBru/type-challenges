/*
  116 - MyReplace
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `MyReplace<S, From, To>` which replace the string `From` with `To` once in the given string `S`

  For example

  ```ts
  type replaced = MyReplace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'
  ```

  > View on GitHub: https://tsch.js.org/116
*/

/* _____________ Your Code Here _____________ */

export type MyReplace<
  S extends string,
  From extends string,
  To extends string,
> = From extends ''
  ? S
  : S extends `${infer Left}${From}${infer Right}`
    ? `${Left}${To}${Right}`
    : S

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyReplace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<MyReplace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<MyReplace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<MyReplace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<MyReplace<'foobarbar', 'foo', 'bra'>, 'brabarbar'>>,
  Expect<Equal<MyReplace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<MyReplace<'', '', ''>, ''>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/116/answer
  > View solutions: https://tsch.js.org/116/solutions
  > More Challenges: https://tsch.js.org
*/
