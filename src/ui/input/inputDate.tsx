import { Grid, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker, MobileTimePicker, StaticTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { UIInputProps } from '.';


export const InputDate = ({ register, handleChangeDate, errors, ...rest }: UIInputProps) => {
  return (
    <Grid container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          {rest.type === 'date' ? (
            <DatePicker
              label={rest.label}
              defaultValue={rest.value}
              disablePast
              onChange={(newValue) => handleChangeDate(newValue, 'date')}
            />
          ) : (
            <MobileTimePicker
              label={'Time'}
              defaultValue={rest.value}
              {...register(rest.name)}
              onChange={(newValue) => handleChangeDate(newValue, 'time')}
            />
          )}
        </DemoContainer>
      </LocalizationProvider>
    </Grid>
  ) as JSX.Element;
};
