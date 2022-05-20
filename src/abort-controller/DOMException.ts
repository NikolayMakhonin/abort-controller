const _DOMException =
  // typeof DOMException !== 'undefined'
  // ? DOMException
  // :
  class DOMException extends Error {
    readonly name: string
    constructor(message?: string, name?: string) {
      super(message)
      this.name = name
    }
  }

export { _DOMException as DOMException }
