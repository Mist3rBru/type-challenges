/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */

type IsUnique<S extends string, U extends string> =
  S extends `${infer F}${infer R}`
    ? F extends U
      ? false
      : IsUnique<R, U>
    : true

type NoChar<S extends string, U extends string> =
  S extends `${infer F}${infer R}`
    ? F extends U
      ? NoChar<R, U>
      : `${F}${NoChar<R, U>}`
    : S

type StringIndex<S extends string, U extends string, K extends any[] = []> =
  S extends `${infer F}${infer R}`
    ? F extends U
      ? K['length']
      : StringIndex<R, U, [...K, any]>
    : -1

type FirstUniqueCharIndex<T extends string, U extends string = '', T2 extends string = T> =
  T extends `${infer F}${infer R}`
    ? IsUnique<U, F> extends true
      ? FirstUniqueCharIndex<R, `${U}${F}`, T2>
      : FirstUniqueCharIndex<R, NoChar<U, F>, T2>
    : U extends `${infer FU}${string}`
      ? StringIndex<T2, FU>
      : -1

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/
