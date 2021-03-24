import { Box, Container, IconButton, List, Paper, Slider, SliderProps, TextField } from '@material-ui/core';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { compose, concat, isEmpty } from 'ramda';
import React, { useCallback, useMemo, useState } from 'react';
import { KeyCatcher } from '../../component/key-catcher';
import { event2Value, isArray } from '../../util/obj';
import { useTimeBoxPageStyles } from './index.style';
import { TimeBoxItem, TimeBoxItemProps } from './time-box-item';



const defaultName = '';
const defaultLimit = 10;
export type TimeBoxPageProps = {
};
export const TimeBoxPage = (p: TimeBoxPageProps) => {
  const data = useTimeBoxes();
  const [name, setName] = useState(defaultName);
  const [limit, setLimit] = useState(defaultLimit);
  const backToDefaultName = () => setName(defaultName);
  const notReady = useMemo(() => isEmpty(name), [name]);
  const styles = useTimeBoxPageStyles();

  const newTimer = useCallback(() => {
    if (notReady) {
      return;
    }
    backToDefaultName();
    data.newTimeBox({ who: name, limit });
  }, [data, name, limit, notReady]);

  const onTimeBoxLimitSliderChangeCommitted: SliderProps['onChangeCommitted'] = (_, v) => {
    if (!isArray(v)) {
      setLimit(v);
    }
  };

  return (
    <Container>
      <Paper className={styles.container}>

        <Box display='flex' flexDirection='row' justifyContent='center' mb={2}>
          <Box>
            {/** time slider for determine how long the timeBox is */}
            <Slider defaultValue={defaultLimit} step={5} min={5} max={30} marks valueLabelDisplay='auto' onChangeCommitted={onTimeBoxLimitSliderChangeCommitted} />

            <Box display='flex' alignItems='center'>
              {/** input for determine who will be related to the timeBox */}
              <KeyCatcher onEnter={newTimer}>
                <TextField
                  placeholder='Activity or People'
                  variant='outlined'
                  value={name}
                  onChange={compose(setName, event2Value)}
                  InputProps={{
                    endAdornment: <IconButton disabled={notReady} onClick={newTimer}>
                      <HourglassEmptyIcon />
                    </IconButton>
                  }} />
              </KeyCatcher>
            </Box>
          </Box>
        </Box>

        <List>
          {data.timeBoxes.map(t =>
            <Box key={t.id}>
              <TimeBoxItem  {...t} />
            </Box>
          )}
        </List>

      </Paper>
    </Container>

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