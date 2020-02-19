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
      username: "testUser_1",
      pw: "12345",
      name: "TestU",
      email: "test@test.com",
      title: "",
      inputData: "",
      reportData: "",
      savedReports: [],
      isLoggedIn: true,
      confirmPassword: false
    }

    this.onInputChange.bind(this);
    this.handleSubmit.bind(this);
  }

  //
  onInputChange(e) {
    // console.log("from on input change")
  }

  onDataSubmit(e) {
    // console.log("from on data submit")
  }

  onDataSave(e) {
    // console.log('from on data save')
  }

  handleSubmit(input) {

    return (e) => {
      e.preventDefault();
      let submitType = e.target.name;

      if (submitType === 'register') {
        //Make ajax post request to server for '/register'
        serverRequest("POST", submitType, { name: "TestName19", username: "TestUserName19", email: "test19@test.com", pw: "test19pw" }, (err, res) => {
          if (res === 'true') {
            //========NEED TO UPDATE STATE WITH DATA FROM SERVER==============
          }
        })
      } else if (submitType === 'login') {
        //Make ajax get request to server for '/login'
        serverRequest("POST", submitType, { email: 'test3@test.com', pw: 'test3pw' }, (err, res) => {
          console.log(res)
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
          <Header></Header>

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