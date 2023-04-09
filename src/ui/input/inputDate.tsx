import { Grid } from "@mui/material";
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

export const InputDate = ({ handleChangeDate, ...rest }: UIInputProps) => {
  return (
    <Grid container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label={rest.label}
            onChange={(newValue) => handleChangeDate(newValue, "date")}
          />

          <MobileTimePicker
            label={"Time"}
            onChange={(newValue) => handleChangeDate(newValue, "time")}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Grid>
  ) as JSX.Element;
};
