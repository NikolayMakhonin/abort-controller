[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][github-image]][github-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Custom very fast AbortController implementation and interface with the possibility of converting/connecting with the standard AbortController (version of NodeJS 18).
This is about 100 times faster than built-ins implementations.

# Interface
```ts
class AbortError extends Error {
  readonly reason?: TAbortReason
  constructor(message?: string, reason?: TAbortReason) {
    
  }
}

type IUnsubscribe = () => void

interface IAbortSignalFast {
  readonly aborted: boolean
  readonly reason: any

  /**
   * just throws reason if aborted.
   */
  throwIfAborted()

  /**
   * It will immediately run the callback if it was aborted.
   * It will prevent re-subscribing if it has not been aborted.
   */
  subscribe(callback: (this: this, reason: any) => void): IUnsubscribe
}

interface IAbortControllerFast<TSignal extends IAbortSignalFast = IAbortSignalFast> {
  readonly signal: TSignal

  /**
   * The reason will be converted to AbortError if it is not undefined.
   */
  abort(reason: any): void
}
```

# Usage
```ts
import { AbortControllerFast } from '@flemist/abort-controller-fast'

const abortControllerFast = new AbortControllerFast()
const unsubscribe = abortControllerFast.signal.subscribe(function (reason) {
  console.log(this) // this === abortControllerFast.signal
  console.log(reason) // reason === abortControllerFast.signal.reason
})
unsubscribe() // there is no point to unsubscribe if abortControllerFast was aborted
abortControllerFast.abort('some reason')
abortControllerFast.signal.throwIfAborted()
```

# Convert / Connecting with the standard AbortController

```ts
import {
  toAbortSignal,
  toAbortSignalFast,
  toAbortController,
  toAbortControllerFast,
} from '@flemist/abort-controller-fast'
import {AbortControllerImpl} from '@flemist/abort-controller'
import {IAbortControllerFast} from './contracts'

let abortSignalFast: IAbortSignalFast
let abortControllerFast: IAbortControllerFast
let abortSignal: AbortSignal
let abortController: AbortController

// convert to a built-in implementation of AbortController/AbortSignal
abortController = toAbortController(abortControllerFast, new AbortControllerImpl())
abortSignal = toAbortSignal(abortSignalFast, new AbortControllerImpl())

// convert to a custom implementation of the standard AbortController/AbortSignal intetface
abortController = toAbortController(abortControllerFast, new AbortController())
abortSignal = toAbortSignal(abortSignalFast, new AbortController())

// convert standard AbortController/AbortSignal to the fast abort controller
abortControllerFast = toAbortControllerFast(abortController, new AbortControllerFast())
abortSignalFast = toAbortSignalFast(abortSignal, new AbortControllerFast())
```

[npm-image]: https://img.shields.io/npm/v/@flemist/abort-controller.svg
[npm-url]: https://npmjs.org/package/@flemist/abort-controller
[downloads-image]: https://img.shields.io/npm/dm/@flemist/abort-controller.svg
[downloads-url]: https://npmjs.org/package/@flemist/abort-controller
[github-image]: https://github.com/NikolayMakhonin/abort-controller/actions/workflows/test.yml/badge.svg
[github-url]: https://github.com/NikolayMakhonin/abort-controller/actions
[coveralls-image]: https://coveralls.io/repos/github/NikolayMakhonin/abort-controller/badge.svg
[coveralls-url]: https://coveralls.io/github/NikolayMakhonin/abort-controller
