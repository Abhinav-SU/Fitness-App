import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/auth/authContext';
import EmailSignIn from './EmailSignIn';
import GoogleSignIn from './GoogleSignIn';
import Divider from '../../components/Divider';


function SigninWrapper() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [values, setValues] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target; // Extract name and value from event target
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };


  return (
    <main className="lg:max-w-xl lg:p-0 lg:space-y-10 p-6 w-full bg-white space-y-6">
      <h1 className="text-5xl">Sign In</h1>
      <EmailSignIn auth={auth} values={values} handleChange={handleChange} navigate={navigate} />
      <Divider text="or" />
      <GoogleSignIn auth={auth} navigate={navigate} />
      <div className="text-primary text-center">
        Want to become a member? <Link to="/sign-up">Sign Up</Link>
      </div>
    </main>
  );
}

export default SigninWrapper;


