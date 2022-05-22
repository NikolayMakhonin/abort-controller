import {
  IAbortControllerFast,
  IAbortSignalFast,
} from './contracts'
import {AbortControllerFast} from './AbortControllerFast'

export function toAbortSignal(abortSignalFast: IAbortSignalFast) {
  const abortController = new AbortController()
  abortSignalFast.subscribe((reason) => {
    abortController.abort(reason)
  })
  return abortController.signal
}

export function toAbortSignalFast(abortSignal: AbortSignal) {
  const abortControllerFast = new AbortControllerFast()
  function onAbort(reason: any) {
    abortControllerFast.abort(reason)
  }
  abortSignal.addEventListener('abort', onAbort)
  return abortControllerFast.signal
}

export function toAbortController(abortControllerFast: IAbortControllerFast) {
  const abortController = new AbortController()
  abortControllerFast.signal.subscribe((reason) => {
    abortController.abort(reason)
  })
  return abortController
}

export function toAbortControllerFast(abortController: AbortController) {
  const abortControllerFast = new AbortControllerFast()
  function onAbort(reason: any) {
    abortControllerFast.abort(reason)
  }
  abortController.signal.addEventListener('abort', onAbort)
  return abortControllerFast
}
