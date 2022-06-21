/* eslint-disable @typescript-eslint/no-redeclare */
import {abortSignalAbort, AbortSignalImpl, createAbortSignal} from './AbortSignalImpl'
import {assertThis} from './helpers'
import {IAbortController} from './contracts'

const kSignal = Symbol('kSignal')

type _AbortController = IAbortController
const _AbortController: { new(): IAbortController; prototype: IAbortController } =
  class AbortController implements IAbortController {
    constructor() {
      this[kSignal] = createAbortSignal() as any
    }

    private readonly [kSignal]: AbortSignalImpl
    get signal() {
      assertThis(this, AbortController)
      return this[kSignal]
    }

    abort(reason?: any): void {
      assertThis(this, AbortController)
      abortSignalAbort(this.signal, reason)
    }
  }

export { _AbortController as AbortControllerImpl }
