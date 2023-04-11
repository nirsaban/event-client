import { ChangeEventHandler, useState } from "react";
import {
  ConfirmDetailsProps,
  InputFlow,
} from "../../../common/types/interface/flow.interface";
import { UIInput } from "../../../ui/input";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  UsersEntity,
  flowOrder,
} from "../../../common/types/entites/user.entity";
import { RootState } from "../../../redux/store";
import { Box, Button, Grid } from "@mui/material";
import { FormState, useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "../flow.schemas";

const schema: ZodType<Partial<ConfirmDetailsProps>> = schemas.confirmDetails;
type ValidationSchema = z.infer<typeof schema>;

export const ConfirmDetails = ({ step, next, handleChange, parentState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });

  const inputs = [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      placeholder: "Enter First Name",
      handleChange: handleChange,
      register: (name: string) => register("firstName"),
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Enter Last Name",
      handleChange: handleChange,
      register: (name: string) => register("lastName"),
    },
    {
      name: "phone",
      type: "tel",
      label: "Phone number",
      placeholder: "Enter phone number",
      handleChange: handleChange,
      register: (name: string) => register("phone"),
    },
  ] as unknown as InputFlow[];

  const userState: UsersEntity = useSelector(
    (state: RootState) => state.user.user
  );

  const renderInputs = (inputs: InputFlow[]): JSX.Element[] => {
    return inputs.map((input) => {
      input.defaultValue = (userState && userState[input.name]) || undefined;
      input.value =
        (parentState.confirmDetails &&
          parentState.confirmDetails[input.name]) ||
        undefined;
      return <UIInput {...input} errors={errors} key={input.name} />;
    });
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(() => next<ValidationSchema>())}
        sx={{ mt: 1 }}
        style={{ width: "85%" }}
      >
        {renderInputs(inputs)}
        <Grid
          container
          sx={{
            display: "flex",
            padding: 1,
            justifyContent: `${
              flowOrder.indexOf(step) > 1 ? "space-between" : "center"
            }`,
            margin: "auto auto",
          }}
        >
          <Box>
            {flowOrder.indexOf(step) > 1 ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={back}
              >
                Back
              </Button>
            ) : (
              ""
            )}
          </Box>
          <Box>
            {flowOrder.indexOf(step) === flowOrder.length - 2 ? (
              <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Finish and Submit
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Next
              </Button>
            )}
          </Box>
        </Grid>
      </Box>
    </>
  );
};
