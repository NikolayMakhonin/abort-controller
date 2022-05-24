import {
  IAbortControllerFast,
  IAbortSignalFast,
} from './contracts'
import {AbortError} from './AbortError'

export function toAbortSignal<TAbortController extends AbortController>(
  abortSignalFast: IAbortSignalFast,
  abortController?: TAbortController,
): TAbortController['signal'] {
  abortSignalFast.subscribe((reason) => {
    abortController.abort(reason)
  })
  return abortController.signal
}

export function toAbortSignalFast<TAbortControllerFast extends IAbortControllerFast>(
  abortSignal: AbortSignal,
  abortControllerFast: TAbortControllerFast,
): TAbortControllerFast['signal'] {
  function onAbort(reason: any) {
    abortControllerFast.abort(reason)
  }
  abortSignal.addEventListener('abort', onAbort)
  return abortControllerFast.signal
}

export function toAbortController<TAbortController extends AbortController>(
  abortControllerFast: IAbortControllerFast,
  abortController: TAbortController,
): TAbortController {
  abortControllerFast.signal.subscribe((reason) => {
    if (reason instanceof AbortError && (reason as any)._internal) {
      reason = reason.reason
    }
    abortController.abort(reason)
  })
  return abortController
}

export function toAbortControllerFast<TAbortControllerFast extends IAbortControllerFast>(
  abortController: AbortController,
  abortControllerFast: TAbortControllerFast,
): TAbortControllerFast {
  function onAbort(this: AbortSignal, event: Event) {
    abortControllerFast.abort((this as any).reason)
  }
  abortController.signal.addEventListener('abort', onAbort)
  return abortControllerFast
}
