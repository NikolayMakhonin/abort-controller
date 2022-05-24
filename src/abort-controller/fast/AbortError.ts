import {TAbortReason} from './contracts'

export class AbortError extends Error {
  private _internal: boolean
  readonly reason?: TAbortReason
  constructor(message?: string, reason?: TAbortReason) {
    super(message)
    // see: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, AbortError.prototype)
    this.reason = reason
    this.name = 'AbortError'
    this._internal = false
  }
}
