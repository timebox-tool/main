import { Avatar, Box, Container, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper, Slider, SliderProps, TextField, Typography } from '@material-ui/core';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import StopIcon from '@material-ui/icons/Stop';
import { compose, concat, isEmpty } from 'ramda';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { useEffectOnce, useToggle } from 'react-use';
import { minute2Second, second2Minute } from 'util/time';
import { KeyCatcher } from '../../component/key-catcher';
import { useTimer } from '../../hooks/use-timer';
import { event2Value, isArray } from '../../util/obj';
import { useTimeBoxPageStyles, useTimeBoxItemStyles } from './index.style';

const defaultName = '';
const defaultLimit = 10;
export type TimeBoxPageProps = {
};
export const TimeBoxPage = (p: TimeBoxPageProps) => {
  const data = useTimeBoxes();
  const [name, setName] = useState(defaultName);
  const [limit, setLimit] = useState(defaultLimit);
  const backToDefaultName = () => setName(defaultName);
  const isBtnDisabled = useMemo(() => isEmpty(name), [name]);
  const styles = useTimeBoxPageStyles();

  const newTimer = useCallback(() => {
    backToDefaultName();
    data.newTimeBox({ who: name, limit });
  }, [data, name, limit]);

  const onTimeBoxLimitSliderChangeCommitted: SliderProps['onChangeCommitted'] = (_, v) => {
    if (!isArray(v)) {
      setLimit(v);
    }
  };

  return (
    <Container>
      <Paper className={styles.container}>

        <Box display='flex' flexDirection='row' justifyContent='center'>
          <Box>
            {/** time slider for determine how long the timeBox is */}
            <Slider defaultValue={defaultLimit} step={5} min={5} max={30} marks valueLabelDisplay='auto' onChangeCommitted={onTimeBoxLimitSliderChangeCommitted} />

            <Box display='flex' alignItems='center'>
              {/** input for determine who will be related to the timeBox */}
              <KeyCatcher onEnter={newTimer}>
                <TextField variant='outlined' value={name} onChange={compose(setName, event2Value)} InputProps={{
                  endAdornment: <IconButton disabled={isBtnDisabled} onClick={newTimer}>
                    <HourglassEmptyIcon />
                  </IconButton>
                }} />
              </KeyCatcher>
            </Box>
          </Box>
        </Box>

        <List>
          {data.timeBoxes.map(t => <Box key={t.id}>
            <TimeBoxItem  {...t} />
            <Divider />
          </Box>)}
        </List>

      </Paper>
    </Container>

  );
};

type TimeBoxItemProps = {
  who: string;
  limit: number;
};

const TimeBoxItem = (p: TimeBoxItemProps) => {
  const [isStopBtnDisabled, setStopBtnDisabled] = useToggle(false);
  /** timers */
  const timer = useTimer();
  const costMinSndPair = useMemo(() => second2Minute(timer.time), [timer.time]);
  const isTimeout = useMemo(() => minute2Second(p.limit) < timer.time, [timer.time, p.limit]);
  const styles = useTimeBoxItemStyles({ isTimeout });

  useEffectOnce(timer.go);

  const onStopClick = () => {
    timer.stop();
    setStopBtnDisabled(true);
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar className={styles.clockIcon}>
          <AccessAlarmIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant='subtitle1'>{`${p.who} has cost`}</Typography>}
        secondary={<Fragment>
          <Typography variant='body2'>{`${costMinSndPair.minutes} MIN ${costMinSndPair.reservedSeconds} S`}</Typography>
          <Typography variant='body2'>{`LIMIT: ${p.limit}MIN`}</Typography>
        </Fragment>} />
      <ListItemSecondaryAction>
        <IconButton onClick={onStopClick} edge='end' disabled={isStopBtnDisabled}>
          <StopIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

type BoxState = TimeBoxItemProps & { id: number; };
// hooks
const useTimeBoxes = () => {
  const [timeBoxes, setTimeBoxes] = useState<BoxState[]>([]);

  /* -------------------------------------------------------------------------- */
  /*                                    WRITE                                    */
  /* -------------------------------------------------------------------------- */
  const newTimeBox = (p: Pick<TimeBoxItemProps, 'who' | 'limit'>) => {
    const concatNew = concat<BoxState[]>([{ ...p, id: timeBoxes.length }]);
    setTimeBoxes(concatNew);
  };

  return {
    newTimeBox, timeBoxes
  };

};