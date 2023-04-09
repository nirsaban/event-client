import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Copyright, Error, Facebook, Google } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import { z, ZodType } from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  signInWithFacebook,
  signInWithGoogle,
  registerWithEmailAndPassword,
} from "../../api/firebase";
import { UserFlow, UsersEntity, flowOrder } from "../../common/types/entites/user.entity";
import { RootState } from "../../redux/store";
import { setUser } from "../../redux/userSlice";
import { UIInput, UIInputProps } from "../../ui/input";
import { useNavigate } from "react-router-dom";
import { LinkTo } from "../../ui/link";
import { FlowLayout } from "../../layout/flow.layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";

class BaseState {
  error: string;
  prevState: null;
}

class FormState {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const schema: ZodType<Partial<FormState>> = z
  .object({
    firstName: z.string().min(2).max(30).nonempty(),
    lastName: z.string().min(5).max(30).nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(5).max(20).nonempty(),
    confirmPassword: z.string().min(5).max(20).nonempty(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type ValidationSchema = z.infer<typeof schema>;

const theme = createTheme();

export function RegisterPage() {
  const [state, setState] = useState<(FormState & BaseState) | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickFacebook = async (e) => {
    try {
      e.preventDefault();
      const user: UsersEntity = await signInWithFacebook();
      dispatch(setUser(user));

      if (user.flow.onGoing) {
        navigate("/home");
      } else navigate(`/flow/${getStep(user.flow)}`);
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    }
  };
  const handleClickGoogle = async (e) => {
    try {
      e.preventDefault();
      const user: UsersEntity = await signInWithGoogle();
      dispatch(setUser(user));
      if (user.flow.onGoing) {
        navigate("/home");
      } else navigate(`/flow/${getStep(user.flow)}`);
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    }
  };

  const handleClick = async (data: FormState) => {
    try {
      const user: UsersEntity = await registerWithEmailAndPassword({ ...data });
      dispatch(setUser(user));
      if (user.flow.onGoing) {
        navigate("/home");
      } else navigate(`/flow/${getStep(user.flow)}`);
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    }
  };

  const getStep = (flow: UserFlow): keyof UserFlow => {
    for (const step of flowOrder) {
      if (!flow[step]) {
        return step as keyof UserFlow;
      }
    }
  };
  const inputs: UIInputProps[] = [
    {
      type: "text",
      name: "firstName" as keyof FormState,
      label: "Name",
      handleChange: handleChange,
      placeholder: "Enter name",
      required: true,
      defaultValue: "",
      value: state && state["firstName"],
      register: (name: string) => register("firstName"),
    },
    {
      type: "text",
      name: "lastName" as keyof FormState,
      label: "Last Name",
      handleChange: handleChange,
      placeholder: "Enter Last Name",
      required: true,
      defaultValue: "",
      value: state && state["lastName"],
      register: (name: string) => register("lastName"),
    },
    {
      type: "text",
      name: "email" as keyof FormState,
      label: "Email",
      handleChange: handleChange,
      placeholder: "Enter email",
      required: true,
      defaultValue: "",
      value: state && state["email"],
      register: (name: string) => register("email"),
    },
    {
      type: "password",
      name: "password" as keyof FormState,
      label: "Password",
      handleChange: handleChange,
      placeholder: "Enter password",
      required: true,
      defaultValue: "",
      value: state && state["password"],
      register: (name: string) => register("password"),
    },
    {
      type: "password",
      name: "confirmPassword" as keyof FormState,
      label: "Confirm Password",
      handleChange: handleChange,
      placeholder: "Enter password again",
      required: true,
      defaultValue: "",
      value: state && state["confirmPassword"],
      register: (name: string) => register("confirmPassword"),
    },
  ];

  return (
    <FlowLayout image={"https://storage.googleapis.com/events-confirmation/storage/login.png"}>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              my: 3,
              mx: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <Facebook onClick={handleClickFacebook} />
            </Avatar>
            <Avatar sx={{ m: 1, bgcolor: "warning.main" }}>
              <Google onClick={handleClickGoogle} />
            </Avatar>
          </Box>

          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(handleClick)} sx={{ mt: 1 }}>
            {inputs.map((input) => {
              return (
                <>
                  <Grid item xs={12}>
                    <UIInput {...input} errors={errors} />
                  </Grid>
                </>
              );
            })}

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            {state?.error ? (
              <Box
                sx={{
                  my: 2,
                  mx: 4,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography component="span" color={"red"}>
                  {state?.error}
                </Typography>
                <Error style={{ color: "red" }} />
              </Box>
            ) : (
              ""
            )}

            <Grid>
              <Grid item>
                <LinkTo text={"Already have an account?"} to="/login" label="Login Here" />
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </FlowLayout>
  );
}
