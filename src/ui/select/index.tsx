import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export function MDSelect({ register, label, options, handleChange, value, name, errors }): JSX.Element {
  return (
    <>
      <InputLabel
        sx={{
          display: 'flex',
          justifyContent: 'start'
        }}
      >
        {label}
      </InputLabel>
      <Select
        {...register(name)}
        helperText={errors[name] && (errors[name].message as string)}
        error={!!errors[name]}
        sx={{ marginBottom: '5px' }}
        labelId="demo-simple-select-required-label"
        id="demo-simple-select-required"
        value={value}
        label={label}
        onChange={handleChange}
        required
        fullWidth
        margin="none"
        name={name}
        defaultValue={'Choose an Event'}
      >
        {options &&
          options.map((option) => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          })}
      </Select>
    </>
  );
}
