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
      username: "user",
      pw: "1234",
      name: "Andy",
      email: "",
      title: "",
      inputData: "",
      reportData: "",
      savedReports: [],
      isLoggedIn: false
    }

    this.onInputChange.bind(this);
    this.handleSubmit.bind(this);
  }

  //
  onInputChange(e) {
    console.log("from on input change")
  }

  onDataSubmit(e) {
    console.log("from on data submit")
  }

  onDataSave(e) {
    console.log('from on data save')
  }

  handleSubmit(input) {

    return (e) => {
      let submitType = e.target.name;


      if (submitType === 'register') {
        //Make ajax post request to server for '/register'
        serverRequest("POST", submitType, { name: "gala" }, (res) => {
          console.log(res)

        })
      } else if (submitType === 'login') {
        //Make ajax get request to server for '/login'
        serverRequest("POST", submitType, { username: 'user', pw: 'password' }, (res) => {
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