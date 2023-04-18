import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserFlow, UsersEntity, flowOrder } from '../../common/types/entites/user.entity';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import flow from '../flow.json';
import { ThemeProvider } from '@emotion/react';
import { Grid, TextField, CssBaseline, Paper, Box, Typography, Button, createTheme } from '@mui/material';
import { setUser } from '../../redux/userSlice';
import {
  ConfirmDetailsProps,
  CreateEventProps,
  PlannersProps,
  SettingsProps
} from '../../common/types/interface/flow.interface';
import { ConfirmDetails } from './components/confirmDetails';
import { CreateEvent } from './components/CreateEvent';
import { Planners } from './components/Planners';
import { Settings } from './components/Settings';
import { FieldErrors, useForm } from 'react-hook-form';
import { ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EventEntity } from '../../common/types/entites/events.entity';
import { ApiServices } from '../../api/apiService';

export class State {
  errors: FieldErrors<ZodFlowType>;
  prevState: null;
}
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
export class FlowPageState extends State {
  confirmDetails: ConfirmDetailsProps;
  createEvent: CreateEventProps;
  planners: PlannersProps;
  settings: SettingsProps;
}

const initState: FlowPageState & State = {
  confirmDetails: {} as ConfirmDetailsProps,
  createEvent: {} as CreateEventProps,
  planners: {} as PlannersProps,
  settings: {} as SettingsProps,
  errors: {} as FieldErrors<ZodFlowType>,
  prevState: null
};

type ZodFlowType = ConfirmDetailsProps | CreateEventProps | PlannersProps | SettingsProps;

const theme = createTheme();

const getStep = (flow: UserFlow): keyof UserFlow => {
  for (const step of flowOrder) {
    if (!flow[step]) {
      return step as keyof UserFlow;
    }
  }
  return 'onGoing';
};

export const FlowPage = () => {
  const userState: UsersEntity = useSelector((state: RootState) => state.user.user);
  const [step, setStep] = useState(getStep(userState.flow));
  const [parentState, setParentState] = useState<FlowPageState | null>(initState);
  const [component, setComponent] = useState(null);
  const [settings, setSettings] = useState({});
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (step) {
      setComponent(getComponent());
    }
  }, [step]);

  useEffect(() => {
    console.log(parentState);
  }, [parentState]);

  const handleChange = (event: HTMLInputEvent) => {
    const { name, value, files } = event.target;
    if (name == 'image') {
      setFile(files[0]);
    }
    console.log(name, value);

    setParentState((prevState) => ({
      ...prevState,
      [step]: {
        [name]: value,
        ...prevState[step]
      }
    }));
  };

  const onChangeTest = (event: HTMLInputEvent) => {
    const { name, value, files } = event.target;

    setSettings((prevState) => ({
      ...prevState,
      [name]: value
    }));

    setParentState((prevState) => ({
      ...prevState,
      [step]: {
        [name]: value,
        ...prevState[step]
      }
    }));
  };

  const handleChangeDate = (value: any, name: string) => {
    const stateValue = name === 'date' ? new Date(value.$d).getTime() : `${value.$H}:${value.$m}`;

    setParentState((prevState) => ({
      ...prevState,
      [step]: {
        ...prevState[step],
        [name]: stateValue
      }
    }));
  };

  const next = async <T,>(data: T) => {
    if (flowOrder.indexOf(step) === flowOrder.length - 2) {
      await hundleSubmit();
    } else {
      setStep(getStep({ ...userState.flow, [step]: true }));
      dispatch(
        setUser({
          ...userState,
          phone: parentState.confirmDetails.phone || userState.phone,
          flow: { ...userState.flow, [step]: true }
        })
      );
    }
  };
  const hundleSubmit = async () => {
    const apiService = new ApiServices();

    var formData = new FormData();

    for (const key of Object.keys(file)) {
      formData.append('image', file[key]);
    }

    for (let i in parentState.createEvent) {
      formData.append(i, parentState.createEvent[i]);
    }

    const plannerA = {};
    const plannerB = {};
    for (let prop in parentState.planners) {
      if (prop.endsWith('B')) {
        plannerA[prop] = parentState.planners[prop];
      } else {
        plannerB[prop] = parentState.planners[prop];
      }
    }

    formData.append('planners', JSON.stringify([plannerA, plannerB]));

    const userUpdates = await apiService.loginOrRegister(parentState.confirmDetails);

    const event = await apiService.createEvent(formData);

    const settings: SettingsProps = parentState.settings;

    const eventSettings = await apiService.evnetSettings(event.id, settings);
  };

  const back = (e) => {
    e.preventDefault();

    const currentStepIndex = flowOrder.indexOf(step);

    const prevStep = flowOrder[currentStepIndex - 1];

    dispatch(
      setUser({
        ...userState,
        flow: { ...userState.flow, [step]: false, [prevStep]: false }
      })
    );

    setStep(getStep({ ...userState.flow, [step]: false, [prevStep]: false }));
  };

  const getComponent = () => {
    switch (typeof step == 'string') {
      case step === 'confirmDetails':
        return (
          <ConfirmDetails handleChange={handleChange} parentState={parentState} next={next} step={step} back={back} />
        );
      case step === 'createEvent':
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
      case step === 'planners':
        return (
          <Planners
            handleChange={handleChange}
            parentState={parentState}
            step={step}
            next={next}
            back={back}
            setParentState={setParentState}
          />
        );
      case step === 'settings':
        return (
          <Settings
            handleChange={handleChange}
            parentState={parentState}
            step={step}
            next={next}
            back={back}
            setParentState={setParentState}
          />
        );
      default:
        navigate('/home');
    }
  };

  return component ? (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${step && flow[step]?.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'top'
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={12} square>
          <Box
            sx={{
              my: 12,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
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
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                ></Box>
              ) : (
                ''
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
