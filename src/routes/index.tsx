import { LoginPage } from '../pages/auth/login';
import { RegisterPage } from '../pages/auth/register';
import { ConfirmDetails } from '../pages/flow/components/confirmDetails';
import { CreateEvent } from '../pages/flow/components/CreateEvent';
import { Planners } from '../pages/flow/components/Planners';
import { FlowPage } from '../pages/flow/flow';
import { Settings } from '../pages/flow/components/Settings';
import { HomePage } from '../pages/dashboard/home/Home';
import { EventSettings } from '../pages/dashboard/eventSettings/eventSettings';

export const mainRoutes = [
  {
    path: 'login',
    name: 'Login',
    public: true,
    component: <LoginPage />
  },
  {
    path: 'register',
    name: 'Register',
    public: true,
    component: <RegisterPage />
  },
  {
    path: 'flow/:step',
    name: 'flow',
    public: true,
    component: <FlowPage />
  },

  {
    path: 'flow',
    name: 'flow',
    public: true,
    component: <FlowPage />
  }
];
// ['תמונת מצב', 'אורחים', 'משימות', 'פרופיל', 'הגדרות אירוע'];

export const dashboardRoutes = [
  {
    path: 'home',
    name: 'תמונת מצב',
    public: true,
    component: <HomePage />
  },
  {
    path: 'event-settings',
    name: 'הגדרות אירוע',
    public: true,
    component: <EventSettings />
  },
  {
    path: 'register',
    name: 'Register',
    public: true,
    component: <RegisterPage />
  }
];
