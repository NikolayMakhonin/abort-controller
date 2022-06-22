import { IAbortControllerFast, IAbortSignalFast, TAbortReason } from './contracts';
export declare class AbortControllerFast implements IAbortControllerFast {
    readonly signal: IAbortSignalFast;
    constructor();
    abort(reason?: TAbortReason): void;
}
