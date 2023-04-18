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

export enum EventTypeEnum {
  'weeding' = 'weeding',
  'other' = 'other'
}

const schema: ZodType<Partial<PlannersProps>> = schemas.planners;

type ValidationSchema = z.infer<typeof schema>;

export const Planners = ({ setParentState, back, step, next, handleChange, parentState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema)
  });
  const userState: UsersEntity = useSelector((state: RootState) => state.user.user);

  const inputs = [
    {
      name: 'group',
      inputs: [
        {
          name: 'firstName',
          type: 'text',
          label: 'First name',
          placeholder: 'Enter guests amount',
          handleChange: handleChange,
          register: () => register('firstNameB'),
          col: 6
        },
        {
          name: 'lastNameB',
          type: 'text',
          label: 'Last name',
          placeholder: 'Enter guests amount',
          handleChange: handleChange,

          register: () => register('lastNameB'),
          col: 6
        },
        {
          name: 'rollB',
          type: 'select',
          label: 'Who is',
          options: ['Groom', 'Bride'],
          handleChange: handleChange,
          register: () => register('rollB'),
          col: 6
        },
        {
          name: 'phoneB',
          type: 'tel',
          label: 'Phone number',
          placeholder: 'Enter phone number',
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
          label: 'First name',
          placeholder: 'Enter guests amount',
          register: () => register('firstName'),
          disabled: true,
          col: 6
        },
        {
          name: 'lastName',
          type: 'text',
          label: 'Last name',
          placeholder: 'Enter guests amount',
          register: () => register('lastName'),
          disabled: true,
          col: 6
        },
        {
          name: 'roll',
          type: 'select',
          label: 'Who is',
          options: ['Groom', 'Bride'],
          register: () => register('roll'),
          col: 6
        },
        {
          name: 'phone',
          type: 'tel',
          label: 'Phone number',
          placeholder: 'Enter phone number',
          disabled: true,
          register: () => register('phone'),
          col: 6
        }
      ]
    },
    {
      name: 'image',
      type: 'file',
      label: 'Background event Image',
      placeholder: 'Choose the image for the event',
      register: () => register('image')
    }
  ] as unknown as InputFlow[];
  const renderInputs = (inputs: InputFlow[]): JSX.Element[] => {
    return inputs.map((input) => {
      input.defaultValue = userState[input.name] || undefined;
      input.value = parentState.planners && parentState.planners[input.name];
      if (input.name == 'group') {
        return (
          <Grid container spacing={2}>
            {input.inputs.map((input) => {
              if (input.name == 'image') {
                if (parentState.planners && parentState.planners[input.name]) {
                  input.defaultValue = parentState.planners[input.name][0].name || undefined;
                }
              } else {
                input.defaultValue =
                  parentState.planners && parentState.planners[input.name]
                    ? parentState.planners && parentState.planners[input.name]
                    : (userState && userState[input.name]) || undefined;
              }
              if (input.disabled) {
                setParentState((prevState) => ({
                  ...prevState,
                  [step]: {
                    ...prevState[step],
                    [input.name]: input.defaultValue
                  }
                }));
              }
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
