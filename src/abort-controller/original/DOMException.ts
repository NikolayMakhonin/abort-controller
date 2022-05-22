import {DOMExceptionImpl} from './DOMExceptionImpl'

const _DOMException: typeof DOMException = (() => {
  try {
    if (typeof DOMException !== 'undefined') {
      new DOMException()
      return DOMException
    }
  } catch { }
  return DOMExceptionImpl as any
})()

export { _DOMException as DOMException }
