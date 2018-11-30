import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
import store from "./redux/store";

//import {createStore} from 'redux';
//const store = createStore(function(){});

//const auth_url = "https://kam1.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=43t1ibo5sj5o9as8k9k4avsa7c&redirect_uri=http://localhost:3000";
const auth_url = "https://kam3.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=7voqbpalbkemupqubr0p650f8i&redirect_uri=http://localhost:3000";

//const auth_url = "https://kam1.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=43t1ibo5sj5o9as8k9k4avsa7c&redirect_uri=http://zbuild1.s3-website-us-west-2.amazonaws.com";

//const user_info_url = "https://kam1.auth.us-west-2.amazoncognito.com/oauth2/userInfo";
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
        //console.log("DATA",jsonData)   
        if(jsonData.email){
            window.location.hash = ""; ////???
            ReactDOM.render(
                <Provider store={store}>
                  <App userInfo = {jsonData} access_token={access_token} id_token={id_token}/>
                </Provider>,
               document.getElementById('root'));

            // If you want your app to work offline and load faster, you can change
            // unregister() to register() below. Note this comes with some pitfalls.
            // Learn more about service workers: http://bit.ly/CRA-PWA
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
      console.log("ERROR",err)
    })

}
else{
    window.location = auth_url;
}






