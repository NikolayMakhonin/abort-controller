import {DOMExceptionImpl} from './DOMExceptionImpl'

type _DOMException = DOMException
// eslint-disable-next-line @typescript-eslint/no-redeclare
const _DOMException: typeof DOMException = (() => {
  try {
    if (typeof DOMException !== 'undefined') {
      // eslint-disable-next-line no-new
      new DOMException()
      return DOMException
    }
  }
  catch {
    // empty
  }
  return DOMExceptionImpl as any
})()

export { _DOMException as DOMException }
