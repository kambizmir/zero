const servicesUrl = "https://qkv6phapx5.execute-api.us-west-2.amazonaws.com/zero/services/";

const instancesUrl = "https://qkv6phapx5.execute-api.us-west-2.amazonaws.com/zero/instances/";


export const getServices = (access_token) => {
    let url = servicesUrl // + "?access_token=" +access_token;
    return fetch(url, {
      method: "GET",
      headers:{
        Authorization:"Bearer " + access_token
      }
      //credentials: "include"  //CORS
    }).then(res => res.json());
};


export const getInstances = (access_token) => {
  let url = instancesUrl // + "?access_token=" +access_token;
  return fetch(url, {
    method: "GET",
    headers:{
      Authorization:"Bearer " + access_token
    }
    //credentials: "include"  //CORS
  }).then(res => res.json());
};

/*export const getservices = donationId => {
    let url = `/app/rs/rsd/srd/donations/${donationId}`;
    return fetch(url, {
      method: "GET",
      credentials: "include"
    }).then(res => res.json());
};*/