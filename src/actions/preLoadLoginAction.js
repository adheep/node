import {LOGIN, PRE_LOAD_LOGIN} from './types'
export const preLoadLogin = () => dispatch => {
    let postData = {
        domainName: window.location.hostname
    };
    console.log("Request_1 | OwnerID lookup request: %o",postData);
    fetch('http://localhost:5000/api/getOwnerId',{
        method: 'POST',
        headers: {
        'content-type': 'application/json'
        },
        body: JSON.stringify(postData)}
    ).then(res => res.json())
    .then(post => {
        console.log("Request_1 | OwnerID lookup response: %o",post);
        dispatch({
            type: PRE_LOAD_LOGIN,
            payload: post
        });
    });
}

export const login =  postData => async (dispatch,getState) => {
    console.log("Login Started");
    let encryptedText = "sKVSbX7wj8UYYAaar4amxQ==";
    console.log("Request_2 | Original Password : "+ postData.password);
    await fetch('http://localhost:5000/api/encrypt/'+postData.password)
    .then(res => res.json())
    .then(data => {
        console.log(data.error);
        if(data.error===""||data.error===undefined) {
            encryptedText = data.encryptedText;
        }
        console.log("Request_2 | Encrypted password : "+encryptedText);
    });

    let authRequest = {
        "ServiceRequestDetail": {
          "ServiceRequestVersion": "2.0",
          "OwnerId": getState().posts.ownerId,
          "BrowserIp": "192.168.5.37",
          "ResponseType": "json"
        },
        "UserCredential": {
          "UserName": postData.userName,
          "Password": encryptedText
        }
    }
    console.log("Request_3 | Login Request : %o",authRequest);
    await fetch('http://localhost:5000/api/login',{
        method: 'POST',
        headers: {
        'content-type': 'application/json'
        },
        body: JSON.stringify(authRequest)}
    ).then(res => res.json())
    .then(post => {
        console.log("Request_3 | Login Response : %o",post);
        dispatch({
            type: LOGIN,
            payload: post
        });
    });
}