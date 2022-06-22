export declare type IUnsubscribe = () => void;
export declare type TAbortReason = any;
export interface IAbortSignalFast {
    readonly aborted: boolean;
    readonly reason: TAbortReason;
    /**
     * just throws reason if aborted.
     */
    throwIfAborted(): any;
    /**
     * It will immediately run the callback if it was aborted.
     * It will prevent re-subscribing if it has not been aborted.
     */
    subscribe(callback: (this: this, reason: TAbortReason) => void): IUnsubscribe;
}
export interface IAbortControllerFast<TSignal extends IAbortSignalFast = IAbortSignalFast> {
    readonly signal: TSignal;
    /**
     * It will be converted to AbortError if the reason is not Error.
     */
    abort(reason?: TAbortReason): void;
}
