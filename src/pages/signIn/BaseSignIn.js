import React from 'react';


class BaseSignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      message: null,
    };
  }

  signIn = async () => {
    throw new Error("signIn method needs to be implemented by subclasses");
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null, message: null });

    try {
      await this.signIn();
      this.props.navigate('/profile');
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    const { loading, error, message } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSignIn}>
          {this.renderForm()}
          {message && <div className="text-primary font-semibold">{message}</div>}
          {error && <div className="text-red-600">{error}</div>}
        </form>
      </div>
    );
  }

  renderForm() {
    // To be overridden in subclasses to render specific form inputs
    return null;
  }
}

export default BaseSignIn;


