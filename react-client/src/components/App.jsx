import React, { Fragment } from 'react';

//Components
import { Header, Footer } from './layouts/index.jsx';
import Login from './content/Login.jsx';
import Register from './content/Register.jsx';
import MainPage from './content/MainPage.jsx';

//Helpers
import serverRequest from '../helpers/serverRequest.js';

//App Component
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      pw: "",
      name: "",
      email: "",
      title: "",
      inputData: "",
      reportData: "",
      savedReports: [],
      isLoggedIn: false,
      loginButtonText: 'Login'
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logoutButton = this.logoutButton.bind(this);
  }

  //
  onInputChange(input) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [e.target.name]: e.target.value
      })
    }

  }

  onDataSubmit(e) {
    // console.log("from on data submit")
  }

  onDataSave(e) {
    // console.log('from on data save')
  }

  logoutButton(e) {
    e.preventDefault();

    console.log("logout button clicked")
    //Logs User out
    if (this.state.isLoggedIn) {
      this.setState({
        isLoggedIn: false
      });
    }
  }

  handleSubmit(input) {

    return (e) => {
      e.preventDefault();
      let submitType = e.target.name;

      if (submitType === 'register') {
        //Make ajax post request to server for '/register'
        serverRequest("POST", submitType, this.state, (err, res) => {
          if (res === 'true') {
            //========NEED TO UPDATE STATE WITH DATA FROM SERVER==============
            this.setState({
              isLoggedIn: true
            });
          } else {
            alert('Invalid Registeration, check if email is not in use!')
          }
        })
      } else if (submitType === 'login') {

        //Make ajax get request to server for '/login'
        serverRequest("POST", submitType, this.state, (err, res) => {
          if (res === 'true') {
            this.setState({
              isLoggedIn: true
            })
          } else {
            alert('Invalid login! Try again')
          }
        })
      } else if (submitType === 'main-page') {
        serverRequest("POST", submitType, { email: 'test@mail.com', title: 'titleData', inputData: 'input', reportData: 'report Data' }, (err, res) => {
          console.log(res)
        })
      }
    }
  }

  render() {
    const { onInputChange, handleSubmit, onDataSave, onDataSubmit } = this.state;
    const { name, title, inputData, reportData, savedReports, isLoggedIn } = this.state;
    const values = { name, title, inputData, reportData, savedReports };

    if (!isLoggedIn) {
      return (
        <Fragment>
          <Header isLoggedIn={isLoggedIn} logoutButton={this.logoutButton}></Header>

          <Login onInputChange={this.onInputChange} handleSubmit={this.handleSubmit}></Login>
          <br />
          <Register onInputChange={this.onInputChange} handleSubmit={this.handleSubmit}></Register>

          <Footer></Footer>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Header></Header>

          <MainPage
            onDataSave={this.onDataSave}
            onDataSubmit={this.onDataSubmit}
            onInputChange={this.onInputChange}
            values={values}
          ></MainPage>

          <Footer></Footer>
        </Fragment >
      )
    }

  }
}

export default App;