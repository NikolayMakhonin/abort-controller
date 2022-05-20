import {DOMExceptionImpl} from './DOMExceptionImpl'

const _DOMException: typeof DOMException =
  // typeof DOMException !== 'undefined'
  // ? DOMException
  // :
  DOMExceptionImpl as any

export { _DOMException as DOMException }
