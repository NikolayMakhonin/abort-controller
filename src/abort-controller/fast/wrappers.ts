import {
  IAbortControllerFast,
  IAbortSignalFast,
} from './contracts'
import {AbortControllerFast} from './AbortControllerFast'
import {AbortError} from './AbortError'
import {AbortControllerClass, IAbortController, IAbortSignal} from '../contracts'

export function toAbortSignal(abortSignalFast: IAbortSignalFast): IAbortSignal {
  const abortController = new AbortControllerClass()
  abortSignalFast.subscribe((reason) => {
    abortController.abort(reason)
  })
  return abortController.signal
}

export function toAbortSignalFast(abortSignal: IAbortSignal): IAbortSignalFast {
  const abortControllerFast = new AbortControllerFast()
  function onAbort(reason: any) {
    abortControllerFast.abort(reason)
  }
  abortSignal.addEventListener('abort', onAbort)
  return abortControllerFast.signal
}

export function toAbortController(abortControllerFast: IAbortControllerFast): IAbortController {
  const abortController = new AbortControllerClass()
  abortControllerFast.signal.subscribe((reason) => {
    if (reason instanceof AbortError) {
      reason = reason.reason
    }
    abortController.abort(reason)
  })
  return abortController
}

export function toAbortControllerFast(abortController: IAbortController): IAbortControllerFast {
  const abortControllerFast = new AbortControllerFast()
  function onAbort(this: IAbortSignal, event: Event) {
    abortControllerFast.abort((this as any).reason)
  }
  abortController.signal.addEventListener('abort', onAbort)
  return abortControllerFast
}
