import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Signin from "./pages/Signin";
import AuthProvider, { useAuth } from "./contexts/auth/authContext";


import SigninLayout from "./layouts/SigninLayout";


import Singup from "./pages/Signup";

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
        <Route
               path="/sign-in"
              element={<RouteWrapper layout={SigninLayout} page={Signin} />}
            />
            <Route
              path="/sign-up"
              element={<RouteWrapper layout={SigninLayout} page={Singup} />}
            />
        </Routes>
       </AuthProvider>
    </Router>
    );
}

export default router;
