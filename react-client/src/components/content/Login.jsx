import React from 'react';

class Login extends React.Component {

  render() {
    const { onInputChange, handleSubmit } = this.props;

    return (
      <div>
        <form>
          <label>
            <input
              type="text"
              name="username"
              placeholder="Enter your User Name"
              onChange={onInputChange('username')}
            >
            </input>
          </label>
          <br />
          <label>
            <input
              type="password"
              name="pw"
              placeholder="Enter your Password"
              onChange={onInputChange('pw')}
            >
            </input>
          </label>
          <br />
          <button name={'login'} onClick={handleSubmit('login')}>Login</button>
        </form>
      </div>
    )
  }
}

export default Login;