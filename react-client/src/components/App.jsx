import React, { Fragment } from 'react';

//Components
import { Header, Footer } from './layouts/index.jsx';
import Login from './content/Login.jsx';
import Register from './content/Register.jsx';
import MainPage from './content/MainPage.jsx';

//Helpers
import serverRequest from '../helpers/serverRequest.js';

//API's


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
      score: "",
      savedReports: [],
      isLoggedIn: false,
      loginButtonText: 'Login'
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.logoutButton = this.logoutButton.bind(this);
    this.onDataSave = this.onDataSave.bind(this);
    // this.onDataSubmit = this.onDataSubmit.bind(this);
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


  //******FIX BUG ON DOUBLE SUBMIT******
  onDataSave(e) {
    e.preventDefault();
    let urlEnd = e.target.name;


    let reqObj = {};
    reqObj.savedReports = this.state.savedReports === null ? '[]' : JSON.stringify(this.state.savedReports);

    reqObj.inputData = this.state.inputData;
    reqObj.username = this.state.username;
    reqObj.title = this.state.title;

    serverRequest("POST", urlEnd, reqObj, (err, res) => {
      if (err) {
        console.log(err)
      }

      let savedReportsObj = JSON.parse(res);

      this.setState({
        savedReports: savedReportsObj.savedReports
      });
    })
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
      console.log('from handle submit-type', submitType)
      if (submitType === 'register') {
        //Make ajax post request to server for '/register'
        serverRequest("POST", submitType, this.state, (err, res) => {

          const userData = JSON.parse(res)

          if (userData.isLoggedIn === true) {
            this.setState({
              isLoggedIn: true,
              savedReports: userData.savedReports
            });
          } else {
            alert('Invalid Registeration, check if email is not in use!')
          }
        })
      } else if (submitType === 'login') {

        //Make ajax get request to server for '/login'
        serverRequest("POST", submitType, this.state, (err, res) => {
          const userData = JSON.parse(res);

          if (userData.isLoggedIn) {
            this.setState({
              isLoggedIn: true,
              name: userData.name,
              savedReports: userData.savedReports
            });
          } else {
            alert('Invalid login! Try again')
          }
        })
      } else if (submitType === 'main-page-data-submit') {

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
            handleSubmit={this.handleSubmit}
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