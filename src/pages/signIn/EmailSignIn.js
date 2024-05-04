import React, { useState } from 'react';
import BaseSignIn from './BaseSignIn';
import Input from '../../components/Input';
import Button from '../../components/Button';


class EmailSignIn extends BaseSignIn {

  
  signIn = async () => {
    const { signIn } = this.props.auth;
    const { email, password } = this.props.values;
    await signIn(email, password);
  };



  renderForm() {
    const { values, handleChange } = this.props;
    const { loading } = this.state;
    return (
      <>
        <Input
          name="email"
          type="email"
          placeholder="Enter email address..."
          label="Email address"
          value={values.email}
          handleChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter password..."
          label="Password"
          value={values.password}
          handleChange={handleChange}
        />
         <Button
            value="Sign In"
            type="submit"
            variant="primary"
            loading={loading}
            fullWidth
          />
      </>
    );
  }
}

export default EmailSignIn;
