import React from 'react';
import BaseSignIn from './BaseSignIn';
import Button from '../../components/Button';

class GoogleSignIn extends BaseSignIn {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      isProcessing: false, // Track processing state to prevent multiple clicks
    };
  }

  signIn = async () => {
    if (this.state.isProcessing) return;
    this.setState({ isProcessing: true });
    try {
      const { signInWithGoogle } = this.props.auth;
      await signInWithGoogle();
      this.props.navigate('/profile');
    //   this.props.navigate('/');
      
    } catch (error) {
      console.error("Authentication failed: ", error);
      if (error.code === 'auth/cancelled-popup-request') {
        alert('Sign-in was cancelled. Please ensure popups are enabled and try again.');
      }
      this.setState({ error: error.message });
    } finally {
      this.setState({ isProcessing: false }); // Reset processing state
    }
  };

  renderForm() {
    return (
      <Button
        value="Sign in with Google"
        action={this.signIn}
        variant="frame"
        loading={this.state.isProcessing}
        fullWidth
      />
    );
  }
}

export default GoogleSignIn;

