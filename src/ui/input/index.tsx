import { Box, Grid, TextField, Button } from '@mui/material';

import React, { ChangeEventHandler, Fragment, ReactElement, ReactNode } from 'react';
import { MDSelect } from '../select';
import { IsraeliPhoneNumberInput } from './inputPhone';
import { z, ZodType } from 'zod';
import { UseFormRegister, FormState, UseFormRegisterReturn, FieldErrors } from 'react-hook-form';
import { InputDate } from './inputDate';

export type UIInputProps = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  required: boolean;
  value: any;
  defaultValue: any;
  col?: string;
  inputs?: UIInputProps[];
  disabled?: boolean;
  handleChangeDate?: (value: any, name: string) => void;
  errors?: FieldErrors;
  register?: (name: string, RegisterOptions?) => { onChange; onBlur; name; ref };
};

export function UIInput({
  handleChange,
  handleChangeDate,
  register,
  errors,
  ...rest
}: UIInputProps): ReactElement<UIInputProps> {
  const renderInput = (rest): JSX.Element => {
    if (rest.type == 'select') {
      return <MDSelect {...rest} handleChange={handleChange} register={register} errors={errors} />;
    }

    if (rest.type == 'text' || rest.type == 'password') {
      return (
        <Grid item xs={12}>
          <TextField
            type={rest.type}
            {...register(rest.name)}
            disabled={rest.disabled || false}
            key={rest.name}
            margin="normal"
            required
            fullWidth={true}
            id={rest.name}
            label={rest.label}
            name={rest.name}
            autoFocus
            defaultValue={rest.defaultValue}
            value={rest.value}
            helperText={errors[rest.name] && (errors[rest.name].message as string)}
            error={!!errors[rest.name]}
            onChange={handleChange}
          />
        </Grid>
      ) as JSX.Element;
    } else if (rest.type == 'number') {
      return (
        <TextField
          type={rest.type}
          {...register(rest.name)}
          disabled={rest.disabled || false}
          key={rest.name}
          margin="normal"
          required
          fullWidth={true}
          id={rest.name}
          label={rest.label}
          name={rest.name}
          value={rest.value}
          autoFocus
          helperText={errors[rest.name] && (errors[rest.name].message as string)}
          error={!!errors[rest.name]}
          onChange={handleChange}
        />
      );
    } else if (rest.type == 'tel') {
      return (
        <Grid container>
          <IsraeliPhoneNumberInput errors={errors} register={register} {...rest} handleChange={handleChange} />
        </Grid>
      );
    } else if (rest.name === 'group') {
      return (
        <Grid container spacing={2}>
          {rest.inputs.map((input) => {
            return (
              <Grid item xs={input.col}>
                {renderInput(input)}
              </Grid>
            );
          })}
        </Grid>
      );
    } else if (rest.type == 'date') {
      return <InputDate {...rest} register={register} errors={errors} handleChangeDate={handleChangeDate} />;
    } else if (rest.type == 'time') {
      return <InputDate {...rest} register={register} errors={errors} handleChangeDate={handleChangeDate} />;
    } else if (rest.type == 'file') {
      return (
        <Grid container sx={{ m: 2 }}>
          <Button variant="contained" component="label">
            Upload Event Image
            <input
              type="file"
              accept="image/*"
              hidden
              {...rest}
              value={''}
              {...register(rest.name)}
              onChange={handleChange}
            />
          </Button>
        </Grid>
      );
    }
  };
  return <>{renderInput(rest)}</>;
}
