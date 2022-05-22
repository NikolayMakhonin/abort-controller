import {
  AbortControllerClass,
  AbortSignalClass,
} from '../contracts'
import {AbortSignalImpl} from '../original/AbortSignalImpl'
import {AbortControllerImpl} from '../original/AbortControllerImpl'

export const _AbortSignalClass = AbortSignalClass || AbortSignalImpl
export const _AbortControllerClass = AbortControllerClass || AbortControllerImpl

export {
  _AbortSignalClass as AbortSignalClass,
  _AbortControllerClass as AbortControllerClass,
}
