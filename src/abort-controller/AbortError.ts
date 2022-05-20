export class AbortError extends DOMException {
  readonly reason: any
  constructor(message?: string, reason?: any) {
    super(message)
    this.reason = reason
  }
}
