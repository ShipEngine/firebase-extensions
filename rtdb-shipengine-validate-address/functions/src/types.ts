import { Result } from 'shipengine/esm/validate-addresses/types/public';

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
export type InferElementType<T extends any[]> = T extends (infer U)[]
    ? U
    : never;

export type AddressValidationResult = Optional<
    Omit<InferElementType<Result>, 'originalAddress'>,
    'messages' | 'normalizedAddress'
>;

export enum Status {
    Unverified = 'unverified',
    Verified = 'verified',
    Warning = 'warning',
    Error = 'error',
}