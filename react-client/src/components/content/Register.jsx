import React from 'react';

class Register extends React.Component {



  render() {
    const { onInputChange, handleSubmit } = this.props;

    return (
      <div>
        <form>
          <label>
            <input
              type="text"
              name="name"
              placeholder="Enter your First Name"
              onChange={onInputChange('name')}
            >
            </input>
          </label>
          <br />
          <label>
            <input
              type="text"
              name="email"
              placeholder="Enter your User Email"
              onChange={onInputChange('email')}
            >
            </input>
          </label>
          <br />
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
          <button name={'register'} onClick={handleSubmit('register')}>Register</button>
        </form>
      </div>
    )
  }
}

export default Register;
