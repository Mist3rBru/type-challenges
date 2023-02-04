/*
  119 - MyReplaceAll
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `MyReplaceAll<S, From, To>` which replace the all the substring `From` with `To` in the given string `S`

  For example

  ```ts
  type replaced = MyReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
  ```

  > View on GitHub: https://tsch.js.org/119
*/

/* _____________ Your Code Here _____________ */

type MyReplaceAll<
  S extends string,
  From extends string,
  To extends string,
> = From extends ''
  ? S
  : S extends `${infer Left}${From}${infer Right}`
    ? `${Left}${To}${MyReplaceAll<Right, From, To>}`
    : S

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<MyReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<MyReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<MyReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<MyReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<MyReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<MyReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<MyReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<MyReplaceAll<'', '', ''>, ''>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/119/answer
  > View solutions: https://tsch.js.org/119/solutions
  > More Challenges: https://tsch.js.org
*/
