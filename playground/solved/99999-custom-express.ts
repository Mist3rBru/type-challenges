import type { Equal, Expect } from '@type-challenges/utils'

type Request<Params extends string> = {
  headers: Record<string, string>
  body: any
  params: Record<Params, string>
  [key: string]: unknown
}

type Response = {
  status: (statusCode: number) => Response
  json: (data: Record<string, any>) => void
  send: (data: any) => void
}

type RequestListener<Params extends string> =
  (req: Request<Params>, res: Response, next: (data?: any) => void) => void

type RouteParams<T extends string, P extends string = '', K extends string = '', Y extends string = ''> =
  T extends `${infer F}${infer R}`
    ? P extends ':'
      ? F extends '/'
        ? Y extends ''
          ? RouteParams<R, F, '', K>
          : RouteParams<R, F, '', Y | K>
        : RouteParams<R, P, `${K}${F}`, Y>
      : RouteParams<R, F, K, Y>
    : Y

type Route = <T extends string>(route: T, ...listener: RequestListener<RouteParams<T>>[]) => void

type Method = 'get' | 'post' | 'put' | 'delete'

type Router = Record<Method, Route >

type Express = () => Router

const express: Express = () => ({
  get: () => {},
  post: () => {},
  put: () => {},
  delete: () => {},
})

const router = express()

router.get('/file/:id/:name/upload',
  (req, res, next) => {
    req.params.name
    next({ userId: req.params.id })
  },
  (req, res) => {
    req.params.id
    req.userId
    res.json({ ok: true })
    res.json([{
      test: {
        ok: true,
      },
    }])
    // @ts-expect-error
    res.json('ok')
    // @ts-expect-error
    res.json(1)
    // @ts-expect-error
    res.json(true)

    res.status(200).send('ok')
    res.status(201).json({ created: true })

    // @ts-expect-error
    res.send({ error: true }).status(400)
    // @ts-expect-error
    res.json({ error: true }).status(400)
  })
