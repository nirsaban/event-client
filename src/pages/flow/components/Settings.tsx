import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { InputFlow, SettingsProps } from '../../../common/types/interface/flow.interface';
import { RootState } from '../../../redux/store';
import { UIInput } from '../../../ui/input';
import { schemas } from '../flow.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { UsersEntity, flowOrder } from '../../../common/types/entites/user.entity';
import { ZodType, z } from 'zod';
import { useEffect, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { ButtonsFooter } from './buttons';

const schema: ZodType<Partial<SettingsProps>> = schemas.settings;

type ValidationSchema = z.infer<typeof schema>;

export const Settings = ({ back, step, next, defaultState }) => {
  const userState: UsersEntity = useSelector((state: RootState) => state.user.user);
  const [state, setState] = useState<SettingsProps | null>({ ...defaultState } as SettingsProps);
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

  const inputs = [
    {
      name: 'guestAmount',
      type: 'number',
      label: 'כמות האורחים',
      placeholder: 'הזן כמות אורחים משוערת',
      handleChange: handleChange,
      value: state && state['guestAmount'],
      register: () => register('guestAmount')
    },
    {
      name: 'maxBudget',
      type: 'number',
      label: 'מקסימום תקציב ',
      placeholder: 'Enter Budget',
      handleChange: handleChange,
      value: state && state['maxBudget'],
      register: () => register('maxBudget')
    },
    {
      name: 'reserve',
      type: 'number',
      label: 'כמות רזרבה',
      placeholder: 'כמות אורחים משוערת ברזרבה',
      value: state && state['reserve'],
      handleChange: handleChange,
      register: () => register('reserve')
    },
    {
      name: 'tableSits',
      type: 'number',
      label: 'מספר כיסאות בשולחן',
      placeholder: '12..',
      value: state && state['tableSits'],
      handleChange: handleChange,
      register: () => register('tableSits')
    },
    {
      name: 'knightsTableSits',
      type: 'number',
      label: 'מספר כיסאות בשולחן אביר',
      placeholder: '25..',
      value: state && state['knightsTableSits'],
      handleChange: handleChange,
      register: () => register('knightsTableSits')
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
          return (
            <>
              <Grid item xs={12}>
                <UIInput {...input} key={input.name} errors={errors} />
              </Grid>
            </>
          );
        })}
        {step ? <ButtonsFooter<ValidationSchema> state={state} back={back} step={step} /> : ''}
      </Box>
    </>
  );
};
