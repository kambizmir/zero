
const switchesUrl = "https://qkv6phapx5.execute-api.us-west-2.amazonaws.com/zero/switches/";



export const getInstance = (access_token,instanceid) => {
  let url = switchesUrl  + "instance/?instanceid=" + instanceid;
  return fetch(url, {
    method: "GET",
    headers:{
      Authorization:"Bearer " + access_token
    }
    //credentials: "include"  //CORS
  })
  .then(res => res.json())
  //.catch(error => console.log(error));
};



export const updateInstance = (access_token,instance,state) => {
  let url = switchesUrl + "instance/";
  return fetch(url, {
    method: "PUT",
    headers:{
      Authorization:"Bearer " + access_token
    },
    body: JSON.stringify({instance:instance  , switchstate:state})
    //credentials: "include"  //CORS
  }).then(res => res.json());
};


