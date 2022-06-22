import { IAbortSignalFast, IUnsubscribe, TAbortReason } from './contracts';
declare type Callback<TThis> = (this: TThis, reason: TAbortReason) => void;
interface IAbortSignalFastImpl extends IAbortSignalFast {
    abort(reason: TAbortReason): void;
}
export declare class AbortSignalFast implements IAbortSignalFastImpl {
    aborted: boolean;
    reason: TAbortReason;
    private _callbacks;
    constructor();
    subscribe(callback: Callback<this>): IUnsubscribe;
    abort(reason: TAbortReason): void;
    throwIfAborted(): void;
}
export {};
