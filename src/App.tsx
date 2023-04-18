import React, { Fragment, ReactNode } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import { LoginPage } from './pages/auth/login';

function App() {
  const getRoutes = (): ReactNode => {
    return routes.map((route) => {
      // if (route.nested) {
      //   return (
      //     <Route path={route.path} element={route.component} key={route.path}>
      //       {route.nested.map((routeNested) => {
      //         return (
      //           <Route
      //             index={routeNested.path == "confirmDetails"}
      //             path={routeNested.path}
      //             element={routeNested.component}
      //             key={routeNested.path}
      //           />
      //         );
      //       })}
      //     </Route>
      //   );
      // }
      return <Route path={route.path} element={route.component} key={route.path} />;
    });
  };

  return (
    <div className="App">
      <Routes>
        {getRoutes()}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
