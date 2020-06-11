// Copyright 2017-2020 @polkadot/react-signer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export interface AddressFlags {
  hardwareType?: string;
  isExternal: boolean;
  isHardware: boolean;
  isMultisig: boolean;
  threshold: number;
  who: string[];
}
