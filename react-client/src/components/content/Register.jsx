import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      pw: "",
      name: "",
      email: ""
    }

    this.handleSubmit.bind(this);
  }


  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('submit')
  }

  render() {
    return (
      <div>
        <form>
          <label>
            <input
              type="text"
              name="name"
              placeholder="Enter your First Name"
              onChange={this.onInputChange.bind(this)}
            >
            </input>
          </label>
          <br />
          <label>
            <input
              type="text"
              name="email"
              placeholder="Enter your User Email"
              onChange={this.onInputChange.bind(this)}
            >
            </input>
          </label>
          <br />
          <label>
            <input
              type="text"
              name="username"
              placeholder="Enter your User Name"
              onChange={this.onInputChange.bind(this)}
            >
            </input>
          </label>
          <br />
          <label>
            <input
              type="password"
              name="pw"
              placeholder="Enter your Password"
              value={this.state.pw}
              onChange={this.onInputChange.bind(this)}
            >
            </input>
          </label>
          <br />
          <button onClick={this.handleSubmit}>Register</button>
        </form>
      </div>
    )
  }
}

export default Register;