import { Grid } from '@mui/material';
import { DashboardLayout } from '../../../layout/dashboard.layout';
import { Item } from '../../../components/item';
import { EventsEntity } from '../../../common/types/entites/events.entity';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { SettingsProps } from '../../../common/types/interface/flow.interface';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEvent } from '../../../redux/eventSlice';
const inputs = [
  {
    name: 'guestAmount',
    type: 'number',
    label: "Guest's Amount",
    placeholder: 'Enter guests amount'
  },
  {
    name: 'maxBudget',
    type: 'number',
    label: 'Maximum Budget',
    placeholder: 'Enter Budget'
  },
  {
    name: 'reserve',
    type: 'number',
    label: 'Reserve sits amount',
    placeholder: 'Enter reserve amount'
  },
  {
    name: 'tableSits',
    type: 'number',
    label: 'Table sits amount',
    placeholder: '12..'
  },
  {
    name: 'knightsTableSits',
    type: 'number',
    label: 'knights Table  sits amount',
    placeholder: '25..'
  }
];

export const EventSettings = () => {
  const eventState: EventsEntity = useSelector((state: RootState) => state.event.event);
  const eventSettingsState: SettingsProps = eventState.settings;
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    console.log(eventState);
  }, [eventState]);
  const edit = () => {
    setIsEdit(!isEdit);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setEvent({
      ...eventState,
      settings: {
        ...eventSettingsState,
        [name]: value
      }
    });
  };

  return (
    <DashboardLayout>
      {isEdit ? (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} style={{ width: '85%' }}>
          {inputs.map((rest) => {
            return (
              <>
                <Grid item xs={12}>
                  <TextField
                    type={'number'}
                    key={rest.name}
                    margin="normal"
                    required
                    fullWidth={true}
                    label={rest.label}
                    name={rest.name}
                    defaultValue={eventSettingsState[rest.name]}
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
              </>
            );
          })}
          <Button type="submit" size="small">
            עדכן
          </Button>
        </Box>
      ) : (
        <Grid container>
          <Grid item md={isEdit ? 5 : 12}>
            <Item>
              <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    הגדרות האירוע
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" component="div">
                    מספר מוזמנים: {eventSettingsState.guestAmount}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" component="div">
                    תקציב: {eventSettingsState.maxBudget}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" component="div">
                    מספר מקומות ישיבה בשולחן: {eventSettingsState.tableSits}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" component="div">
                    מספר מקומות ישיבה בשולחן אביר: {eventSettingsState.knightsTableSits}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" component="div">
                    סך הכל רזרבה:{eventSettingsState.reserve}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={edit} size="large">
                    ערוך
                  </Button>
                </CardActions>
              </Card>
            </Item>
          </Grid>
        </Grid>
      )}
    </DashboardLayout>
  );
};
