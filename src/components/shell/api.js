const servicesUrl = "https://qkv6phapx5.execute-api.us-west-2.amazonaws.com/zero/services/";
const instancesUrl = "https://qkv6phapx5.execute-api.us-west-2.amazonaws.com/zero/instances/";


export const getServices = (access_token) => {
    let url = servicesUrl
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


export const getInstances = (access_token) => {
  let url = instancesUrl 
  return fetch(url, {
    method: "GET",
    headers:{
      Authorization:"Bearer " + access_token
    }
    //credentials: "include"  //CORS
  }).then(res => res.json());
};


export const createInstance = (access_token,service,instanceid,instancename) => {
  let url = instancesUrl 
  return fetch(url, {
    method: "POST",
    headers:{
      Authorization:"Bearer " + access_token
    },
    body: JSON.stringify({service:service,instanceid:instanceid,instancename:instancename})
    //credentials: "include"  //CORS
  }).then(res => res.json());
};


export const updateInstance = (access_token,instance,instancename) => {
  let url = instancesUrl 
  return fetch(url, {
    method: "PUT",
    headers:{
      Authorization:"Bearer " + access_token
    },
    body: JSON.stringify({instance:instance,instancename:instancename})
    //credentials: "include"  //CORS
  }).then(res => res.json());
};


export const deleteInstance = (access_token,instance) => {
  let url = instancesUrl 
  return fetch(url, {
    method: "DELETE",
    headers:{
      Authorization:"Bearer " + access_token
    },
    body: JSON.stringify({instance:instance})
    //credentials: "include"  //CORS
  }).then(res => res.json());
};
