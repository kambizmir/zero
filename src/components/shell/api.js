const servicesUrl = "https://qkv6phapx5.execute-api.us-west-2.amazonaws.com/zero/services/";


export const getServices = () => {
    let url = servicesUrl;
    return fetch(url, {
      method: "GET",
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