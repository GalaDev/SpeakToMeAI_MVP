import React, { Fragment } from 'react';
import { Header, Footer } from './layouts/index.jsx';
import Login from './content/Login.jsx';
import Register from './content/Register.jsx';
import MainPage from './content/MainPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      pw: "",
      name: "Andy",
      email: "",
      title: "",
      inputData: "",
      reportData: "",
      savedReports: [],
      isLoggedIn: true
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

      } else {
        //Make ajax get request to server for '/login'
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