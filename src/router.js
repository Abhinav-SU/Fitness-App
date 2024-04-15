import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/auth/authContext';

import SigninLayout from "./layouts/SigninLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
// Make sure to define or import these components if you intend to use them
//import Dashboard from "./pages/Dashboard";
//import PrivateLayout from "./layouts/PrivateLayout";



function PrivateRoute({ layout: Layout, page: Page }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <Layout>
      <Page />
    </Layout>
  );
}

function RouteWrapper({ layout: Layout, page: Page }) {
  return (
    <Layout>
      <Page />
    </Layout>
  );
}


function router() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/sign-in" element={<SigninLayout><Signin /></SigninLayout>} />
          <Route path="/sign-up" element={<SigninLayout><Signup /></SigninLayout>} />
         <Route
            path="/profile"
            element={<PrivateRoute layout={DashboardLayout} page={Profile} />}
          />
          {/* Uncomment or adjust the following route once Dashboard and PrivateLayout are defined */}
          {/* <Route path="/dashboard" element={<PrivateRoute><PrivateLayout><Dashboard /></PrivateLayout></PrivateRoute>} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default router;
