/*
  2822 - Split
  -------
  by Andrea Simone Costa (@jfet97) #hard #string #split #array #tuple

  ### Question

  The well known `split()` method splits a string into an array of substrings by looking for a separator, and returns the new array. The goal of this challenge is to split a string, by using a separator, but in the type system!

  For example:

  ```ts
  type result = Split<'Hi! How are you?', ' '>  // should be ['Hi!', 'How', 'are', 'you?']
  ```

  > View on GitHub: https://tsch.js.org/2822
*/

/* _____________ Your Code Here _____________ */

type Split<S extends string, U extends string, K extends string = '', Y extends string[] = []> =
  S extends `${infer F}${infer R}`
    ? U extends ''
      ? Split<R, U, '', [...Y, F]>
      : F extends U
        ? Split<R, U, '', [...Y, K]>
        : Split<R, U, `${K}${F}`, Y>
    : string extends S
      ? string[]
      : U extends ''
        ? Y
        : Y['length'] extends 0
          ? [K]
          : [...Y, K]

type T = Split<'Hi! How are you?', 'z'>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Split<'Hi! How are you?', 'z'>, ['Hi! How are you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ' '>, ['Hi!', 'How', 'are', 'you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ''>, ['H', 'i', '!', ' ', 'H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', '?']>>,
  Expect<Equal<Split<'', ''>, []>>,
  Expect<Equal<Split<'', 'z'>, ['']>>,
  Expect<Equal<Split<string, 'whatever'>, string[]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2822/answer
  > View solutions: https://tsch.js.org/2822/solutions
  > More Challenges: https://tsch.js.org
*/
