import { ChangeEventHandler, useState } from 'react';
import { ConfirmDetailsProps, InputFlow, PlannersProps } from '../../../common/types/interface/flow.interface';
import { UIInput } from '../../../ui/input';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UsersEntity, flowOrder } from '../../../common/types/entites/user.entity';
import { RootState } from '../../../redux/store';
import { Button } from '@mui/material';
import { InputDate } from '../../../ui/input/inputDate';
import { Box, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schemas } from '../flow.schemas';
import { ZodType, z } from 'zod';
import { ButtonsFooter } from './buttons';

const schema: ZodType<Partial<PlannersProps>> = schemas.planners;

type ValidationSchema = z.infer<typeof schema>;

export const Planners = ({ step, next, back, defaultState }) => {
  const [state, setState] = useState<PlannersProps | null>({ ...defaultState } as PlannersProps);
  const [file, setFile] = useState(null);

  const userState: UsersEntity = useSelector((state: RootState) => state.user.user);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema)
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name == 'image') {
      setFile(files[0]);
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const inputs = [
    {
      name: 'group',
      inputs: [
        {
          name: 'firstNameB',
          type: 'text',
          label: 'שם פרטי',
          placeholder: 'הזן שם פרטי',
          handleChange: handleChange,
          value: state && state['firstNameB'],
          register: () => register('firstNameB'),
          col: 6
        },
        {
          name: 'lastNameB',
          type: 'text',
          label: 'שם משפחה',
          placeholder: 'הזן שם משפחה',
          handleChange: handleChange,
          value: state && state['lastNameB'],
          register: () => register('lastNameB'),
          col: 6
        },
        {
          name: 'rollB',
          type: 'select',
          label: 'מי את.ה?',
          options: ['חתן', 'כלה'],
          handleChange: handleChange,
          value: state && state['rollB'],
          register: () => register('rollB'),
          col: 6
        },
        {
          name: 'phoneB',
          type: 'tel',
          label: 'מסםר נייד',
          placeholder: 'הזן משפר נייד',
          value: state && state['phoneB'],
          register: () => register('phoneB'),
          col: 6
        }
      ]
    },
    {
      name: 'group',
      inputs: [
        {
          name: 'firstName',
          type: 'text',
          label: 'שם פרטי',
          placeholder: 'Enter guests amount',
          register: () => register('firstName'),
          value: userState && userState['firstName'],
          disabled: true,
          col: 6
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'שם משפחה',
          placeholder: 'הזן שם משפחה',
          value: userState && userState['lastName'],
          register: () => register('lastName'),
          disabled: true,
          col: 6
        },
        {
          name: 'roll',
          type: 'select',
          label: 'מי את.ה?',
          options: ['חתן', 'כלה'],
          value: (state && state['roll']) || userState['roll'],
          register: () => register('roll'),
          col: 6
        },
        {
          name: 'phone',
          type: 'tel',
          label: 'מספר נייד',
          placeholder: 'הזן מספר נייד',
          value: userState && userState['phone'],
          disabled: true,
          register: () => register('phone'),
          col: 6
        }
      ]
    },
    {
      name: 'image',
      type: 'file',
      label: 'תמונה רקע שלכם',
      placeholder: 'העלו תמונת רקע משותפת שלכם',
      register: () => register('image')
    }
  ] as unknown as InputFlow[];

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(() => next<ValidationSchema>({ ...state, file: file }))}
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
                      <UIInput errors={errors} {...input} handleChange={handleChange} />
                    </Grid>
                  );
                })}
              </Grid>
            );
          } else {
            return <UIInput errors={errors} {...input} handleChange={handleChange} />;
          }
        })}
        {step ? <ButtonsFooter<ValidationSchema> state={state} back={back} step={step} /> : ''}
      </Box>
    </>
  );
};
