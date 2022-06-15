import { TAbortReason } from './contracts';
export declare class AbortError extends Error {
    private readonly _internal;
    readonly reason?: TAbortReason;
    constructor(message?: string, reason?: TAbortReason);
}
