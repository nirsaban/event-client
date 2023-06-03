import React, { Fragment, ReactNode } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { dashboardRoutes, mainRoutes } from './routes';
import { LoginPage } from './pages/auth/login';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { setLoader } from './redux/loaderSlice';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
function App() {
  const dispatch = useDispatch();
  const loaderState: boolean = useSelector((state: RootState) => state?.loader?.loader);
  const getRoutes = (): ReactNode => {
    return mainRoutes.map((route) => {
      return <Route path={route.path} element={route.component} key={route.path} />;
    });
  };
  const getDashboardRoutes = () => {
    return dashboardRoutes.map((route) => {
      return <Route path={route.path} element={route.component} key={route.path} />;
    });
  };

  return (
    <div className="App">
      <Routes>
        {getRoutes()}
        {getDashboardRoutes()}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loaderState}
        onClick={() => dispatch(setLoader(false))}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default App;
