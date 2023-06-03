import { DashboardLayout } from '../../../layout/dashboard.layout';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { ThemeEvent } from './components/theme';
import { RootState } from '../../../redux/store';
import { EventsEntity } from '../../../common/types/entites/events.entity';
import { useSelector } from 'react-redux';
import { Item } from '../../../components/item';

export const HomePage = () => {
  const eventState: EventsEntity = useSelector((state: RootState) => state.event.event);
  return (
    <DashboardLayout>
      <Grid container>
        <Grid xl={12} sm={12} md={12} xs={12}>
          <Item>
            <ThemeEvent image={eventState.image} date={eventState.date} />
          </Item>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
