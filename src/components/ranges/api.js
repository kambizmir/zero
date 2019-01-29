
const switchesUrl = "https://qkv6phapx5.execute-api.us-west-2.amazonaws.com/zero/ranges/";



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



export const changeValue = (access_token,instance,value) => {
  let url = switchesUrl + "rangevalue/";
  return fetch(url, {
    method: "POST",
    headers:{
      Authorization:"Bearer " + access_token
    },
    body: JSON.stringify({instance:instance,rangevalue:value })
    //credentials: "include"  //CORS
  }).then(res => res.json());
};


