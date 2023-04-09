import React from "react";
import { makeStyles } from "@mui/material";
import { TextField } from "@mui/material";
import { UIInputProps } from ".";

export function IsraeliPhoneNumberInput({ errors, register, ...rest }: UIInputProps) {
  console.log(register);
  return (
    <TextField
      {...register(rest.name)}
      helperText={errors[rest.name] && (errors[rest.name].message as string)}
      error={!!errors[rest.name]}
      disabled={rest.disabled}
      key={rest.label}
      margin="normal"
      required
      fullWidth={!rest.col}
      label="Phone Number (Israel)"
      name={rest.name as string}
      autoFocus
      defaultValue={rest.defaultValue}
      value={rest.value}
      onChange={rest.handleChange}
      placeholder="054-123-4567"
      inputProps={{
        maxLength: 10,
        pattern: "^[0-9]{3}-[0-9]{3}-[0-9]{4}$",
      }}
    />
  );
}
