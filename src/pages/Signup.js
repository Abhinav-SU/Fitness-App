import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";


function Singup() {

  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };



  return (
    <main className="lg:max-w-xl lg:p-0 lg:space-y-10 p-6 w-full bg-white space-y-6">
      <h1 className="text-5xl">Sign Up</h1>
      <form className="space-y-6">
        <Input
          name="email"
          type="email"
          placeholder="Enter email address.."
          label="Email address"
          value={values.email}
          handleChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter password.."
          label="Password"
          value={values.password}
          handleChange={handleChange}
        />
        {error && <div className="text-red-600">{error}</div>}
        <Button
          value="Sign Up"
          type="submit"
          variant="primary"

          fullWidth
        />
      </form>
      <div className="text-primary text-center">
        Already have an account?{" "}
        <Link to="/sign-in" className="text-primaryDark text--bold">
          Sign In here!
        </Link>
      </div>
    </main>
  );
}

export default Singup;
