import React, { Fragment } from 'react';
import { Header, Footer } from './layouts/index.jsx';
import Login from './content/Login.jsx';
import Register from './content/Register.jsx';

class App extends React.Component {


  render() {
    return (
      <Fragment>
        <Header></Header>

        <Login></Login>
        <br />
        <Register></Register>

        <Footer></Footer>
      </Fragment>
    )
  }
}

export default App;