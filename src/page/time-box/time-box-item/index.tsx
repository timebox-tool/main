import { Avatar, Box, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from "@material-ui/core";
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import StopIcon from '@material-ui/icons/Stop';
import React from "react";
import { minute2Second } from "util/time";
import { useTimeBoxItemStyles } from "../index.style";
import { useTimeBoxItemHook } from "./index.hook";

export type TimeBoxItemProps = {
  who: string;
  limit: number;
};

export const TimeBoxItem = (p: TimeBoxItemProps) => {
  const operations = useTimeBoxItemHook({ limit: minute2Second(10) });
  const styles = useTimeBoxItemStyles({ isTimeout: operations.isTimeout, isFrozen: operations.timerOps.isTimerStopped });

  return (
    <ListItem className={styles.item}>
      <ListItemAvatar>
        <Avatar className={styles.clockIcon}>
          <AccessAlarmIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant='subtitle1'>{`${p.who} has cost`}</Typography>}
        secondary={
          <Box component='span' display='flex' flexDirection='column'>
            <Typography component='span' variant='body2'>{`${operations.costTime.minutes} MIN ${operations.costTime.reservedSeconds} S`}</Typography>
            <Typography component='span' variant='body2'>{`LIMIT: ${p.limit}MIN`}</Typography>
          </Box>
        } />
      <ListItemSecondaryAction>
        <IconButton onClick={operations.timerOps.stop} edge='end' disabled={operations.timerOps.isTimerStopped}>
          <StopIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};