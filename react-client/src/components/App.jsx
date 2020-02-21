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
      renderedReports: []
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDataSave = this.onDataSave.bind(this);
    this.logoutButton = this.logoutButton.bind(this);
  }

  componentDidMount() {
    this.setState({
      title: '',
      inputData: '',
      score: 0
    })
  }

  onInputChange(input) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  renderReport() {

    const getTextResult = (score) => {

      const textResultObj = {
        low: 'Very Negative',
        lowMed: 'Negative',
        netural: 'Netural',
        medHigh: "Positive",
        high: 'Very Positive',
        invalid: "Invalid Score"
      };

      let textResult = ''
      if (score >= -1 && score < -0.5) {
        textResult = textResultObj.low;
      } else if (score >= -0.5 && score < -0.01) {
        textResult = textResultObj.lowMed;
      } else if (score >= -0.01 && score <= 0.01) {
        textResult = textResultObj.netural;
      } else if (score > 0.01 && score < 0.5) {
        textResult = textResultObj.medHigh;
      } else if (score >= 0.5 && score <= 1) {
        textResult = textResultObj.high;
      } else {
        textResult = textResultObj.invalid;
      }

      return textResult;
    }

    const reportDivs = this.state.savedReports.map((report, index) => {
      return <div className='report-component' key={index}>
        <div className="report-title">{report.title}</div>
        <div className="score">Score Value: {report.score}</div>
        <div className="text-result"> {getTextResult(report.score)}</div>
        <hr></hr>
      </div>
    });

    return reportDivs;
  }

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
      let newRenderedReports = this.renderReport(savedReportsObj.savedReports)
      this.setState({
        savedReports: savedReportsObj.savedReports,
        renderedReports: newRenderedReports
      })
    });
  }

  logoutButton(e) {
    e.preventDefault();

    const revertState = {
      username: "",
      pw: "",
      name: "",
      email: "",
      title: "",
      inputData: "",
      score: "",
      savedReports: [],
      isLoggedIn: false,
      renderedReports: []
    }

    console.log("logout button clicked")
    //Logs User out
    if (this.state.isLoggedIn) {
      this.setState(revertState);
    }
  }

  handleSubmit(input) {

    return (e) => {
      e.preventDefault();
      let submitType = e.target.name;

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
            }, () => {
              this.setState({
                renderedReports: this.renderReport(this.state.savedReports),
                title: '',
                inputData: '',
                score: ''
              })
            });
          } else {
            alert('Invalid login! Try again')
          }
        })
      } else if (submitType === 'update-data') {
        this.setState({
          renderedReports: this.renderReport(this.state.savedReports),
          title: this.state.title,
          inputData: this.state.inputData,
          score: this.state.score
        });
      }
    }
  }

  render() {
    const { name, title, inputData, reportData, savedReports, isLoggedIn, renderedReports } = this.state;
    const values = { name, title, inputData, reportData, savedReports, renderedReports };

    if (!isLoggedIn) {
      return (
        <Fragment>
          <Header isLoggedIn={isLoggedIn} logoutButton={this.logoutButton}></Header>

          <Login onInputChange={this.onInputChange} handleSubmit={this.handleSubmit}></Login>
          <br />
          <Register onInputChange={this.onInputChange} handleSubmit={this.handleSubmit}></Register>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Header isLoggedIn={isLoggedIn} logoutButton={this.logoutButton}></Header>

          <MainPage
            onDataSave={this.onDataSave}
            handleSubmit={this.handleSubmit}
            onInputChange={this.onInputChange}
            toggleListen={this.toggleListen}
            values={values}
          ></MainPage>
        </Fragment >
      )
    }

  }
}

export default App;