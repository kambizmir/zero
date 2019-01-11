import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Shell from './components/shell/Shell.js'

class App extends Component {
  render() {
    return (
      <div className="App">
                
        <Shell 
          userInfo = {this.props.userInfo} 
          access_token = {this.props.access_token} 
          id_token = {this.props.id_token}
        />

        <ToastContainer 
          hideProgressBar={true}
          closeOnClick={true}
        />
        
      </div>
    );
  }
}

export default App;
