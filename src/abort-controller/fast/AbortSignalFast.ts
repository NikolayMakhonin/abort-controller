import {IAbortSignalFast, IUnsubscribe, TAbortReason} from './contracts'

type Callback<TThis> = (this: TThis, reason: TAbortReason) => void
const emptyFunc = () => {}

interface IAbortSignalFastImpl extends IAbortSignalFast {
  abort(reason: TAbortReason): void
}

export class AbortSignalFast implements IAbortSignalFastImpl {
  aborted: boolean = false
  reason: any = void 0
  private _callbacks: Set<Callback<this>> = void 0

  constructor() {

  }

  subscribe(callback: Callback<this>): IUnsubscribe {
    if (this._callbacks?.has(callback)) {
      throw new Error('Already subscribed: ' + callback)
    }

    if (this.aborted) {
      callback.call(this, this.reason)
      return emptyFunc
    }

    if (!this._callbacks) {
      this._callbacks = new Set()
    }
    this._callbacks.add(callback)

    return () => {
      this._callbacks?.delete(callback)
    }
  }

  abort(reason: TAbortReason): void {
    this.aborted = true
    this.reason = reason

    this._callbacks?.forEach(callback => {
      callback.call(this, this.reason)
    })

    this._callbacks = void 0
  }

  throwIfAborted() {
    if (this.aborted) {
      throw this.reason
    }
  }
}
