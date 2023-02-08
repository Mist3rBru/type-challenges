/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #hard

  ### Question

  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.

  > View on GitHub: https://tsch.js.org/14188
*/

/* _____________ Your Code Here _____________ */

namespace RLE {
  export type Encode<S extends string, C extends any[] = [], K extends string = ''> =
    S extends `${infer F}${infer R}`
      ? C['length'] extends 0
        ? Encode<R, [F], K>
        : F extends C[0]
          ? Encode<R, [...C, F], K>
          : C['length'] extends 1
            ? Encode<R, [F], `${K}${C[0]}`>
            : Encode<R, [F], `${K}${C['length']}${C[0]}`>
      : C['length'] extends 0 | 1
        ? `${K}${C[0]}`
        : `${K}${C['length']}${C[0]}`

  type Range<
    E extends number | string,
    R extends any[] = [],
  > =
    `${R['length']}` extends `${E}`
      ? R
      : Range<E, [...R, R['length']]>

  type Fill<T extends any[], U> =
    T extends [any, ...infer R]
      ? [U, ...Fill<R, U>]
      : []

  type Join<T, U extends string | number> =
    T extends [infer L extends string, ...infer R]
      ? R['length'] extends 0
        ? L
        : `${L}${U}${Join<R, U>}`
      : ''

  export type Decode<S extends string, P extends string =''> =
      S extends `${infer F}${infer R}`
        ? `${F}` extends `${number}`
          ? Decode<R, F>
          : `${P}` extends `${number}`
            ? `${Join<Fill<Range<P>, F>, ''>}${Decode<R, F>}`
            : `${F}${Decode<R, F>}`
        : ''
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type EncodeResult1 = RLE.Encode<'AAABCCXXXXXXYZ'>
type EncodeResult2 = RLE.Encode<'ABBBBCXYYYZZ'>
type DecodeResult1 = RLE.Decode<'3AB2C6XYZ'>
type DecodeResult2 = RLE.Decode<'A4BCX3Y2Z'>

type cases = [
  // Raw string -> encoded string
  Expect<Equal<EncodeResult1, '3AB2C6XYZ'>>,
  Expect<Equal<EncodeResult2, 'A4BCX3Y2Z'>>,

  // Encoded string -> decoded string
  Expect<Equal<DecodeResult1, 'AAABCCXXXXXXYZ'>>,
  Expect<Equal<DecodeResult2, 'ABBBBCXYYYZZ'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/14188/answer
  > View solutions: https://tsch.js.org/14188/solutions
  > More Challenges: https://tsch.js.org
*/
