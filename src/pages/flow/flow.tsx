import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserFlow,
  UsersEntity,
  flowOrder,
} from "../../common/types/entites/user.entity";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import flow from "../flow.json";
import { ThemeProvider } from "@emotion/react";
import {
  Grid,
  CssBaseline,
  Paper,
  Box,
  Typography,
  Button,
  createTheme,
} from "@mui/material";
import { setUser } from "../../redux/userSlice";
import {
  ConfirmDetailsProps,
  CreateEventProps,
  PlannersProps,
  SettingsProps,
} from "../../common/types/interface/flow.interface";
import { ConfirmDetails } from "./components/confirmDetails";
import { CreateEvent } from "./components/CreateEvent";
import { Planners } from "./components/Planners";
import { Settings } from "./components/Settings";
import { FieldErrors, useForm } from "react-hook-form";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
export class State {
  errors: FieldErrors<ZodFlowType>;
  step: string;
  prevState: null;
}

export class FlowPageState extends State {
  confirmDetails: ConfirmDetailsProps;
  createEvent: CreateEventProps;
  planners: PlannersProps;
  setting: SettingsProps;
  zodSchema: any;
}

const initState: FlowPageState & State = {
  confirmDetails: {} as ConfirmDetailsProps,
  createEvent: {} as CreateEventProps,
  planners: {} as PlannersProps,
  setting: {} as SettingsProps,
  errors: {} as FieldErrors<ZodFlowType>,
  step: "",
  prevState: null,
  zodSchema: null,
};

type ZodFlowType =
  | ConfirmDetailsProps
  | CreateEventProps
  | PlannersProps
  | SettingsProps;

const theme = createTheme();

const getStep = (flow: UserFlow): keyof UserFlow => {
  for (const step of flowOrder) {
    if (!flow[step]) {
      return step as keyof UserFlow;
    }
  }
  return "onGoing";
};
const schema: ZodType<Partial<ConfirmDetailsProps>> = z.object({
  firstName: z.string().min(2).max(20).nonempty(),
  lastName: z.string().min(2).max(20).nonempty(),
  phone: z
    .string()
    .regex(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, "invalid phone number"),
});

type ValidationSchema = z.infer<typeof schema>;
export const FlowPage = () => {
  const userState: UsersEntity = useSelector(
    (state: RootState) => state.user.user
  );
  const [step, setStep] = useState(getStep(userState.flow));
  const [parentState, setParentState] = useState<FlowPageState | null>(
    initState
  );
  const [component, setComponent] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (step) {
      setComponent(getComponent());
    }
  }, [step]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setParentState((prevState) => ({
      ...prevState,
      [step]: {
        ...prevState[step],
        [name]: value,
      },
    }));
  };

  const handleChangeDate = (value: any, name: string) => {
    const stateValue =
      name === "date"
        ? new Date(value.$d).getTime()
        : `${value.$H}:${value.$m}`;

    setParentState((prevState) => ({
      ...prevState,
      [step]: {
        ...prevState[step],
        [name]: stateValue,
      },
    }));
  };

  const next = <T,>(data: T) => {
    dispatch(
      setUser({ ...userState, flow: { ...userState.flow, [step]: true } })
    );

    setStep(getStep({ ...userState.flow, [step]: true }));
  };

  const back = (e) => {
    e.preventDefault();

    const currentStepIndex = flowOrder.indexOf(step);

    const prevStep = flowOrder[currentStepIndex - 1];

    dispatch(
      setUser({
        ...userState,
        flow: { ...userState.flow, [step]: false, [prevStep]: false },
      })
    );

    setStep(getStep({ ...userState.flow, [step]: false, [prevStep]: false }));
  };

  const getComponent = () => {
    switch (typeof step == "string") {
      // case step === "confirmDetails":
      //   return (
      //     <ConfirmDetails
      //       handleChange={handleChange}
      //       parentState={parentState}
      //       next={next}
      //       step={step}
      //     />
      //   );
      case step === "createEvent":
        return (
          <CreateEvent
            handleChange={handleChange}
            parentState={parentState}
            handleChangeDate={handleChangeDate}
            step={step}
            next={next}
            back={back}
          />
        );
      case step === "planners":
        return (
          <Planners
            handleChange={handleChange}
            parentState={parentState}
            step={step}
            next={next}
            back={back}
          />
        );
      // case step === "settings":
      //   return (
      //     <Settings
      //       step={step}
      //       next={next}
      //       back={back}
      //       handleChange={handleChange}
      //       parentState={parentState}
      //     />
      //   );
      default:
        return (
          <Planners
            handleChange={handleChange}
            parentState={parentState}
            step={step}
            next={next}
            back={back}
          />
        );
    }
  };

  return component ? (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${step && flow[step]?.image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={12}
          square
        >
          <Box
            sx={{
              my: 12,
              mx: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              {flow[step]?.title}
            </Typography>
            <Grid container>
              {component}

              {parentState?.errors ? (
                <Box
                  sx={{
                    my: 2,
                    mx: 4,
                    display: "flex",
                    justifyContent: "center",
                  }}
                ></Box>
              ) : (
                ""
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  ) : (
    <>
      <div>no step</div>
    </>
  );
};
