import { ValidateAddressesTypes } from 'shipengine';
import { Optional } from 'shipengine-firebase-common/src/types';

export const enum Status {
  Unverified = 'unverified',
  Verified = 'verified',
  Warning = 'warning',
  Error = 'error',
}

export type RequestPayload = ValidateAddressesTypes.Params;
export type ResponsePayload = ValidateAddressesTypes.Result;

export type Address = RequestPayload[number];
export type ValidatedAddress = ResponsePayload[number];

export type InputPayload = {
  [key: string]: Address;
}
export type AddressValidationResult = Optional<
  Omit<ValidatedAddress, 'originalAddress'>,
  'messages' | 'normalizedAddress'
>;
export type UpdatePayload = {
  [key: string]: AddressValidationResult;
}