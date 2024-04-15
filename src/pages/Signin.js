import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Divider from '../components/Divider';
import { useAuth } from '../contexts/auth/authContext';

function SigninWrapper() {
  const navigate = useNavigate();
  const auth = useAuth();
  return <Signin navigate={navigate} auth={auth} />;
}

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      googleLoading: false,
      error: null,
      message: null,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { signIn } = this.props.auth;
    const { email, password } = this.state;
    this.setState({ loading: true, error: null, message: null });

    try {
      await signIn(email, password);
      this.props.navigate('/profile');
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleGoogleSignIn = async () => {
    const { signInWithGoogle } = this.props.auth;
    this.setState({ googleLoading: true, error: null, message: null });

    try {
      await signInWithGoogle();
      this.props.navigate('/profile');
    } catch (error) {
      this.setState({ error: error.message, googleLoading: false });
    }
  };

  handlePassword = async () => {
    const { resetPassword } = this.props.auth;
    const { email } = this.state;
    if (!email) {
      this.setState({ error: "Please enter an email first" });
      return;
    }

    this.setState({ loading: true, message: null, error: null });

    try {
      await resetPassword(email);
      this.setState({ message: "Check your email for a reset link", loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    const { email, password, loading, googleLoading, error, message } = this.state;

    return (
      <main className="lg:max-w-xl lg:p-0 lg:space-y-10 p-6 w-full bg-white space-y-6">
        <h1 className="text-5xl">Sign In</h1>
        <form onSubmit={this.handleSubmit} className="space-y-6">
          <Input
            name="email"
            type="email"
            placeholder="Enter email address.."
            label="Email address"
            value={email}
            handleChange={this.handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter password.."
            label="Password"
            value={password}
            handleChange={this.handleChange}
          />
          <div onClick={this.handlePassword} className="flex justify-end text-sm text-primary cursor-pointer">
            Forgot password?
          </div>
          {message && <div className="text-primary font-semibold">{message}</div>}
          {error && <div className="text-red-600">{error}</div>}
          <Button
            value="Sign In"
            type="submit"
            variant="primary"
            loading={loading}
            fullWidth
          />
        </form>
        <Divider text="or" />
        <Button
          value="Sign in with Google"
          action={this.handleGoogleSignIn}
          variant="frame"
          loading={googleLoading}
          fullWidth
        />
        <div className="text-primary text-center">
          Want to become a member? <Link to="/sign-up">Sign Up</Link>
        </div>
      </main>
    );
  }
}

export default SigninWrapper;
