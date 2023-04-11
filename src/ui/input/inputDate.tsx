import { Grid, TextField } from "@mui/material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
  MobileTimePicker,
  StaticTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { UIInputProps } from ".";
import dayjs from "dayjs";
const tomorrow = dayjs().add(1, "day");
const timeNow = dayjs().hour(19).minute(30).second(0);

export const InputDate = ({
  register,
  handleChangeDate,
  errors,
  ...rest
}: UIInputProps) => {
  return (
    <Grid container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label={rest.label}
            defaultValue={tomorrow}
            disablePast
            onChange={(newValue) => handleChangeDate(newValue, "date")}
          />

          <MobileTimePicker
            label={"Time"}
            defaultValue={timeNow}
            {...register(rest.name)}
            onChange={(newValue) => handleChangeDate(newValue, "time")}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Grid>
  ) as JSX.Element;
};
