type _DOMException = DOMException
// eslint-disable-next-line @typescript-eslint/no-redeclare
const _DOMException = class DOMException extends Error {
  constructor(message?: string, name?: string) {
    super(message)
    this.name = name
  }
}

export { _DOMException as DOMExceptionImpl }
