import React, { Component } from 'react';
import Shell from './components/shell/Shell.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <Shell userInfo = {this.props.userInfo} access_token = {this.props.access_token} id_token = {this.props.id_token}/>

        </header>

        <ToastContainer 
        hideProgressBar={true}
          closeOnClick={true}
        />
      </div>
    );
  }
}

export default App;
