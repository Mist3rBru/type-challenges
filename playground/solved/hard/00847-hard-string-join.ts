/*
  847 - String Join
  -------
  by Matt Davis (@tl-matt-davis) #hard

  ### Question

  Create a type-safe string join utility which can be used like so:

  ```ts
  const hyphenJoiner = join('-')
  const result = hyphenJoiner('a', 'b', 'c'); // = 'a-b-c'
  ```

  Or alternatively:
  ```ts
  join('#')('a', 'b', 'c') // = 'a#b#c'
  ```

  When we pass an empty delimiter (i.e '') to join, we should concat the strings as they are, i.e:
  ```ts
  join('')('a', 'b', 'c') // = 'abc'
  ```

  When only one item is passed, we should get back the original item (without any delimiter added):
  ```ts
  join('-')('a') // = 'a'
  ```

  > View on GitHub: https://tsch.js.org/847
*/

/* _____________ Your Code Here _____________ */

type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never

type UnionToTuple<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer ReturnType
  ? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
  : []

type Join<Del extends string, Parts extends any[]> =
    Parts extends [infer First extends string, ...infer Rest]
      ? Rest['length'] extends 0
        ? First
        : `${First}${Del}${Join<Del, Rest>}`
      : never

declare function join<D extends string>(delimiter: D): <P extends string=''>(...parts: P[]) => Join<D, UnionToTuple<P>>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

// Edge cases
const noCharsOutput = join('-')()
const oneCharOutput = join('-')('a')
const noDelimiterOutput = join('')('a', 'b', 'c')

// Regular cases
const hyphenOutput = join('-')('a', 'b', 'c')
const hashOutput = join('#')('a', 'b', 'c')
const twoCharOutput = join('-')('a', 'b')
const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h')

type cases = [
  Expect<Equal<typeof noCharsOutput, ''>>,
  Expect<Equal<typeof oneCharOutput, 'a'>>,
  Expect<Equal<typeof noDelimiterOutput, 'abc'>>,
  Expect<Equal<typeof twoCharOutput, 'a-b'>>,
  Expect<Equal<typeof hyphenOutput, 'a-b-c'>>,
  Expect<Equal<typeof hashOutput, 'a#b#c'>>,
  Expect<Equal<typeof longOutput, 'a-b-c-d-e-f-g-h'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/847/answer
  > View solutions: https://tsch.js.org/847/solutions
  > More Challenges: https://tsch.js.org
*/
