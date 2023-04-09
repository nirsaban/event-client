import { LoginPage } from "../pages/auth/login";
import { RegisterPage } from "../pages/auth/register";
import { ConfirmDetails } from "../pages/flow/components/confirmDetails";
import { CreateEvent } from "../pages/flow/components/CreateEvent";
import { Planners } from "../pages/flow/components/Planners";
import { FlowPage } from "../pages/flow/flow";
import { Settings } from "../pages/flow/components/Settings";
import { HomePage } from "../pages/Home";

export const routes = [
  {
    path: "login",
    name: "Login",
    public: true,
    component: <LoginPage />,
  },
  {
    path: "register",
    name: "Register",
    public: true,
    component: <RegisterPage />,
  },
  {
    path: "flow/:step",
    name: "flow",
    public: true,
    component: <FlowPage />,
  },
  {
    path: "home",
    name: "home",
    public: true,
    component: <HomePage />,
  },
  {
    path: "flow",
    name: "flow",
    public: true,
    component: <FlowPage />,
  },
];
