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

const schema: ZodType<Partial<CreateEventProps>> = schemas.createEvent;
type ValidationSchema = z.infer<typeof schema>;

export const CreateEvent = ({ back, step, next, handleChange, parentState, handleChangeDate }) => {
  const userState: UsersEntity = useSelector((state: RootState) => state.user.user);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema)
  });

  const inputs = [
    {
      name: 'type',
      type: 'select',
      label: 'The event Kind',
      options: ['weeding', 'other'],
      handleChange: handleChange,
      register: (name: string) => register('type')
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date',
      placeholder: 'Enter Date',
      handleChange: handleChange,
      register: (name: string) => register('date')
    },
    {
      name: 'time',
      type: 'time',
      label: 'Time',
      placeholder: 'Enter Time',
      handleChange: handleChange,
      register: (name: string) => register('time')
    },
    {
      name: 'locationName',
      type: 'text',
      label: 'Location name',
      placeholder: 'Enter Location name',
      handleChange: handleChange,
      register: (name: string) => register('locationName')
    },
    {
      name: 'locationAddress',
      type: 'text',
      label: 'Location address',
      placeholder: 'Hertzel 31',
      handleChange: handleChange,
      register: (name: string) => register('locationAddress')
    }
  ] as unknown as InputFlow[];

  const renderInputs = (inputs: InputFlow[]): JSX.Element[] => {
    return inputs.map((input) => {
      input.defaultValue =
        parentState.createEvent && parentState.createEvent[input.name]
          ? parentState.createEvent && parentState.createEvent[input.name]
          : (userState && userState[input.name]) || undefined;
      return <UIInput {...input} errors={errors} handleChange={handleChange} handleChangeDate={handleChangeDate} />;
    });
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(() => next<ValidationSchema>())}
        sx={{ mt: 1 }}
        style={{ width: '85%' }}
      >
        {renderInputs(inputs)}
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
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={back}>
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
