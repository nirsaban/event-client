import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { InputFlow, PlannersProps } from '../../../common/types/interface/flow.interface';
import { RootState } from '../../../redux/store';
import { UIInput } from '../../../ui/input';
import { schemas } from '../flow.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { UsersEntity, flowOrder } from '../../../common/types/entites/user.entity';
import { ZodType, z } from 'zod';
import { useEffect } from 'react';
import { Box, Grid, Button } from '@mui/material';

export enum EventTypeEnum {
  'weeding' = 'weeding',
  'other' = 'other'
}

const schema: ZodType<Partial<PlannersProps>> = schemas.settings;

type ValidationSchema = z.infer<typeof schema>;

export const Settings = ({ back, step, next, handleChange, parentState }) => {
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
      name: 'guestAmount',
      type: 'text',
      label: "Guest's Amount",
      placeholder: 'Enter guests amount',
      handleChange: handleChange,
      register: () => register('guestAmount')
    },
    {
      name: 'maxBudget',
      type: 'text',
      label: 'Maximum Budget',
      placeholder: 'Enter guests amount',
      handleChange: handleChange,
      register: () => register('maxBudget')
    },
    {
      name: 'reserve',
      type: 'text',
      label: 'Reserve sits amount',
      placeholder: 'Enter guests amount',
      handleChange: handleChange,
      register: () => register('reserve')
    },
    {
      name: 'tableSits',
      type: 'text',
      label: 'Table sits amount',
      placeholder: '12..',
      handleChange: handleChange,
      register: () => register('tableSits')
    },
    {
      name: 'knightsTableSits',
      type: 'text',
      label: 'knights Table  sits amount',
      placeholder: '25..',
      handleChange: handleChange,
      register: () => register('knightsTableSits')
    }
  ] as unknown as InputFlow[];

  const renderInputs = (inputs: InputFlow[]): JSX.Element[] => {
    return inputs.map((input) => {
      input.defaultValue =
        parentState.createEvent && parentState.createEvent[input.name]
          ? parentState.createEvent && parentState.createEvent[input.name]
          : (userState && userState[input.name]) || undefined;
      return <UIInput {...input} errors={errors} handleChange={handleChange} />;
      return <UIInput {...input} errors={errors} {...handleChange} />;
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
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
