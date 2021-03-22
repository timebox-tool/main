import { Box, BoxProps } from '@material-ui/core';
import React, { PropsWithChildren } from 'react';
import { Key } from 'ts-key-enum';
import { noop } from '../../util/fn';

export type KeyCatcherProps = PropsWithChildren<{
  onEnter: () => any;
}>;

export const KeyCatcher = ({
  children,
  onEnter = noop,
}: KeyCatcherProps) => {

  const onKeyDown: BoxProps['onKeyDown'] = (e) => {
    (e.key === Key.Enter) && onEnter();
  };

  return (
    <Box onKeyDown={onKeyDown}>
      {children}
    </Box >
  );
};