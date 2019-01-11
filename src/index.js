import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import './index.css';
import App from './App';
import store from "./redux/store";
import * as serviceWorker from './serviceWorker';

//////////

const auth_url = "https://kam3.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=7voqbpalbkemupqubr0p650f8i&redirect_uri=http://localhost:3000";
//const auth_url =   "https://kam3.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=7voqbpalbkemupqubr0p650f8i&redirect_uri=https://www.codecone.net";

//////////

const user_info_url = "https://kam3.auth.us-west-2.amazoncognito.com/oauth2/userInfo";

const getHashValue = (key) => {
    var matches = window.location.hash.match(new RegExp(key+'=([^&]*)'));
    return matches ? matches[1] : null;
}

const access_token = getHashValue("access_token");
const id_token = getHashValue("id_token");

if (access_token){
 
    fetch(user_info_url,{
        headers:{
            Authorization:"Bearer " + access_token
        }
    })
     .then(function(response){
      return response.json()
    })
    .then(function(jsonData){    
        if(jsonData.email){
            
            //window.location.hash = ""; //// TODO: Remove the token?
            
            ReactDOM.render(
                <Provider store={store}>
                  <App userInfo = {jsonData} access_token={access_token} id_token={id_token}/>
                </Provider>,
               document.getElementById('root'));
            
            serviceWorker.unregister();
        }
        else if(jsonData.error){
            window.location = auth_url;
        }    
        else{
            window.location = auth_url; 
        }            
    })
    .catch(function(err) {        
      alert("Can not get user information");
    })

}
else{
    window.location = auth_url;
}






