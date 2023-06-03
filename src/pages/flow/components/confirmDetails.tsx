import { ChangeEventHandler, useState } from 'react';
import { ConfirmDetailsProps, InputFlow } from '../../../common/types/interface/flow.interface';
import { UIInput } from '../../../ui/input';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UsersEntity, flowOrder } from '../../../common/types/entites/user.entity';
import { RootState } from '../../../redux/store';
import { Box, Button, Grid } from '@mui/material';
import { FormState, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemas } from '../flow.schemas';
import { useEffect } from 'react';
import { ButtonsFooter } from './buttons';
const schema: ZodType<Partial<ConfirmDetailsProps>> = schemas.confirmDetails;

type ValidationSchema = z.infer<typeof schema>;

export const ConfirmDetails = ({ step, next, back, defaultState }) => {
  const [state, setState] = useState<ConfirmDetailsProps | null>({ ...defaultState } as ConfirmDetailsProps);
  const userState: UsersEntity = useSelector((state: RootState) => state.user.user);

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
      type: 'text',
      name: 'firstName',
      label: 'שם פרטי',
      placeholder: 'הזן שם פרטי',
      value: (state && state['firstName']) || userState['firstName'],
      register: (name: string) => register('firstName')
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'שם משפחה',
      placeholder: 'הזן שם משפחה',
      value: (state && state['lastName']) || userState['lastName'],
      register: (name: string) => register('lastName')
    },
    {
      name: 'phone',
      type: 'tel',
      label: 'נייד',
      placeholder: 'הזן מספר נייד',
      value: (state && state['phone']) || userState['phone'],
      register: (name: string) => register('phone')
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
                <UIInput {...input} key={input.name} errors={errors} handleChange={handleChange} />
              </Grid>
            </>
          );
        })}
        {step ? <ButtonsFooter<ValidationSchema> state={state} back={back} step={step} /> : ''}
      </Box>
    </>
  );
};
