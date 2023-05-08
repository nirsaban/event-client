import { ChangeEventHandler, useState } from 'react';
import { ConfirmDetailsProps, CreateEventProps, InputFlow } from '../../../common/types/interface/flow.interface';
import { UIInput } from '../../../ui/input';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UsersEntity, flowOrder } from '../../../common/types/entites/user.entity';
import { RootState } from '../../../redux/store';
import { Button } from '@mui/material';
import { InputDate } from '../../../ui/input/inputDate';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import { schemas } from '../flow.schemas';
import dayjs from 'dayjs';

const schema: ZodType<Partial<CreateEventProps>> = schemas.createEvent;
type ValidationSchema = z.infer<typeof schema>;

const defaultDate = dayjs().add(1, 'day');
const defaultTime = dayjs().hour(1).minute(30).second(0);

export const CreateEvent = ({ back, step, next, defaultState }) => {
  const userState: UsersEntity = useSelector((state: RootState) => state.user.user);
  const [state, setState] = useState<CreateEventProps | null>({
    ...defaultState,
    dateRendering: defaultState.dateRendering || defaultDate,
    timeRendering: defaultState.timeRendering || defaultTime
  } as CreateEventProps);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema)
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChangeDate = (value: any, name: string) => {
    const stateValue = name === 'date' ? new Date(value.$d).getTime() : `${value.$H}:${value.$m}`;

    setState((prevState) => ({
      ...prevState,
      [name]: stateValue,
      [`${name}Rendering`]: value
    }));
  };

  const inputs = [
    {
      name: 'group',
      inputs: [
        {
          name: 'date',
          type: 'date',
          label: 'Date',
          placeholder: 'Enter Date',
          handleChangeDate: handleChangeDate,
          value: state && state['dateRendering'],
          register: (name: string) => register('date')
        },
        {
          name: 'time',
          type: 'time',
          label: 'Time',
          placeholder: 'Enter Time',
          handleChangeDate: handleChangeDate,
          value: state && state['timeRendering'],
          register: (name: string) => register('time')
        }
      ]
    },
    {
      name: 'type',
      type: 'select',
      label: 'The event Kind',
      options: ['weeding', 'other'],
      handleChange: handleChange,
      value: state && state['type'],
      register: (name: string) => register('type')
    },

    {
      name: 'locationName',
      type: 'text',
      label: 'Location name',
      placeholder: 'Enter Location name',
      handleChange: handleChange,
      value: state && state['locationName'],
      register: (name: string) => register('locationName')
    },
    {
      name: 'locationAddress',
      type: 'text',
      label: 'Location address',
      placeholder: 'Hertzel 31',
      handleChange: handleChange,
      value: state && state['locationAddress'],
      register: (name: string) => register('locationAddress')
    }
  ] as unknown as InputFlow[];

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(() => next<ValidationSchema>(state))}
        sx={{ mt: 1 }}
        style={{ width: '85%' }}
      >
        {inputs.map((input) => {
          if (input.name == 'group') {
            return (
              <Grid container spacing={2}>
                {input.inputs.map((input) => {
                  return (
                    <Grid item xs={input.col}>
                      <UIInput errors={errors} {...input} />
                    </Grid>
                  );
                })}
              </Grid>
            );
          } else {
            return <UIInput errors={errors} {...input} />;
          }
        })}
        <Grid
          container
          sx={{
            display: 'flex',
            padding: 1,
            justifyContent: `${flowOrder.indexOf(step) > 1 ? 'space-between' : 'center'}`,
            margin: 'auto auto'
          }}
        >
          <Box>
            {flowOrder.indexOf(step) > 1 ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => back<ValidationSchema>(e, state)}
              >
                Back
              </Button>
            ) : (
              ''
            )}
          </Box>
          <Box>
            {flowOrder.indexOf(step) === flowOrder.length - 2 ? (
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Finish and Submit
              </Button>
            ) : (
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Next
              </Button>
            )}
          </Box>
        </Grid>
      </Box>
    </>
  );
};
