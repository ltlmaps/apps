// Copyright 2017-2020 @polkadot/react-signer authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { SubmittableExtrinsic } from '@polkadot/api/promise/types';
import { RuntimeDispatchInfo } from '@polkadot/types/interfaces';

import BN from 'bn.js';
import React, { useState, useEffect } from 'react';
import { Trans } from 'react-i18next';
import { Expander } from '@polkadot/react-components';
import { useApi, useIsMountedRef } from '@polkadot/react-hooks';
import { formatBalance, isFunction } from '@polkadot/util';

interface Props {
  accountId?: string | null;
  className?: string;
  extrinsic?: SubmittableExtrinsic | null;
  isSendable: boolean;
  onChange?: (hasAvailable: boolean) => void;
  tip?: BN;
}

function Checks ({ accountId, className = '', extrinsic }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const [dispatchInfo, setDispatchInfo] = useState<RuntimeDispatchInfo | null>(null);
  const mountedRef = useIsMountedRef();

  useEffect((): void => {
    accountId && extrinsic && isFunction(api.rpc.payment?.queryInfo) &&
      Promise.resolve(
        extrinsic
          .paymentInfo(accountId)
          .then((info): void => {
            mountedRef.current && setDispatchInfo(info);
          })
      ).catch(console.error);
  }, [api, accountId, extrinsic, mountedRef]);

  if (!dispatchInfo) {
    return null;
  }

  return (
    <Expander
      className={className}
      summary={
        <Trans i18nKey='feesForSubmission'>
          Fees of <span className='highlight'>{formatBalance(dispatchInfo.partialFee, { withSiFull: true })}</span> will be applied to the submission
        </Trans>
      }
      withDot
    />
  );
}

export default React.memo(Checks);
